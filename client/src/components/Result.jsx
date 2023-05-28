import React, { useState, useEffect } from 'react';

const Result = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.237.129:8000/get-report');
        const data = await response.json();
        const input = data.summary;
        handleMessage(input);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMessage = async (input) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Create a medical report based on the provided text.',
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      const message = data.choices[0].message.content;

      setOutput(message);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
  };

  return (
    <div className=" py-4 w-screen">
        <p>{output}</p>
      
    </div>
  );
};

export default Result;
