import { useState, useEffect } from 'react';
import axios from 'axios';

const useNonUserCount = () => {
  const [nonUserCount, setNonUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNonUserCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/count-not-user`);
        setNonUserCount(response.data.nonUserCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNonUserCount();
  }, []);

  return { nonUserCount, loading, error };
};

export default useNonUserCount;
