import os 
from datetime import datetime, timedelta
from typing import Optional
from deprecated import deprecated 
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt 
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db


###### config #####                                         #3
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'mec.password')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES= 120 

#-----------#

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
bearer_scheme = HTTPBearer() 

#------------------# 

def verify_password_hash(plain_password: str , hashed_password: str) -> bool: 
    return pwd_context.verify(plain_password,hashed_password)

def get_password_hash(password: str ) -> str:
    return pwd_context.hash(password)

def create_access_token(data:dict, expires_delta: Optional[timedelta] = None ):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else: 
        expire = datetime.utcnow() + timedelta(minutes= ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode , SECRET_KEY, algorithm=ALGORITHM)

def get_current_user (
        credentials : HTTPAuthorizationCredentials = Depends(bearer_scheme), db : Session = Depends(get_db)) -> schemas.UserPublic:
    credentials_exception = HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Colud not validate user please relogin ! ", headers= {'WWW-Authenticate': "Bearer"})
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.UserDB).filter(models.UserDB.email == email).first() 
    if user is None:
        raise credentials_exception
    return user   