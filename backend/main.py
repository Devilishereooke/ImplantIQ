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
    TEST_IMPLANT_RESPONSE = """To provide a detailed answer about Bone Level Fixture Specifications, I will analyze the given context.

    1.⁠ ⁠*Cover screw*: The cover screw is not included in the package.
    2.⁠ ⁠*Common Features*:
            * Internal Morse Taper (10°)
            * Abutment Interface: 3.3mm
            * Mountless Type
    3.⁠ ⁠*Unit*: The unit of measurement is millimeters (mm).
    4.⁠ ⁠*Specifications*:
            * A *Platform Diameter*: 3.5, 3.8, 4.3, 4.8, 6.0 mm (corresponding to colors Yellow, Green, Blue, Red, Orange)
            * B Body Diameter: 3.7, 4.0, 4.5, 5.0, 5.0 mm
            * C Bevel Height: 0.06, 0.20, 0.32, 0.66 mm
            * D Total Length: 7.0, 9.0, 11.0, 13.0, 15.0 mm
            * E Thread Depth: 0.35, 0.40, 0.45, 0.50, 0.50 mm
            * F Abutment Interface: 3.3 mm

    Additional notes:
    - *Compatible with*: NobelProcera® abutments
    - *Material*: Grade 4 Titanium
    - *Surface treatment*: TiUnite® (porous anodized surface)
    """;
    return {TEST_IMPLANT_RESPONSE}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)