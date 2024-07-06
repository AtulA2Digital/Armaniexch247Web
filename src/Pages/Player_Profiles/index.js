import React from "react";
import { useParams } from "react-router-dom";

const Player_Profiles = () => {
  const { playerId } = useParams();
  return <div>Player_Profiles</div>;
};

export default Player_Profiles;
