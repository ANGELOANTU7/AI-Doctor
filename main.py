import uvicorn
from fastapi import FastAPI

from backend.test import test_route as test

app = FastAPI()


app.include_router(test)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=8000,host='192.168.29.239',reload=True)

