// src/FileUpload.js
import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleSubmit} disabled={!file || loading} variant="contained" color="primary">
        {loading ? 'Analyzing...' : 'Analyze'}
      </Button>
      {result && (
        <div>
          <h2>Sentiment Analysis Result:</h2>
          <Typography
            variant="body1"
            sx={{
              backgroundColor:
                result === 'Positive' ? 'green' : result === 'Negative' ? 'red' : 'yellow',
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '4px'
            }}
          >
            {result}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default FileUpload;
