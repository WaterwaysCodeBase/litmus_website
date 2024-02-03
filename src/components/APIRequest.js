import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { CustomButton } from "./Buttons";

function ApiRequest({ url, data, onSuccess, onError, btnLabel }) {
  const [loading, setLoading] = useState(false);

  const handleApiRequest = () => {
    setLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        onError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CustomButton
      onClick={handleApiRequest}
      disabled={loading}
      label={loading ? "Loading..." : btnLabel}
      style={{
        backgroundColor: loading ? "gray" : "blue",
        color: "white",
        padding: "10px 20px",
        cursor: loading ? "not-allowed" : "pointer",
        border: "none",
        borderRadius: "4px",
      }}
    />
    // <button
    //   onClick={handleApiRequest}
    //   disabled={loading}
    //   style={{
    //     backgroundColor: loading ? "gray" : "blue",
    //     color: "white",
    //     padding: "10px 20px",
    //     cursor: loading ? "not-allowed" : "pointer",
    //     border: "none",
    //     borderRadius: "4px",
    //   }}
    // >
    //   {loading ? "Loading..." : "Send Request"}
    // </button>
  );
}

ApiRequest.propTypes = {
  url: PropTypes.string.isRequired,
  data: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
  btnLabel: PropTypes.string,
};

export default ApiRequest;
