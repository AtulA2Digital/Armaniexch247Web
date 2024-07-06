import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import "../style.css";
import BattingStat from "./Batting";
import BowlingStat from "./Bowling";

const Stats = ({ statType }) => {
  //   console.log("StatData - ", statData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [statType]);

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );
  }
  return (
    <>
      {statType === "Batting" && <BattingStat />}
      {statType === "Bowling" && <BowlingStat />}
    </>
  );
};

export default Stats;
