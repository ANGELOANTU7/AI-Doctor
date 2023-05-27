from fastapi import File,UploadFile,APIRouter
import chardet

test_route = APIRouter()

def detect_encoding(data): # just to avoid any conflicts with decoding different files with different encoding
    result = chardet.detect(data)
    encoding = result["encoding"]
    return encoding

@test_route.get("/")
def test():
    return {"message" : "hello.....basics okey"}


@test_route.post("/test-data")
async def test_data(name : str,age : str,place : str ,file1 : UploadFile = File(...)):
    dat1 = await file1.read()
    enc1 = detect_encoding(dat1)
    dat1_decoded = dat1.decode(enc1)

    return {"name" : name, "age" : age, "place" : place, "encoding" : enc1, "data" : dat1_decoded}
