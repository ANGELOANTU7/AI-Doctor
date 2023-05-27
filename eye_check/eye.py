import tensorflow as tf
import numpy as np
import cv2
from collections import Counter
from fastapi import APIRouter, UploadFile, File
import multipart

router = APIRouter()

# Set the path to your saved model
model_path = "eye_check/eye_model.h5"

# Load the model
model = tf.keras.models.load_model(model_path)

# Set the video path
video_path = "eye_video.mp4"

# Set the image width, height, and number of channels
image_width = 100
image_height = 100
num_channels = 3

# Open the video file
video = cv2.VideoCapture(video_path)

predictions = []


def preprocess_image(image):
    # Preprocess the image
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
    image = cv2.resize(image, (image_width, image_height))  # Resize the image
    image = image / 255.0  # Normalize pixel values to [0, 1]
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image


def predict_label(image):
    # Make predictions
    prediction = model.predict(image)
    predicted_label = np.argmax(prediction[0])
    return predicted_label

@router.post("/eyecheck")
async def predict_eye_condition(file: UploadFile = File(...)):
    video_path = 'Local_storage/throat/video/' + file.filename
    video = cv2.VideoCapture(video_path)
    while True:
        # Read a frame from the video
        ret, frame = video.read()

        # Check if the video has reached the end
        if not ret:
            break

        # Preprocess the frame
        image = preprocess_image(frame)

        # Make predictions
        predicted_label = predict_label(image)

        # Append the predicted label to the list
        predictions.append(predicted_label)

    # Count the occurrences of each predicted label
    label_counts = Counter(predictions)

    if predictions:
        most_common_label = label_counts.most_common(1)[0][0]
        # Define the label names
        label_names = ["Cataract", "Conjunctivitis", "Normal"]
        # Return the final predicted label
        return {"Eye : ": label_names[most_common_label]}
    else:
        return {"message": "No predictions made."}

