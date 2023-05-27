import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WebcamRecorder = () => {
  const videoRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);

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

  const handlePauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      setPausedTime(timer);
      setRecording(false);
    }
  };

  const handleResumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      setRecording(true);
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

  return (
    <div className='bg-emerald-500 h-screen w-screen'>
      <div className="flex flex-col items-center">
        <h1 className='text-5xl text-center mt-16 mb-12 text-white font-semibold'>Video Consult</h1>

        <motion.video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          muted
          style={{ border: '8px solid black' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="mt-8">
          <button
            onClick={handleStartRecording}
            disabled={recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Start
          </button>
          <button
            onClick={handlePauseRecording}
            disabled={!recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Pause
          </button>
          <button
            onClick={handleResumeRecording}
            disabled={!mediaRecorder || recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Resume
          </button>
          <button
            onClick={handleStopRecording}
            disabled={!mediaRecorder || !recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Stop
          </button>
          {recordedChunks.length > 0 && (
            <motion.button
              onClick={handleUploadRecording}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Recording
            </motion.button>
          )}
        </div>
        {recording && (
          <div className="mt-4">
            <p>Recording Time: {timer} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamRecorder;
