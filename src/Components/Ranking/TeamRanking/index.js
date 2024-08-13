import React, { useEffect, useState } from "react";
import { postAPIHandler } from "../../../Api/api";

const TeamRanking = ({ formatTypes }) => {
  const [teamRanking, setTeamRanking] = useState([]);

  useEffect(() => {
    GetTeamRanking();
  }, [formatTypes]);

  const GetTeamRanking = async () => {
    const formData = new FormData();
    formData.append("type", formatTypes === "ODI" ? 1 : formatTypes === "Test" ? 2 : 3);

    const response = await postAPIHandler("teamRanking", formData);
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
    <div className="teamRanking-table">
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

export default TeamRanking;
