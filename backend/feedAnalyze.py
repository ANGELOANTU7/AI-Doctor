from fastapi import BackgroundTasks,APIRouter
import cv2
import time
from deepface import DeepFace
import matplotlib.pyplot as plt
import asyncio
import concurrent.futures



route_feed_analysis = APIRouter()

# Define the video processing function
async def process_video():
    video_path = 'backend\database\kylo\\vid2.mp4'

    cap = cv2.VideoCapture(video_path)

    # Get video properties
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

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
    def process_frame(frame):
        # Perform facial analysis using DeepFace
        result = DeepFace.analyze(frame)

        # Access dominant emotion from the DeepFace result
        emotion = result[0]['dominant_emotion']

        # Increment the count for the detected emotion
        emotion_counts[emotion] += 1

        # Display the emotion on the frame
        cv2.putText(frame, f"Emotion: {emotion}", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        return frame

    frame_count = 0
    start_time = time.time()

    loop = asyncio.get_event_loop()
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as executor:
        while cap.isOpened():
            ret, frame = cap.read()

            if not ret:
                break

            # Submit the frame for processing in a separate thread
            future = loop.run_in_executor(executor, process_frame, frame)

            # Write the modified frame to the output video
            out.write(await future)

            frame_count += 1

        end_time = time.time()

    # Release the video capture and writer
    cap.release()
    out.release()

    # Calculate the actual frame rate of the processed frames
    elapsed_time = end_time - start_time
    actual_fps = frame_count / elapsed_time

    # Plot the emotions bar graph
    emotions = list(emotion_counts.keys())
    count_values = list(emotion_counts.values())

    plt.bar(emotions, count_values)
    plt.xlabel('Emotion')
    plt.ylabel('Count')
    plt.title('Emotion Analysis')
    plt.savefig('emotion_analysis.png')

    # Return the graph details
    return emotions, count_values

@route_feed_analysis.post("/analyze_video")
async def process_video_route(background_tasks: BackgroundTasks):
    # Run the video processing in the background
    graph_details = await asyncio.create_task(process_video())

    return {"emotions": graph_details[0], "count_values": graph_details[1]}

@route_feed_analysis.post("/test-analysis")
def test_data():
    return {"emotions": ["angry","disgust","fear","happy","sad","surprise","neutral"],"count_values": [10,0,0,30,1,1,69]}