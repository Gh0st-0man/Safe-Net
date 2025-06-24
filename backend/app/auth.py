from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import models, schemas, security
from .database import get_db

router = APIRouter(tags=["authentication"])


@router.post(
    "/register",
    response_model=schemas.UserPublic,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
):
    # 1) check for existing user
    existing = (
        db.query(models.UserDB)
        .filter(models.UserDB.email == user.email)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists",
        )

    # 2) hash & save
    hashed_pw = security.get_password_hash(user.password)
    new_user = models.UserDB(
        email=user.email,
        hashed_password=hashed_pw,    # ← must match your DB model field
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=schemas.Token)
async def login(
    form_data: schemas.UserLogin,
    db: Session = Depends(get_db),
):
    user = (
        db.query(models.UserDB)
        .filter(models.UserDB.email == form_data.email)
        .first()
    )
    if not user or not security.verify_password_hash(
        form_data.password,
        user.hashed_password,          # ← same field name here
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = security.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
