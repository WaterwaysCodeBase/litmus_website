import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../components/APIs";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

export const useAccessLevel = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [accessLevel, setAccessLevel] = useState(null); // Initialize accessLevel state
  const toast = useToast();

  // Define the backend API endpoint to fetch the access level
  const apiUrl = API_BASE_URL + "/auth/getUserAccessLevel"; // Replace with your actual API endpoint

  // Make an Axios request to fetch the access level from the backend
  axios
    .post(apiUrl, { user_id: Cookies.get('uid') })
    .then((response) => {
      if (response.data.status === 200) {
        // Update the accessLevel state with the received value
        setAccessLevel(response.data.level);
        setLoading(false);

        // navigate('/onboarding/identity');
      }
    })
    .catch((error) => {
      console.error("Error fetching access level:", error);
      // Handle error if needed
    });

  // Return loading and accessLevel as an array
  return accessLevel;
};
