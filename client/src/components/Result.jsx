import React, { useState } from 'react';

const Result = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [numDays, setNumDays] = useState('');

  const API_KEY = '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';

  const handleMessage = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Create a report according to details taken from patient.`,
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

      setOutput(formatOutput(message));
    } catch (error) {
      console.error(error);
    }
  };

 


  return (
    <div className="bg-gray-100 py-8 px-4 w-screen mt-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My health Report</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">

        
      </div>
    </div>
  );
};

export default Result;