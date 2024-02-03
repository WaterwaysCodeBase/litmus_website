import React from "react";
import { useUserAccessLevel } from "../hooks/useUserAccessLevel";
import { LoadingSpinner } from "../components/LoadingSpinner";

const UserLevelLoader = ({ children }) => {
  const [loading, accessLevel] = useUserAccessLevel();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children(accessLevel)}</>;
};

export default UserLevelLoader;
