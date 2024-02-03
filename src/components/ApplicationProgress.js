import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "./APIs";
import axios from "axios";
import { Progress } from "@chakra-ui/react";

const ApplicationProgress = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Replace 'user_id' with the actual user ID from your session storage
    const user_id = sessionStorage.getItem("uid");

    // Make an API request to fetch the user's application progress
    const url = API_BASE_URL + "/dashboard/getProfileStrenght.php";
    axios
      .post(url, { user_id: user_id })
      .then((response) => {
        // Assuming the server responds with the application progress

        setProgress(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching application progress: ", error);
      });
  }, []);

  return (
    <div>
      <h2>Application Progress</h2>
      {progress !== null ? (
        <Progress mt={2} value={progress} size="lg" colorScheme={"blue"} />
      ) : (
        <Progress size="xs" isIndeterminate />
      )}
    </div>
  );
};

export default ApplicationProgress;
