import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.patientData import patient_route as patient
from backend.NotesToText import router as pdftotext
from backend.SkinAnalysis import router as skin
from backend.speech_text import router as speech2text
from backend.Narrator import router as narrator
from backend.eye_check import router as eye
from backend.texttoAIvideo import router as aivideo
from backend.throat_check import router as throat
from backend.disease_prediction import router as disease
from backend.test2 import route_doc_narrate as doc_narrate


app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient)
app.include_router(pdftotext)
app.include_router(eye)
app.include_router(speech2text)
app.include_router(narrator)
app.include_router(aivideo)
app.include_router(throat)
app.include_router(disease)
app.include_router(skin)
app.include_router(doc_narrate)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=8081,host='192.168.237.75',reload=True)
