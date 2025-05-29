from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from models.user import User
from schemas.user import UserCreate, UserLogin
from utils.database import users_collection
from utils.security import create_access_token, hash_password, verify_password

router = APIRouter()


@router.post("/register")
async def register(user: UserCreate):
    print("Here in Register")
    hashed_password = hash_password(user.password)
    user_data = {
        "email": user.email,
        "username": user.username,
        "password": hashed_password,
    }
    users_collection.insert_one(user_data)
    return {"msg": "User Registered Successfully"}


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return {"msg": "returned for now"}
    # user = users_collection.find_one({"email": form_data.username})
    # if not user or not verify_password(form_data.password, user["password"]):
    #     raise HTTPException(status_code=401, detail="Invalid credentials")
    #
    # access_token = create_access_token(data={"sub": user["email"]})
    # return {"access_token": access_token, "token_type": "bearer"}
