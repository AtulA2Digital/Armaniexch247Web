import React, { useState } from "react";
import RankingIcon from "../../Images/Cricket-Pages/Heading Icons/points-table.webp";
import TeamRanking from "./TeamRanking";
import PlayerRankingTable from "./PlayerRankingTable";

const Ranking = ({ RankingFor }) => {
  const [rankingTypesValue, setrankingTypesValue] = useState("Batting");
  const [formatTypeValue, setFormatTypeValue] = useState("ODI");
  // console.log("RankingFor - ", RankingFor);

  const formatTypes = [
    { typename: "ODI" },
    { typename: "Test" },
    { typename: "T20" },
  ];

  const rankingTypes = [
    { typename: "Batting" },
    { typename: "Bowling" },
    { typename: "All Rounder" },
    { typename: "Team" },
  ];

  return (
    <div className="mb-10 pt-4 pb-8 mx-xl-0 mx-4">
      {/* Ranking Type Tabs & Heading */}
      <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto pb-2">
        <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-5 w-100">
          <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex lg:justify-start items-center justify-center gap-x-4 mb-0">
            <img
              src={RankingIcon}
              alt="squads"
              className="w-[60px] border-2 rounded-full border-[#fff] p-2 bg-[#000]"
            />
            ICC {RankingFor}'s Cricket Ranking
          </p>
        </div>
        <div className="ranking-type lg:space-x-4 space-x-2 flex pb-3 border-b-2 border-[#ffffff14]">
          {rankingTypes.map((format, ind) => (
            <span
              style={{
                backgroundColor:
                  format.typename === rankingTypesValue ? "#3AB949" : "white",
                color: format.typename === rankingTypesValue ? "white" : "black",
              }}
              onClick={() => setrankingTypesValue(format.typename)}
              key={ind}
              className={`info-hover bg-[#ffffff]  px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${RankingFor === "Women" && format.typename === "Team"
                ? "hidden"
                : "inline-block "
                }`}
            >
              {format.typename}
            </span>
          ))}
        </div>
      </div>

      {/* Format Type & Table */}
      <div className="my-4">
        {/* Format Type */}
        <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto pb-4">
          <div className="pb-4 border-b-2 border-[#ffffff14] lg:space-x-4 space-x-2">
            {formatTypes.map((format, ind) => (
              <span
                style={{
                  backgroundColor:
                    format.typename === formatTypeValue ? "#3AB949" : "white",
                  color:
                    format.typename === formatTypeValue ? "white" : "black",
                }}
                onClick={() => setFormatTypeValue(format.typename)}
                key={ind}
                className={`info-hover bg-[#ffffff]  px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${RankingFor === "Women" && format.typename === "Test"
                  ? "hidden"
                  : "inline-block"
                  }`}
              >
                {format.typename}
              </span>
            ))}
          </div>
          {/* Data Table */}
          {/* Team ranking Table */}
          {(RankingFor === "Men" && rankingTypesValue === "Team") && (
            <TeamRanking formatTypes={formatTypeValue} />
          )}

          {/* Player Ranking Table */}
          {(rankingTypesValue !== "Team") && (
            <PlayerRankingTable RankingFor={RankingFor} rankingTypes={rankingTypesValue} formatTypes={formatTypeValue} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
