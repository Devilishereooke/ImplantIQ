import json

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
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


@app.get("/")
def read_root():
    return {"Hello": "World"}


# it should take a file as a input. And then return some random 50 words as content and Also return samsung as a type.
@app.post("/")
async def create_upload_file(file: UploadFile = File(...)):
    # read from rad_output.json and send that response
    # read the filex
    with open("rag_output.json", "r") as f:
        TEST_IMPLANT_RESPONSE = json.load(f)
    return TEST_IMPLANT_RESPONSE


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
