import { useEffect, useState } from 'react';
import Papa from 'papaparse';

function useStatsData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse('/data/stats.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      }
    });
  }, []);

  return { data, loading };
}

export default useStatsData;