import { useEffect, useState } from 'react';
import Papa from 'papaparse';

function useGamesData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse('/data/games.csv', {
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

export default useGamesData;