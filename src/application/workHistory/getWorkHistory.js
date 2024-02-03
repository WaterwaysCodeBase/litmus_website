// WorkHistoryComponent.js (Your React Component)

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../components/APIs";
import { Heading } from "@chakra-ui/react";

function WorkHistoryComponent() {
  const [workHistory, setWorkHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch work history data
    const uid = sessionStorage.getItem("uid");

    axios
      .post(API_BASE_URL + "application/getUserWorkHistory", { user_id: uid })
      .then((response) => {
        setWorkHistory(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching work history data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(workHistory) && workHistory.length > 0 ? (
        <ul style={{ listStyle: 'none' }}>
          {workHistory.map((work, index) => (
            <li key={index}>
              <strong>Employer Name:</strong> {work.employer_name}
              <br />
              <strong>Position Held:</strong> {work.position_held}
              <br />
              <strong>Experience:</strong> {work.experience}
              <br />
              <strong>Reason for Leave:</strong> {work.reason_for_leave}
              <br />
              <strong>Start Date:</strong> {work.start_date}
              <br />
              <strong>End Date:</strong> {work.end_date}
              <br />
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No work history data available.</p>
      )}
    </div>
  );
}

export default WorkHistoryComponent;
