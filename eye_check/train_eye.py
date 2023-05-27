import tensorflow as tf
import os
import numpy as np
import cv2
from sklearn.metrics import accuracy_score

# Set the path to your data folders
cataract_path = "train/cataract"
conjunctivitis_path = "train/conjunctivitis"
normal_path = "train/normal"

image_width = 100
image_height = 100
num_channels = 3

# Collect the file paths from each folder
cataract_file = [os.path.join(cataract_path, file) for file in os.listdir(cataract_path)]
conjunctivitis_file = [os.path.join(conjunctivitis_path, file) for file in os.listdir(conjunctivitis_path)]
normal_file = [os.path.join(normal_path, file) for file in os.listdir(normal_path)]

# Create the data array and labels
data = []
labels = []

# Placeholder function for reading and preprocessing images
def read_and_preprocess_image(file_path):
    image = cv2.imread(file_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
    image = cv2.resize(image, (image_width, image_height))  # Resize the image
    image = image / 255.0  # Normalize pixel values to [0, 1]
    return image

# Load data from cataract_path
for file_path in cataract_file:
    try:
        image = read_and_preprocess_image(file_path)
        data.append(image)
        labels.append(0)  # Assign label 0 for files in folder 1
    except:
        print(f"Error reading file: {file_path}")

# Load data from conjunctivitis_path
for file_path in conjunctivitis_file:
    try:
        image = read_and_preprocess_image(file_path)
        data.append(image)
        labels.append(1)  # Assign label 1 for files in folder 2
    except:
        print(f"Error reading file: {file_path}")

# Load data from normal_path
for file_path in normal_file:
    try:
        image = read_and_preprocess_image(file_path)
        data.append(image)
        labels.append(2)  # Assign label 2 for files in folder 3
    except:
        print(f"Error reading file: {file_path}")

# Convert data and labels to numpy arrays
data = np.array(data)
labels = np.array(labels)

# Shuffle the data
random_indices = np.random.permutation(len(data))
data = data[random_indices]
labels = labels[random_indices]

# Split the data into training and testing sets
train_ratio = 0.8
train_size = int(train_ratio * len(data))

train_data = data[:train_size]
train_labels = labels[:train_size]

test_data = data[train_size:]
test_labels = labels[train_size:]

# Define the DNN model
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(image_height, image_width, num_channels)),  # Flatten the image
    tf.keras.layers.Dense(128, activation='relu'),  # Fully connected layer with 128 units
    tf.keras.layers.Dense(64, activation='relu'),   # Fully connected layer with 64 units
    tf.keras.layers.Dense(3, activation='softmax')  # Output layer with 3 units for 3 categories
])

# Compile the model
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train the model
model.fit(train_data, train_labels, epochs=800)
model.save("eye_model.h5")

print("Model saved successfully.")

# Make predictions on the test set
y_pred_prob = model.predict(train_data)
y_pred = np.argmax(y_pred_prob, axis=1)  # Convert probabilities to class labels

# Calculate accuracy
accuracy = accuracy_score(train_labels, y_pred)  # Compare true labels with predicted labels
print("Train Accuracy:", accuracy * 100)
# Evaluate the model on the
