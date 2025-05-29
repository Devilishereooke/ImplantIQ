import base64
import json
import os

import uvicorn
from chatbot import chat_run
from endpoints.auth import router as auth_router
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from predictNewOneImage import run
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


app.include_router(auth_router, prefix="/api/auth")


@app.get("/")
def read_root():
    return {"Hello": "World"}


# it should take a file as a input. And then return some random 50 words as content and Also return samsung as a type.
@app.post("/")
async def create_upload_file(file: UploadFile = File(...)):
    # Save the uploaded file as input_image in current directory
    file_path = "input_image"  # You might want to add the original file extension

    # Get the file extension from the uploaded filename
    file_extension = os.path.splitext(file.filename)[1]
    file_path += (
        file_extension  # Now it will be like "input_image.jpg" or "input_image.png"
    )

    # Save the file
    with open(file_path, "wb") as buffer:
        content = await file.read()  # Read the file content asynchronously
        buffer.write(content)

    # Call the run function with the saved file path
    result = await run(file_path)

    predicted_image_path = "output.jpg"
    with open(predicted_image_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

    # Read the JSON response
    with open("output_final.json", "r") as f:
        test_implant_response = json.load(f)

    # Combine both responses
    response_data = {
        "implant_data": test_implant_response,
        "predicted_image": encoded_image,
    }
    return JSONResponse(content=response_data)


@app.post("/chat")
async def chat(chat_request: ChatRequest):
    print(chat_request)
    user_message = chat_request.message.lower()
    response = await chat_run(user_message)
    return {"msg": "success", "response": response}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
