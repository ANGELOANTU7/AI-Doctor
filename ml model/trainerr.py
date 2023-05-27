import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Flatten
import time


# Define the path to the folders containing normal throat and tonsillitis images
normal_throat_folder = 'ml model/normal pictures'
tonsillitis_folder = 'ml model/tonsilatitis pictures'

def preprocess_and_extract_features(image):
    # Preprocess the image (e.g., resize, convert to grayscale, etc.)
    preprocessed_image = cv2.resize(image, (224, 224))
    preprocessed_image = cv2.cvtColor(preprocessed_image, cv2.COLOR_BGR2GRAY)
    # Flatten the image to a 1D array as input to the DNN
    feature_vector = preprocessed_image.flatten()
    return feature_vector

# Read images from the folders and extract features
X = []
y = []

# Load normal throat images
for filename in os.listdir(normal_throat_folder):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        img_path = os.path.join(normal_throat_folder, filename)
        img = cv2.imread(img_path)
        # Preprocess the image and extract features
        feature_vector = preprocess_and_extract_features(img)
        X.append(feature_vector)
        y.append(0)  # Label 0 represents normal throat

# Load tonsillitis images
for filename in os.listdir(tonsillitis_folder):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        img_path = os.path.join(tonsillitis_folder, filename)
        img = cv2.imread(img_path)
        # Preprocess the image and extract features
        feature_vector = preprocess_and_extract_features(img)
        X.append(feature_vector)
        y.append(1)  # Label 1 represents tonsillitis

# Convert the data to numpy arrays
X = np.array(X)
y = np.array(y)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize feature values
X_train = X_train / 255.0
X_test = X_test / 255.0

# Create and compile the DNN model
model = Sequential()
model.add(Dense(64, activation='relu', input_shape=(X_train.shape[1],)))
model.add(Dense(64, activation='relu'))
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Start the timer
start_time = time.time()

# Train the DNN model
model.fit(X_train, y_train, epochs=1000, batch_size=32)

# Calculate the training time
training_time = time.time() - start_time
print("Training time: {:.2f} seconds".format(training_time))

# Save the model to a file
model.save("trained_model.h5")
print("Model saved successfully.")

# Make predictions on the test set
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy: {:.2f}%".format(accuracy * 100))


