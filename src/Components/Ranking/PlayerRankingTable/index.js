import React from "react";
import PlayerSingleRanking from "./PlayerSingleRanking";

const PlayerRankingTable = ({ RankingFor, rankingTypes, formatTypes }) => {

  return (
    <div className="my-4">
      <div>
        {RankingFor === "Men" ? (
          <>
            {rankingTypes === "Batting" && (
              <PlayerSingleRanking
                formatValue={formatTypes === "Test" ? "1" : formatTypes === "T20" ? "7" : "4"}
              />
            )}
            {rankingTypes === "Bowling" && (
              <PlayerSingleRanking
                formatValue={formatTypes === "Test" ? "2" : formatTypes === "T20" ? "8" : "5"}
              />
            )}
            {rankingTypes === "All Rounder" && (
              <PlayerSingleRanking
                formatValue={formatTypes === "Test" ? "3" : formatTypes === "T20" ? "9" : "6"}
              />
            )}
          </>
        ) : (
          <>
            {rankingTypes === "Batting" && (
              <PlayerSingleRanking formatValue={formatTypes === "T20" ? "13" : "10"} />
            )}
            {rankingTypes === "Bowling" && (
              <PlayerSingleRanking formatValue={formatTypes === "T20" ? "14" : "11"} />
            )}
            {rankingTypes === "All Rounder" && (
              <PlayerSingleRanking formatValue={formatTypes === "T20" ? "15" : "12"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerRankingTable;
