import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./APIs";
import Cookies from "js-cookie";

export function useApiData(apiEndpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function fetchData(inputData) {
    setLoading(true);
    const uid = Cookies.get('uid');
    const input = { ...inputData, user_id: uid };
    const url = API_BASE_URL + apiEndpoint;

    axios
      .post(url, input)
      .then(
        (response) => {
          setData(response?.data);
          setLoading(false);
        },
        (error) => {
          // Handle error if needed
          setLoading(false);
        }
      )
      .catch((error) => {
        alert(error);
      }).finally(() => {
        setLoading(false);
      });
  }

  return { data, loading, fetchData };
}

export function useCustumApi(apiEndpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function fetchData(inputData) {
    setLoading(true);
    const input = { ...inputData };
    console.log(input)
    const url = API_BASE_URL + apiEndpoint;

    axios
      .post(url, input)
      .then(
        (response) => {
          setData(response?.data);
          setLoading(false);
        },
        (error) => {
          // Handle error if needed
          setLoading(false);
        }
      )
      .catch((error) => {
        alert(error);
      });
  }

  return { data, loading, fetchData };
}
