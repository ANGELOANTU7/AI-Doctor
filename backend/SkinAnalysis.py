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
import io
from PIL import Image



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



@router.post('/skin')
def upload_file(file: UploadFile = File(...)):
    path='Local_storage/skin pictures/'+file.filename
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    j_file = open('modelnew.json', 'r')
    loaded_json_model = j_file.read()
    j_file.close()
    model = model_from_json(loaded_json_model)
    model.load_weights('modelnew.h5')
    content = await file.read()  # Read the uploaded file as bytes
    img = Image.open(BytesIO(content))  # Open the file-like object with PIL
    img = img.resize((224, 224))  # Resize the image if desired
    img1 = Image.open(file)
    img1 = img1.resize((224, 224))
    img1 = np.array(img1)
    img1 = img1.reshape((1,224,224,3))
    img1 = img1/255
    prediction = model.predict(img1)
    pred = np.argmax(prediction)
    disease = SKIN_CLASSES[pred]
    accuracy = prediction[0][pred]
    K.clear_session()
    return {"diease:"+disease+"  accuracy:"+accuracy}