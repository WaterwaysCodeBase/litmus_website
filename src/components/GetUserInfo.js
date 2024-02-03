import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './APIs';
import Cookies from 'js-cookie';

export function useUserInfo() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUsersInfo = useCallback(() => {
    setLoading(true);
    // const input = {
    //   user_id: Cookies.get("uid"),
    // };
    const url = API_BASE_URL + 'application/getUserDetails';
    axios.post(url, {
      user_id: Cookies.get("uid"),
    })
      .then((response) => {
        setUserDetails(response?.data);
        setLoading(false);
        const userInfo = response?.data;

        // Convert the object to a JSON string
        const userInfoString = JSON.stringify(userInfo);

        // Set the cookie with the JSON string
        Cookies.set('userInfo', userInfoString);
        Cookies.set('getUserInfo', true);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
      
  }, []); // Empty dependency array ensures the function reference doesn't change

  useEffect(() => {
    // Check if user details are already stored in cookies
    // If not stored, make the Axios request
    getUsersInfo();
  }, []); // No need to include getUsersInfo in the dependency array

  return { userDetails, loading, getUsersInfo };
}
