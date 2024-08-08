import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../Api/api";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Player_Profiles = () => {
  const { playerId } = useParams();
  const [playerDetails, setPlayerDetails] = useState();
  const [dropdownStatus, setDropdownStatus] = useState({});
  const contentRefs = useRef([]);

  useEffect(() => {
    GetPlayerInfo();
  }, [playerId]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight = dropdownStatus[
          PlayerCareerStatList[index].statTitle
        ]
          ? `${ref.scrollHeight}px`
          : "0px";
      }
    });
  }, [dropdownStatus]);

  const PlayerCareerStatList = [
    {
      statTitle: "Batting Performance",
      dataListName: playerDetails?.batting_career,
      headerValues: [
        "Format",
        "M",
        "In",
        "NO",
        "0's",
        "R",
        "B",
        "HS",
        "Av",
        "SR",
        "50's",
        "100's",
        "200's",
        "300's",
        "400's",
        "4's",
        "6's",
      ],
      headerKeysLength: 17,
    },
    {
      statTitle: "Bowling Performance",
      dataListName: playerDetails?.bowling_career,
      headerValues: [
        "Format",
        "M",
        "In",
        "R",
        "B",
        "Wkts",
        "BBI",
        "Ec",
        "Av",
        "SR",
        "4W",
        "5W",
        "10W",
      ],
      headerKeysLength: 12,
    },
  ];

  const GetStatsWidth = (val) => 100 / val;

  const handleDropdownToggle = (statTitle) => {
    setDropdownStatus((prevStatus) => {
      const newStatus = { ...prevStatus, [statTitle]: !prevStatus[statTitle] };
      PlayerCareerStatList.forEach((stat) => {
        if (stat.statTitle !== statTitle) newStatus[stat.statTitle] = false;
      });
      return newStatus;
    });
  };

  const GetPlayerInfo = async () => {
    const formData = new FormData();
    formData.append("player_id", playerId);
    const response = await postAPIHandler("playerInfo", formData);
    setPlayerDetails(response.data);
  };

  const TableBodyData = (batsman, columnsWidth, type) => (
    <div className="flex justify-between md:text-[16px] text-[12px] md:gap-x-4 gap-x-2">
      {Object.keys(batsman).map(
        (key, i) =>
          (type === "Batting" || type === "Bowling") &&
          i < (type === "Batting" ? 16 : 13) && (
            <span key={i} style={{ width: columnsWidth + "%" }}>
              {batsman[key]}
            </span>
          )
      )}
    </div>
  );

  const NoDataFound = () => (
    <span className="text-center text-[red] block font-[600]">
      No Data Found
    </span>
  );

  const PersonalInfoData = playerDetails
    ? [
      { key: "Born", value: playerDetails.player.born },
      { key: "Born Place", value: playerDetails.player.birth_place },
      { key: "Height", value: playerDetails.player.height },
      { key: "Teams", value: playerDetails.teams },
      { key: "Role", value: playerDetails.player.play_role },
      { key: "Batting Style", value: playerDetails.player.style_bating },
      { key: "Bowling Style", value: playerDetails.player.style_bowling },
    ]
    : [];

  return (
    <div className="xl:w-[90%] w-[96%] mx-auto px-2 md:mt-10 py-7">
      {playerDetails && (
        <>
          <div className="flex items-center gap-x-5 gap-y-4 mb-5 flex-wrap">
            <img
              src={playerDetails.player.image}
              alt=""
              className="w-[120px] rounded-full p-1 border-1 mx-md-0 mx-auto"
            />
            <div className="text-md-start text-center">
              <p className="mb-0 xl:text-[48px] md:text-[42px] text-[42px]">
                {playerDetails.player.name}
              </p>
              <p className="mb-0 text-[#4D4D4D] font-[500] text-[20px]">
                {playerDetails.teams}
              </p>
            </div>
          </div>

          <div className="flex justify-between mb-5 flex-wrap gap-y-10">
            <div className="lg:w-[38%] w-[100%]">
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div className="bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[15px] md:px-7 px-3 flex items-center text-white font-medium text-[20px]">
                  <p className="mb-0">Personal Info</p>
                </div>
                <div className="flex flex-col space-y-2 md:px-7 px-3 py-4">
                  {PersonalInfoData.map(
                    (info, i) =>
                      info.value !== "*" &&
                      info.value !== "--" &&
                      info.value.length !== 0 && (
                        <div className="flex md:gap-1 gap-3 justify-content-md-start justify-content-between" key={i}>
                          <p className="text-[#777777] lg:text-[18px] font-medium w-[30%]">
                            {info.key}
                          </p>
                          <p className="text-[#C9C7C7] lg:text-[18px] font-medium text-md-start text-end">
                            {info.value}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-[60%] w-[100%]">
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d] pb-2">
                <div className="bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[15px] md:px-7 px-3 flex items-center text-white font-medium text-[20px] mb-4">
                  <p className="mb-0">About</p>
                </div>
                <div
                  className="md:px-7 px-3 transition-max-height duration-500 ease-in-out"
                  style={{
                    maxHeight: "400px",
                    minHeight: "300px",
                    overflowY: playerDetails.player.description
                      ? "scroll"
                      : "hidden",
                  }}
                >
                  {playerDetails.player.description ? (
                    <div
                      className="text-[#fff] text-md"
                      dangerouslySetInnerHTML={{
                        __html: playerDetails.player.description,
                      }}
                    />
                  ) : (
                    <span className="text-[18px]">No Details Available</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {PlayerCareerStatList.map((val, i) => (
            <div
              className="bg-[#242424] pb-4 mb-5 rounded-lg w-[100%] table-wrapper"
              key={i}
            >
              <div
                className="bg-gradient-to-r from-[#39441d] to-[#141815] py-3 px-4 flex justify-between items-center"
                style={{ borderRadius: "10px 10px 0px 0px", cursor: "pointer" }}
                onClick={() => handleDropdownToggle(val.statTitle)}
              >
                <h3 className="text-white text-[24px] font-bold mb-0">
                  {val.statTitle}
                </h3>
                <div className="toggle-icon-wrapper">
                  {dropdownStatus[val.statTitle] ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </div>
              </div>
              <div
                ref={(el) => (contentRefs.current[i] = el)}
                className="overflow-hidden transition-max-height duration-500 ease-in-out"
                style={{ maxHeight: 0 }}
              >
                <div className="table-body-wrapper">
                  <div className="mx-[2%] my-3 table-body-inner-wrapper">
                    <div className="text-[#ffffff6e] py-md-3 py-1 my-3 px-2 rounded-lg border-2 border-[#252927] Performance-stat-wrapper">
                      <div className="flex justify-between gap-x-4">
                        {val.headerValues.map((headerKey, j) => (
                          <span
                            key={j}
                            style={{
                              width:
                                GetStatsWidth(val.headerKeysLength) +
                                (headerKey === "Match"
                                  ? 10
                                  : headerKey === "Out By" && 20) +
                                "%",
                            }}
                          >
                            {headerKey}
                          </span>
                        ))}
                      </div>
                    </div>
                    {val.dataListName && val.dataListName.length > 0
                      ? val.dataListName.map((batsman, j) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={j}
                        >
                          {TableBodyData(
                            batsman,
                            100 / val.headerKeysLength,
                            val.statTitle.split(" ")[0]
                          )}
                        </div>
                      ))
                      : NoDataFound()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Player_Profiles;
