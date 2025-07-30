// src/hooks/useInferenceData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function useInferenceData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/inference').then(res => setData(res.data));
  }, []);

  return data;
}

export default useInferenceData;
