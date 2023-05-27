import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.feedAnalyze import route_feed_analysis as feed_analysis

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
#app.include_router(skin)
# include other API routers as needed

if __name__ == "__main__":
    uvicorn.run("main:app",port=6000,host='192.168.237.75',reload=True)
