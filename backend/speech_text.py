#Build by Byte404 intelOne-API Hackathon
#API KEY ALERT 
#API CALL - /api5
import os
import azure.cognitiveservices.speech as speechsdk
from fastapi import UploadFile, APIRouter
import sounddevice as sd
import soundfile as sf
# Create an instance of APIRouter
router = APIRouter()

#student account
speech_key = "a80a0c046ff54e0c8e750f8631f06a18"
service_region = "eastus"

speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

def record_audio(duration, output_file):
    # Set the sample rate and number of channels for recording
    sample_rate = 44100  # CD quality audio
    channels = 2  # Stereo audio

    # Start recording audio
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=channels)

    print("Recording audio...")
    sd.wait()  # Wait until recording is finished

    # Save the recorded audio to a file
    sf.write(output_file, recording, sample_rate)

    print(f"Audio saved to: {output_file}")

def speech_to_text(audio_file):
    audio_config = speechsdk.audio.AudioConfig(filename=audio_file)
    print("config")
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    print("speech recog")

    result = speech_recognizer.recognize_once()
    print(result)
    
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        transcript = result.text
    else:
        transcript = "Speech recognition failed: {}".format(result.reason)

    return transcript

@router.get("/speechtotext")
def convert_speech_to_text():
    print("recording..")
    duration = 5  # Recording duration in seconds
    output_file = "Local_Storage/Audio/recorded_audio.wav"  # Output file name

    record_audio(duration, output_file)
    file_path = "Local_Storage/Audio/recorded_audio.wav"


    transcript = speech_to_text(file_path)
    transcript="."+transcript
    
        # Save the transcript to a text file
    transcript_file = "Local_Storage/Narration/response.txt"
    transcript_file1 = "Local_Storage/Input/user_response.txt"
    with open(transcript_file, "w") as f:
        f.write(transcript)
        
    with open(transcript_file1, "a") as f:
        f.write('\n')
        f.write(transcript)

    
    return transcript