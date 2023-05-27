import random
import os
import numpy as np
from keras.applications.mobilenet import MobileNet 
from keras.preprocessing import image
from keras.applications.mobilenet import preprocess_input, decode_predictions
from keras.models import model_from_json
import keras
from keras import backend as K
from fastapi import APIRouter,File, UploadFile, Form
import shutil
from keras.utils import load_img


router = APIRouter()


SKIN_CLASSES = {
  0: 'Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease)',
  1: 'Basal Cell Carcinoma',
  2: 'Benign Keratosis',
  3: 'Dermatofibroma',
  4: 'Melanoma',
  5: 'Melanocytic Nevi',
  6: 'Vascular skin lesion'

}



def load_model():
    # Load the model architecture from JSON
    with open('modelnew.json', 'r') as json_file:
        loaded_json_model = json_file.read()
        model = model_from_json(loaded_json_model)
    # Load the model weights
    model.load_weights('modelnew.h5')
    return model

def preprocess_image(img):
    img = img.resize((224, 224))
    img = np.array(img)
    img = img.reshape((1, 224, 224, 3))
    img = img / 255.0
    return img

@router.post("/skin")
async def upload_file(file: UploadFile = File(...)):
    path = 'Local_storage/skin pictures/' + file.filename
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    model = load_model()
    img = load_img(path, target_size=(224, 224))
    img = preprocess_image(img)
    
    prediction = model.predict(img)
    pred = np.argmax(prediction)
    disease = SKIN_CLASSES[pred]
    accuracy = float(prediction[0][pred])  # Convert to Python float
    
    K.clear_session()
    return {"disease": disease, "accuracy": accuracy}