import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.test2 import route_doc_narrate as doc_narrate
from backend.feedAnalyze import route_feed_analysis as feed_analysis
from backend.patientData import patient_route as patient
from backend.gen_prescription import router as pres
from backend.reportDataRead import router_summariser as summary
from backend.eye_check import router as eye_check

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(feed_analysis)
# app.include_router(patient)
# app.include_router(doc_narrate)
app.include_router(pres)
app.include_router(summary)
app.include_router(eye_check)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main_deepface:app",port=8000,host='192.168.39.129',reload=True)
