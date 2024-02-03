import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./APIs";

export function useAddressInfo() {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  function getUserAddress() {
    const uid = sessionStorage.getItem("uid");
    setLoading(true);
    const input = {
      user_id: uid,
    };
    const url = API_BASE_URL + "application/getUserAddress";
    axios.post(url, input).then(
      (response) => {
        console.log(response.data);
        setUserAddress(response?.data);
        setLoading(false);
      },
      (error) => {
        // Handle error if needed
        setLoading(false);
      }
    );
  }

  return { userAddress, loading, getUserAddress };
}
