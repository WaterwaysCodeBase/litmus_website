// authProvider.js
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const getUsersInfo = useCallback(async () => {
    try {
      setLoading(true);
       const url = API_BASE_URL + 'application/getUserDetails';
   
      const response = await axios.post(url, { user_id: Cookies.get("uid") });
      setUserDetails(response?.data);
      setLoading(false);

      const userInfo = response?.data;
      const userInfoString = JSON.stringify(userInfo);
      Cookies.set('userInfo', userInfoString);
      Cookies.set('getUserInfo', true);
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching user details:', error);
      setLoading(false);
    }
  }, []); // Empty dependency array ensures the function reference doesn't change

  useEffect(() => {
    getUsersInfo();
  }, [getUsersInfo]);

  const signIn = async (userDetails) => {
    setLoading(true);
    try {
      if (userDetails) {
        setUserDetails(userDetails);
        setLoading(false);
      } else {
        setUserDetails(null);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      setUserDetails(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const memoedValue = useMemo(() => ({
    userDetails,
    signIn,
    signOut,
    loading,
    getUsersInfo,
  }), [userDetails, loading, getUsersInfo]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {loadingInitial ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}