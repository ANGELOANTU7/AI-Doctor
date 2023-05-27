import uvicorn
from fastapi import APIRouter, UploadFile, File
import numpy as np
import cv2
import tensorflow as tf
import os
from keras.models import load_model

router = APIRouter()

# Load the trained DNN model
model = tf.keras.models.load_model('models/trained_model.h5')


# Define the path to the folder containing test images
test_folder = 'Local_storage/throat pic'

# Preprocess function to resize and normalize the image
def preprocess_and_extract_features(image):
    # Preprocess the image (e.g., resize, convert to grayscale, etc.)
    preprocessed_image = cv2.resize(image, (224, 224))
    preprocessed_image = cv2.cvtColor(preprocessed_image, cv2.COLOR_BGR2GRAY)
    # Flatten the image to a 1D array as input to the DNN
    feature_vector = preprocessed_image.flatten()
    return feature_vector

# Prediction route
@router.post("/predict_throat")
async def predict(file: UploadFile = File(...)):
    predictions = []
    for filename in os.listdir(test_folder):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            img_path = os.path.join(test_folder, filename)
            img = cv2.imread(img_path)
            # Preprocess the test image and extract features
            feature_vector = preprocess_and_extract_features(img)
            # Reshape the feature vector to match the input shape of the model
            feature_vector = np.reshape(feature_vector, (1, -1))
            # Normalize the feature values
            feature_vector = feature_vector / 255.0
            # Make prediction on the preprocessed image
            prediction = model.predict(feature_vector)
            # Set a threshold of 0.5 to convert the prediction to class labels
            label = 1 if prediction > 0.5 else 0
            predictions.append(label)




