import uvicorn
from fastapi import FastAPI

from backend.patientData import patient_route as patient
#from backend.NotesToText import router as pdftotext
app = FastAPI()


app.include_router(patient)
#app.include_router(pdftotext)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=8000,host='192.168.39.129',reload=True)
