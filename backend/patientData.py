from fastapi import File,UploadFile,APIRouter,Form
import PyPDF2


patient_route = APIRouter()

# def detect_encoding(data): # just to avoid any conflicts with decoding different files with different encoding
#     result = chardet.detect(data)
#     encoding = result["encoding"]
#     return encoding

def read_patient_data():
    patient_data = {}
    
    with open("Local_storage\Input\\basicuserinfo.txt", "r") as file:
        lines = file.readlines()

    for line in lines:
        if ":" in line:
            key, value = line.strip().split(":", 1)
            patient_data[key.strip()] = value.strip()

    return patient_data



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


@patient_route.post("/patient-data")
async def test_data(name : str = Form(...),age : str = Form(...),location : str = Form(...) ,gender : str = Form(...),height : str = Form(...),weight : str = Form(...),contactinfo : str = Form(...),file : UploadFile = File(default=None)):
    if file != None:
        dat1 = await file.read()
        file_path = f"Local_storage/medical history/medical_history_pdf/{file.filename}"
        with open(file_path, "wb") as temp_file:
            temp_file.write(dat1)

    # Process the PDF file
    result = process_pdf(file_path)

    form_data = f"Name: {name}\nAge: {age}\nLocation: {location}\nGender: {gender}\n" \
                f"Height: {height}\nWeight: {weight}\nContact Info: {contactinfo}\n"
    

    file_location = "Local_storage\Input\\basicuserinfo.txt"
    with open(file_location, "a") as file:
        file.write(form_data)



    return {"data" : form_data,"status" : "success"}

@patient_route.post("/test")
def test(test : str = Form(default=None)):
    return{"data" : test}


@patient_route.get("/get-patient-data")
def post_patient_data():
    patient_data = read_patient_data()
    print(patient_data)
    return{"data" : patient_data}