import React, { useState } from 'react';
import axios from 'axios';

const SkinRecord = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      setUploadError(null);

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        await axios.post('http://192.168.237.75:8081/skin', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('Photo uploaded successfully');
        // Perform any additional actions after successful upload

        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading photo:', error);
        setUploadError('Error uploading photo. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
        
      <h1>Upload Skin Photo</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
      {uploadError && <p>{uploadError}</p>}
    </div>
  );
};

export default SkinRecord;
