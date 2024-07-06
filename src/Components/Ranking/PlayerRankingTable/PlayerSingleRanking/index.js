import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../../../Api/api";

const PlayerSingleRanking = ({ formatValue }) => {
  const { seriesId } = useParams();
  const [playersRanking, setPlayersRanking] = useState([]);

  useEffect(() => {
    GetPlayersRanking();
  }, [seriesId, formatValue]);

  const GetPlayersRanking = async () => {
    const formData = new FormData();
    formData.append("type", formatValue);

    const response = await postAPIHandler("playerRanking", formData);
    // console.log("GetplayersRanking response-->", response);
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
    setPlayersRanking(sortedData);
    // setLoading(false);
  };
  return (
    <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto playerRanking-table">
      <div className="flex flex-wrap justify-between bg-gradient-to-r from-[#39441d] to-[#141815] py-3 rounded-lg lg:px-[10%] px-[5%]">
        <span className="rank-field">Rank</span>
        <span className="player-name">Name</span>
        <span>Country</span>
        <span>Rating</span>
      </div>
      {playersRanking.map((team, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-between w-100 py-3 rounded-lg mt-2 bg-[#232525] hover:bg-[#393c3c] lg:px-[10%] px-[5%]"
        >
          <span className="rank-field">{team.rank}</span>
          <span className="player-name">{team.name}</span>
          <span>{team.country}</span>
          <span>{team.rating}</span>
        </div>
      ))}
    </div>
  );
};

export default PlayerSingleRanking;
