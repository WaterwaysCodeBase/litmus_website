// import { createContext, useContext } from 'react';

// const UserContext = createContext();

// export function useUserContext() {
//   return useContext(UserContext);
// }

// export function UserContextProvider({ children, userDetails }) {
//   return (
//     <UserContext.Provider value={userDetails}>{children}</UserContext.Provider>
//   );
// }

// authProvider.js
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoadingSpinner } from './LoadingSpinner';
import { API_BASE_URL } from './APIs';
import { useAccessLevel } from '../auth/getUserAccessLevel';



export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loading, setLoading] = useState(false);


  const getUsersInfo = useCallback(async () => {
    try {
      setLoading(true);
      const url = API_BASE_URL + 'application/getUserDetails';

      const response = await axios.post(url, { user_id: Cookies.get("uid") });

      setUserDetails(response?.data);
      setUser(response?.data);

      localStorage.setItem('userInfo', JSON.stringify(response?.data))
      Cookies.set('getUserInfo', true);
      setLoading(false);
    } catch (error) {
      // Handle error if needed
      console.error('Error fetching user details:', error);
      setLoading(false);
    }
  }, []); // Empty dependency array ensures the function reference doesn't change

  useEffect(() => {
    getUsersInfo();
  }, [getUsersInfo]);

  const signIn = async () => {
    setLoading(true);
    try {
      getUsersInfo();
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
    user
  }), [userDetails, loading, getUsersInfo, user]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useUserContext() {
  return (useContext(AuthContext));
}
