from fastapi import APIRouter, UploadFile, File
import numpy as np
import cv2
import tensorflow as tf
import os
from keras.models import load_model
import shutil

router = APIRouter()

# Load the trained DNN model
model = tf.keras.models.load_model('models/trained_model.h5')

test_folder = 'Local_storage/throat/images'

def create_frames_from_record(record_path, output_folder):
    # Check if the output folder exists, create it if necessary
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Read the record
    cap = cv2.VideoCapture(record_path)

    # Extract frames from the record
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Save the frame as an image in the output folder
        frame_path = os.path.join(output_folder, f"frame_{frame_count}.jpg")
        cv2.imwrite(frame_path, frame)

        frame_count += 1

    # Release the video capture object
    cap.release()
    
def preprocess_and_extract_features(image):
    # Preprocess the image (e.g., resize, convert to grayscale, etc.)
    preprocessed_image = cv2.resize(image, (100, 100))
    preprocessed_image = cv2.cvtColor(preprocessed_image, cv2.COLOR_BGR2GRAY)
    # Flatten the image to a 1D array as input to the DNN
    feature_vector = preprocessed_image.flatten()
    return feature_vector

@router.post("/predict_throat")
async def predict(file: UploadFile = File(...)):
    path = 'Local_storage/throat/video/' + file.filename
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    create_frames_from_record(path,test_folder)
    predictions = []
    for filename in os.listdir(test_folder):
        if filename.endswith('.jpeg') or filename.endswith('.jpg'):
            print(filename)
            img_path = os.path.join(test_folder, filename)
            img = cv2.imread(img_path)
            # Preprocess the test image and extract features
            feature_vector = preprocess_and_extract_features(img)
            # Reshape the feature vector to match the input shape of the model
            feature_vector = np.reshape(feature_vector, (1, -1))
            # Normalize the feature values
            feature_vector = feature_vector / 255.0
            # Make prediction on the preprocessed image
            print("predicting")
            prediction = model.predict(feature_vector)
            # Set a threshold of 0.5 to convert the prediction to class labels
            label = 1 if prediction > 0.5 else 0
            predictions.append(label)
    
    print(predictions)
    predicted=max(predictions, key=predictions.count)
    name="none"
    if(predicted==0):
        name="Normal"
    if(predicted==1):
        name="Tonsillitis"

    print(name)
    return {"throat :"+name}

