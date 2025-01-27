import { useState, useEffect } from 'react';
import axios from 'axios';

const useReservationCount = () => {
  const [reservationCount, setReservationCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservationCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservations/count-reservation`);
        setReservationCount(response.data.reservationCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationCount();
  }, []);

  return { reservationCount, loading, error };
};

export default useReservationCount;
