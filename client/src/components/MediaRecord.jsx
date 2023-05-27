import { ReactMediaRecorder } from 'react-media-recorder';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/95915-chat-bot-animation.json';
import axios from 'axios';

const MediaRecord = () => {
  const handleVideoUpload = async (videoBlob) => {
    const formData = new FormData();
    formData.append('video', videoBlob);

    try {
      const response = await axios.post('http://your-api-endpoint', formData);
      console.log('Video upload response:', response.data);
      // Handle the API response here
    } catch (error) {
      console.error('Video upload error:', error);
      // Handle errors
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-slate-100">
      <Lottie animationData={animationData} style={{ width: 300, height: 200 }} />
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div className="flex flex-col items-center">
            <p className="text-4xl mb-4 font-semibold color">Status: {status}</p>
            <motion.button
              onClick={startRecording}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Start Meet 👨‍⚕️
            </motion.button>
            <motion.button
              onClick={() => {
                stopRecording();
                handleVideoUpload(mediaBlobUrl);
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Stop Meet 💊
            </motion.button>
            {mediaBlobUrl && (
              <motion.video
                src={mediaBlobUrl}
                controls
                autoPlay
                loop
                style={{ border: '2px solid black' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MediaRecord;
