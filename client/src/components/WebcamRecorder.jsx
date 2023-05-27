import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WebcamRecorder = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const [botResponse, setBotResponse] = useState('');
  const [speechToText, setSpeechToText] = useState('');

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [recording]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.100.185:8081/ai_text');
        console.log('Bot response:', response.data);
        setBotResponse(response.data.blendData); // Set the bot response in state
      } catch (error) {
        console.error('Bot error:', error);
        // Handle errors
      }
    };

    const interval = setInterval(fetchData, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      recorder.addEventListener('dataavailable', handleDataAvailable);
      setMediaRecorder(recorder);

      if (pausedTime > 0) {
        recorder.start(pausedTime);
      } else {
        recorder.start();
      }

      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
      mediaRecorder.stop();
      setRecording(false);
      setPausedTime(0);
    }
  };

  const handleUploadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(blob);
    // Now you can do something with the recorded video, like upload it to a server
    // or display it in a video player

    // Reset the recording state, timer, and paused time
    setRecordedChunks([]);
    setRecording(false);
    setMediaRecorder(null);
    videoRef.current.srcObject = null;
    setTimer(0);
    setPausedTime(0);
  };

  const convertSpeechToText = async () => {
    try {
      const response = await axios.get('http://192.168.100.185:8081/speechtotext');
      console.log('Speech to text:', response.data);
      setSpeechToText(response.data); // Set the converted text in state
    } catch (error) {
      console.error('Speech to text error:', error);
      // Handle errors
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-200 to-cyan-200 w-screen h-screen'>
      <div className="flex flex-col items-center">
        <h1 className='text-5xl text-center mt-4 mb-4 text-white font-bold'>Consult 👨‍⚕️</h1>

        <motion.video
          ref={videoRef}
          width="540"
          height="380"
          autoPlay
          muted
          style={{ border: '8px solid black' }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        />

        <div className="mt-4">
          <button 
            onClick={function(event){ handleStartRecording(); startBot()}}
            disabled={recording}
            className=" text-white font-bold py-2 px-4 rounded mr-2 text-3xl"
          >
            ▶️
          </button>

          <button
            onClick={handleStopRecording}
            disabled={!mediaRecorder || !recording}
            className=" text-white font-bold py-2 px-4 rounded mr-2 text-3xl"
          >
            🛑
          </button>

          {recordedChunks.length > 0 && (
            <motion.button
              onClick={handleUploadRecording}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" text-white font-bold py-2 px-4 rounded"
            >
              Finish
            </motion.button>
          )}

          <button
            onClick={convertSpeechToText}
            className='text-white py-2 px-4 rounded text-3xl'
          >
            🎙️
          </button>
          <Link to="/dashboard">
            <button className="text-white py-2 px-4 rounded text-3xl">🏠</button>
          </Link>
        </div>

        {botResponse && <p className="mt-4 mb-4 ml-24 mr-24 text-3xl">👨‍⚕️: {botResponse}</p>}
        {speechToText && <p className="text-3xl">🤒: {speechToText}</p>}
        
      </div>
    </div>
  );
};

export default WebcamRecorder;
