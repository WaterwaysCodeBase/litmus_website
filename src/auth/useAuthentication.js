import Cookies from "js-cookie";
import { useState, useEffect } from "react";


export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    try {
      const token = Cookies.get("token"); // Assuming you store the token in sessionStorage
      const user_id = Cookies.get("uid"); // Assuming you store the user_id in sessionStorage

      if (token && user_id) {
        // const input = { token: token, user_id: user_id };
        // const apiUrl = API_BASE_URL + "/auth/checkLoginUser"; // Replace with your actual API endpoint
        // const response = axios.post(apiUrl, input);
        setIsAuthenticated(true);
        // if (response.data.status === 200) {
        //   // Token is valid, user is authenticated
        //   setIsAuthenticated(true);
        // } else {
        //   // Token is invalid or expired, user is not authenticated
        //   setIsAuthenticated(false);
        // }
      } else {
        // Token or user_id is not found in sessionStorage
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle any errors that occur during the verification process
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
