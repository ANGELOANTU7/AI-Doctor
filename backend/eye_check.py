import os
import numpy as np
import json
from fastapi import APIRouter, UploadFile, File
from keras.models import load_model
from PIL import Image
import shutil

router = APIRouter()

@router.post('/predict')
async def upload_file(file: UploadFile = File(...)):
    CLASSES = {'Cataract': 0, 'Diabetes': 1, 'Glaucoma': 2, 'Normal': 3, 'Other': 4}
    path = 'Local_storage/eye pictures/' + file.filename
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    im = Image.open(path)
    im = im.resize((150, 150))

    test = np.array(im)
    test = np.expand_dims(test, axis=0)

    model = load_model('models/final.h5')
    prediction = model.predict(test)
    predictions = prediction.tolist()[0]
    prediction_index = np.argmax(predictions)
    percentage = predictions[prediction_index]

    response = {
        'prediction': str(prediction_index),
        'percentage': percentage
    }

    return CLASSES[response]
