import os 
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi import FastAPI 
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base 
from .auth import router as auth_router
from .analysis import router as analysis_router

# The .env file is now loaded inside analysis.py where it's needed,
# so we can remove the load_dotenv() call from here.

## Creating dataset tables 
# There's a small typo here: metadataapp -> metadata
Base.metadata.create_all(bind=engine)


##################################################################################################
################### Starting FastAPI ##############################################################

app = FastAPI(title='FastAPI URL Scanner')

#### change these to improve security in case I want to deploy #####
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['GET', 'POST'], # Removed space after comma
    allow_headers=['*']
)
#####Including routes  
app.include_router(auth_router, prefix='/auth', tags=['authentication']) # Fixed typo: authantication
app.include_router(analysis_router, prefix='/api', tags=['Analysis'])

##  main page safent.click/
app.mount("/", StaticFiles(directory="home", html=True), name="static")

##############################################
############ EXECUTE ######################################################################################

if __name__ == '__main__':
    # You can still use environment variables to configure uvicorn,
    # they just need to be set before the script runs.
    # The .env loading in analysis.py will handle this for the app logic.
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'false').lower() in ('true', '1', 'yes')

    uvicorn.run("app.main:app", host=host, port=port, reload=debug)
