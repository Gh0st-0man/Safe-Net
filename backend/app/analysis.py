import os
import torch
from fastapi import APIRouter, Depends, HTTPException
from transformers import DebertaV2Tokenizer, DebertaV2ForSequenceClassification, pipeline
from dotenv import load_dotenv
from pathlib import Path  # Import Path from pathlib
from . import schemas, security

# --- Configuration Loading ---
# Get the directory of the current file (app/)
APP_DIR = Path(__file__).resolve().parent

# Load the .env file from the app/ directory
dotenv_path = APP_DIR / ".env"
load_dotenv(dotenv_path=dotenv_path)

router = APIRouter()

# --- Model Loading (Robust Version) ---
MODEL_PATH_FROM_ENV = os.getenv("MODEL_PATH")
if not MODEL_PATH_FROM_ENV:
    raise RuntimeError("MODEL_PATH is not set in your .env file.")

# Construct the full, absolute path to the model
# This is now independent of where you run the server
full_model_path = APP_DIR / MODEL_PATH_FROM_ENV

print(f"Attempting to load model from: {full_model_path}")

DEVICE = 0 if torch.cuda.is_available() else -1
scanner = None # Initialize scanner as None

# Check if the model path actually exists before trying to load
if not full_model_path.exists():
    print(f"ERROR: Model path does not exist: {full_model_path}")
else:
    try:
        tokenizer = DebertaV2Tokenizer.from_pretrained("microsoft/deberta-v3-base")
        model = DebertaV2ForSequenceClassification.from_pretrained(full_model_path)
        scanner = pipeline("text-classification", model=model, tokenizer=tokenizer, device=DEVICE)
        print("✅ Model loaded successfully.")
    except Exception as e:
        # Print the actual error for easier debugging
        print(f"❌ Failed to load model. Error: {e}")
        scanner = None

# ─── Dependency function ───────────────────────────────────────────────────
def get_scanner():
    if scanner is None:
        raise HTTPException(
            status_code=503, 
            detail="Model is not available or failed to load. Check server logs."
        )
    return scanner

# ─── /analyze endpoint ─────────────────────────────────────────────────────
@router.post("/analyze", summary="Find out if URL is safe or malicious")
async def analyze(
    request: schemas.AnalyzeRequest,
    current_user: schemas.UserPublic = Depends(security.get_current_user),
    ml_pipeline = Depends(get_scanner),
):
    try:
        result = ml_pipeline(request.url)
        
        # This logic for handling single-label output seems fine.
        if len(result) == 1:
            score = result[0]["score"]
            label = result[0]["label"]
            other_label = "LABEL_1" if label == "LABEL_0" else "LABEL_0"
            result.append({"label": other_label, "score": 1.0 - score})

        return {
            "url": request.url,
            "result": result,
            "analyzed_by": current_user.email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scan failed: {e}")


# ─── /status endpoint ──────────────────────────────────────────────────────
@router.get("/status", summary="AI model status")
async def get_status():
    return {
        "status": "online" if scanner else "offline",
        "model_path": str(full_model_path) # show the full path being used
    }
