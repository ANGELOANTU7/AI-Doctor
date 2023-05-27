from fastapi import APIRouter
from pydantic import BaseModel

from sklearnex import patch_sklearn
patch_sklearn()

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

# Sample training data: disease-symptom-prescription mappings
training_data = [
    ("headache", "pain", "Ibuprofen 400mg, take twice daily as needed for pain relief"),
    ("headache", "migraine", "Sumatriptan 50mg, take at the onset of migraine for relief"),
    ("common cold", "cough, runny nose", "Over-the-counter cold medicine, take as directed on the package"),
    ("common cold", "sore throat, congestion", "Acetaminophen 500mg, take for fever and throat pain"),
    ("hypertension", "high blood pressure", "Lisinopril 10mg, take once daily for blood pressure control"),
    ("hypertension", "headache, dizziness", "Amlodipine 5mg, take once daily for blood pressure control"),
    ("diabetes", "excessive thirst, frequent urination", "Metformin 500mg, take twice daily with meals"),
    ("diabetes", "numbness in extremities", "Gliclazide 80mg, take once daily before breakfast"),
    ("asthma", "wheezing, shortness of breath", "Albuterol inhaler, use as needed for asthma symptoms"),
    ("asthma", "coughing at night, chest tightness", "Fluticasone inhaler, use daily for asthma control"),
    ("allergies", "sneezing, itchy eyes", "Loratadine 10mg, take once daily for allergy relief"),
    ("allergies", "skin rash, hives", "Cetirizine 10mg, take once daily for allergic reactions"),
    ("acid reflux", "heartburn, regurgitation", "Omeprazole 20mg, take once daily before a meal"),
    ("acid reflux", "chest pain, difficulty swallowing", "Ranitidine 150mg, take twice daily for acid reflux"),
    ("urinary tract infection", "frequent urination, burning sensation", "Trimethoprim-sulfamethoxazole, take twice daily for UTI"),
    ("urinary tract infection", "cloudy urine, abdominal pain", "Nitrofurantoin 100mg, take four times daily for UTI"),
    ("insomnia", "difficulty falling asleep", "Melatonin 5mg, take 30 minutes before bedtime for sleep support"),
    ("insomnia", "waking up frequently during the night", "Zolpidem 10mg, take as needed for sleeplessness"),
    ("depression", "persistent sadness, loss of interest", "Sertraline 50mg, take once daily for depression treatment"),
    ("depression", "difficulty concentrating, changes in appetite", "Escitalopram 10mg, take once daily for depression treatment")
]

# Prepare training data
diseases, symptoms, prescriptions = zip(*training_data)

# Vectorize symptoms
vectorizer = CountVectorizer()
X_symptoms = vectorizer.fit_transform(symptoms)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X_symptoms, diseases)

class PrescriptionRequest(BaseModel):
    disease: str
    symptom: str

router = APIRouter()

@router.post("/generate_prescription")
def generate_prescription(disease:str , symptom:str):

    # Vectorize input symptom
    X_symptom = vectorizer.transform([symptom])

    # Predict disease
    predicted_disease = model.predict(X_symptom)

    if predicted_disease[0] == disease:
        return {"prescription": prescriptions[diseases.index(disease)]}
    else:
        return {"message": "Prescription not found for the given disease and symptom."}
def generate_prescription(disease:str , symptom:str):

    # Vectorize input symptom
    X_symptom = vectorizer.transform([symptom])

    # Predict disease
    predicted_disease = model.predict(X_symptom)

    if predicted_disease[0] == disease:
        return {"prescription": prescriptions[diseases.index(disease)]}
    else:
        return {"message": "Prescription not found for the given disease and symptom."}