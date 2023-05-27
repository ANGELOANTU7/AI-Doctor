import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.feedAnalyze import route_feed_analysis as feed_analysis
from backend.patientData import patient_route as patient

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(feed_analysis)
app.include_router(patient)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main_deepface:app",port=8000,host='192.168.237.129',reload=True)
