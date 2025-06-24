
from pydantic import BaseModel, EmailStr
from typing import List 

## token schemas 

class Token(BaseModel): 
    access_token : str 
    token_type : str = "bearer"


## Users schmas 

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str 

class UserLogin(UserCreate): 
    pass

class UserPublic(UserBase):
    id: int 

    class Config:
       
        from_attributes = True 

class AnalyzeRequest(BaseModel):
    url:str 
    