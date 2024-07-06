import React, { useState } from "react";
import PlayerSingleRanking from "./PlayerSingleRanking";

const PlayerRankingTable = ({ typeValue, RankingFor }) => {
  const [odiToggle, setOdiToggle] = useState(true);
  const [t20Toggle, setT20Toggle] = useState(false);
  const [testToggle, setTestToggle] = useState(false);
  // console.log("typeValue -", typeValue);

  const handleOdiToggle = () => {
    setOdiToggle(true);
    setT20Toggle(false);
    setTestToggle(false);
  };

  const handleT20Toggle = () => {
    setT20Toggle(true);
    setOdiToggle(false);
    setTestToggle(false);
  };

  const handleTestToggle = () => {
    setTestToggle(true);
    setT20Toggle(false);
    setOdiToggle(false);
  };

  const formatTypesMen = [
    {
      typename: "ODI",
      clickEvent: handleOdiToggle,
      activateBtn: odiToggle,
    },
    {
      typename: "Test",
      clickEvent: handleTestToggle,
      activateBtn: testToggle,
    },
    {
      typename: "T20",
      clickEvent: handleT20Toggle,
      activateBtn: t20Toggle,
    },
  ];

  const formatTypesWomen = [
    {
      typename: "ODI",
      clickEvent: handleOdiToggle,
      activateBtn: odiToggle,
    },
    {
      typename: "T20",
      clickEvent: handleT20Toggle,
      activateBtn: t20Toggle,
    },
  ];

  return (
    <div className="my-4">
      <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto pb-4">
        <div className="pb-4 border-b-2 border-[#ffffff14] lg:space-x-4 space-x-2">
          {(RankingFor === "Men" ? formatTypesMen : formatTypesWomen).map(
            (format, ind) => {
              return (
                <span
                  style={{
                    backgroundColor: format.activateBtn ? "#3AB949" : "white",
                    color: format.activateBtn ? "white" : "black",
                  }}
                  onClick={format.clickEvent}
                  key={ind}
                  className="info-hover bg-[#ffffff]  px-6 py-2 rounded-[32px] font-[600] cursor-pointer  "
                >
                  {format.typename}
                </span>
              );
            }
          )}
        </div>
      </div>
      <div>
        {RankingFor === "Men" ? (
          <>
            {typeValue === "Batter" && (
              <PlayerSingleRanking
                formatValue={testToggle ? "1" : t20Toggle ? "7" : "4"}
              />
            )}
            {typeValue === "Bowler" && (
              <PlayerSingleRanking
                formatValue={testToggle ? "2" : t20Toggle ? "8" : "5"}
              />
            )}
            {typeValue === "AllRounder" && (
              <PlayerSingleRanking
                formatValue={testToggle ? "3" : t20Toggle ? "9" : "6"}
              />
            )}
          </>
        ) : (
          <>
            {typeValue === "Batter" && (
              <PlayerSingleRanking formatValue={t20Toggle ? "13" : "10"} />
            )}
            {typeValue === "Bowler" && (
              <PlayerSingleRanking formatValue={t20Toggle ? "14" : "11"} />
            )}
            {typeValue === "AllRounder" && (
              <PlayerSingleRanking formatValue={t20Toggle ? "15" : "12"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerRankingTable;
