import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins=[
    "*"
]

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
    content = "The Nobel Biocare NobelParallel™ Conical Connection Implant is a premium two-piece, bone-level dental implant system crafted from Grade 4 titanium, renowned for its strength and biocompatibility. Available in diameters of 3.5mm, 4.3mm, and 5.0mm with lengths ranging from 8mm to 16mm, it features a proprietary TiUnite® surface for accelerated osseointegration and a 1.5° conical connection with internal hex for prosthetic stability. Its asymmetric V-thread (3.5mm) and dual-lead thread (4.3mm/5.0mm) designs optimize primary stability across all bone densities (D1–D4). Compatible with NobelProcera® abutments, this system supports immediate loading and is ideal for single-tooth to full-arch restorations, with a surgical protocol requiring just 35–45 Ncm insertion torque and 6–8 weeks of healing. Trusted globally, it combines precision engineering with evidence-based outcomes for long-term clinical success."
    return {"filename": file, "content": content, "type": "NobelParallel"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)