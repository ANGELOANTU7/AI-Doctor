from fastapi import File,UploadFile,APIRouter
import chardet

test_route = APIRouter()

def detect_encoding(data):
    result = chardet.detect(data)
    encoding = result["encoding"]
    return encoding

@test_route.get("/")
def test():
    return {"message" : "hello.....basics okey"}


@test_route.post("/test-data")
async def test_data(file1 : UploadFile = File(...)):
    dat1 = await file1.read()
    enc1 = detect_encoding(dat1)
    dat1_decoded = dat1.decode(enc1)

    return {"data" : dat1_decoded, "encoding" : enc1}
