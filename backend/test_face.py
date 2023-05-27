import cv2
from deepface import DeepFace
import matplotlib.pyplot as plt

# Load the video file
video_path = 'backend\database\kylo\\vid.mp4'
cap = cv2.VideoCapture(video_path)

# Get video properties
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)

# Initialize DeepFace
model = DeepFace.build_model("DeepFace")

# Initialize dictionary to store emotion counts
emotion_counts = {
    'angry': 0,
    'disgust': 0,
    'fear': 0,
    'happy': 0,
    'sad': 0,
    'surprise': 0,
    'neutral': 0
}

# Initialize video writer to save the modified frames
output_path = 'backend\database\kylo\\output.mp4'  # Path to the output video file
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

# Process each frame
while cap.isOpened():
    ret, frame = cap.read()

    if not ret:
        break

    # Perform facial analysis using DeepFace
    result = DeepFace.analyze(frame)

    # Access dominant emotion from the result
    emotion = result[0]['dominant_emotion']

    # Increment the count for the detected emotion
    emotion_counts[emotion] += 1

    # Display the emotion on the frame
    cv2.putText(frame, f"Emotion: {emotion}", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Write the modified frame to the output video
    out.write(frame)

    cv2.imshow('Frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and writer, and close windows
cap.release()
out.release()
cv2.destroyAllWindows()

# Plot the emotions bar graph
emotions = list(emotion_counts.keys())
count_values = list(emotion_counts.values())

plt.bar(emotions, count_values)
plt.xlabel('Emotion')
plt.ylabel('Count')
plt.title('Emotion Analysis')
plt.show()

# Display the output video
output_cap = cv2.VideoCapture(output_path)

while output_cap.isOpened():
    ret, frame = output_cap.read()

    if not ret:
        break

    cv2.imshow('Output Video', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

output_cap.release()
cv2.destroyAllWindows()
