import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material"; // Ensure you have imported these components correctly
import { postAPIHandler } from "../../../../Api/api";

const TeamRankingTable = ({ formatValue }) => {
  const { seriesId } = useParams();
  const [teamRanking, setTeamRanking] = useState([]);

  // console.log("Format Value is - ", formatValue);
  useEffect(() => {
    GetTeamRanking();
  }, [seriesId, formatValue]);

  const GetTeamRanking = async () => {
    const formData = new FormData();
    formData.append("type", formatValue);

    const response = await postAPIHandler("teamRanking", formData);
    // console.log("GetTeamRanking response-->", response);
    const data = response.data;

    const uniqueData = Array.isArray(data)
      ? data.filter(
          (team, index, self) =>
            index ===
            self.findIndex((t) => t.rank === team.rank && t.team === team.team)
        )
      : [];

    const sortedData = uniqueData.sort((a, b) => a.rank - b.rank);
    // console.log("sortedData - ", sortedData);
    setTeamRanking(sortedData);
    // setLoading(false);
  };

  return (
    <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto teamRanking-table">
      <div className="flex flex-wrap justify-between bg-gradient-to-r from-[#39441d] to-[#141815] py-3 rounded-lg lg:px-[10%] px-[5%]">
        <span className="rank-field">Rank</span>
        <span className="teamName-field">Team</span>
        <span>Rating</span>
        <span>Points</span>
      </div>
      {teamRanking.map((team, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-between w-100 py-3 rounded-lg mt-2 bg-[#232525] hover:bg-[#393c3c] lg:px-[10%] px-[5%]"
        >
          <span className="rank-field">{team.rank}</span>
          <span className="teamName-field">{team.team}</span>
          <span>{team.rating}</span>
          <span>{team.point}</span>
        </div>
      ))}
    </div>
  );
};

export default TeamRankingTable;
