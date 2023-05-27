from fastapi import File,UploadFile,APIRouter
import PyPDF2


patient_route = APIRouter()

# def detect_encoding(data): # just to avoid any conflicts with decoding different files with different encoding
#     result = chardet.detect(data)
#     encoding = result["encoding"]
#     return encoding


def process_pdf(file_path: str) -> str:
    with open(file_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        # Perform operations on the PDF file, such as extracting text
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
        return "Success"


@patient_route.get("/")
def test():
    return {"message" : "hello.....basics okey"}


@patient_route.post("/test-data")
async def test_data(name : str,age : str,location : str ,gender : str,height : str,weight : str,contactinfo : str,file : UploadFile = File(...)):
    dat1 = await file.read()
    file_path = f"temp/{file.filename}"
    with open(file_path, "wb") as temp_file:
        temp_file.write(dat1)

    # Process the PDF file
    result = process_pdf(file_path)

    # Return the result
    

    return {"name" : name, "age" : age, "location" : location,"gender" : gender, "height" : height,"weight" : weight,"contactinfo" : contactinfo,  "pdf_data" : result}
