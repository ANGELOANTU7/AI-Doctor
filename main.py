import uvicorn
from fastapi import FastAPI

#from backend.patientData import patient_route as patient
#from backend.NotesToText import router as pdftotext
#from backend.SkinAnalysis import router as skin

#from backend.eye_check import router as eyecheck
#from backend.gen_prescription import router as gen_pre_router
from eye_check.eye import router as eye_check_router
app = FastAPI()


#app.include_router(patient)
#app.include_router(pdftotext)

#app.include_router(skin)
#app.include_router(gen_pre_router)
app.include_router(eye_check_router)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=8000,host='192.168.39.129',reload=True)
