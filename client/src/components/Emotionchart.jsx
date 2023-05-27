import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Emotionchart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.237.129:8000/analyze_video');
        const { emotions, count_values } = response.data;

        const data = emotions.map((emotion, index) => ({
          emotion,
          value: count_values[index]
        }));

        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error fetching data
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4"></h2>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="emotion" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default Emotionchart;
