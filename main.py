import uvicorn
from fastapi import FastAPI

from backend.patientData import patient_route as patient

app = FastAPI()


app.include_router(patient)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=8000,host='127.0.0.1',reload=True)

