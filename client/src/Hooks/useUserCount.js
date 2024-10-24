import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserCount = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/users/count-user-role`);
        setUserCount(response.data.userCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return { userCount, loading, error };
};

export default useUserCount;
