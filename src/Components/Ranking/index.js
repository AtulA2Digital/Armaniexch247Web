import React, { useState } from "react";
import TeamRankingTable from "./TeamRankingTable";

const TeamRanking = () => {
  const [odiToggle, setOdiToggle] = useState(true);
  const [t20Toggle, setT20Toggle] = useState(false);
  const [testToggle, setTestToggle] = useState(false);
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

  const formatTypes = [
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
  return (
    <div className="my-4">
      <div className="xl:w-[60%] lg:w-[80%] w-[100%] m-auto pb-4">
        <div className="pb-4 border-b-2 border-[#ffffff14] lg:space-x-4 space-x-2">
          {formatTypes.map((format, ind) => {
            return (
              <span
                style={{
                  backgroundColor: format.activateBtn ? "#3AB949" : "white",
                  color: format.activateBtn ? "white" : "black",
                }}
                onClick={format.clickEvent}
                key={ind}
                className="info-hover bg-[#ffffff]  px-9 py-2 rounded-[32px] font-[600] cursor-pointer  "
              >
                {format.typename}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        {
          <TeamRankingTable
            formatValue={t20Toggle ? "3" : testToggle ? "2" : "1"}
          />
        }
      </div>
    </div>
  );
};

export default TeamRanking;
