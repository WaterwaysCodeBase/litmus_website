import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './APIs';


export function useUserPOI() {
  const [userPOI, setUserPOI] = useState(null);
  const [loading, setLoading] = useState(false);

  function getUsersPOI() {
    const uid = sessionStorage.getItem('uid');
    setLoading(true);
    const input = {
      user_id: uid,
    };
    const url = API_BASE_URL + 'application/getUserPOI';
    axios.post(url, input).then(
      (response) => {
        console.log(response.data);
        setUserPOI(response?.data);
        setLoading(false);
      },
      (error) => {
        // Handle error if needed
        setLoading(false);
      }
    );
  }

  return { userPOI, loading, getUsersPOI };
}
