import numpy as np
import json
import io
from fastapi import APIRouter, UploadFile
from keras.models import load_model
from PIL import Image

app = APIRouter()

@app.post('/eyecheck')
async def apicall(files: UploadFile = UploadFile(...)):

    image = await files.read()
    im = Image.open(io.BytesIO(image))
    im = im.resize((150, 150))

    test = np.array(im)
    test = np.expand_dims(test, axis=0)

    model = load_model('Files/final.h5')
    prediction = model.predict(test)
    predictions = prediction.tolist()[0]
    prediction = np.argmax(predictions)
    percentage = predictions[prediction]

    response = {
        'prediction': str(prediction),
        'percentage': percentage
    }

    return response

