import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "../../style.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { postAPIHandler } from "../../../../Api/api";

const BowlingStat = ({ statType }) => {
  const { seriesId } = useParams();

  // Batting Stats State------------------
  const [mostWicketData, setMostWicketData] = useState([]);
  const [most5WicketsHaulData, setMost5WicketsHaulData] = useState([]);
  const [bestBowlingData, setbestBowlingData] = useState([]);
  // console.log("bestBowlingData - ", bestBowlingData);
  const [bestEconomyData, setbestEconomyData] = useState([]);
  // /Batting Stats State------------------

  const [loading, setLoading] = useState(true);
  const [dropdownStatus, setDropdownStatus] = useState({});
  const contentRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      GetMostWicketStats(seriesId);
      GetMostFifersStats(seriesId);
      GetBestBowlingStats(seriesId);
      GetBestEconomyStats(seriesId);
      setLoading(false);
    }, 1000);
  }, [seriesId, statType]);

  // For Dropdown Transition----------------
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (dropdownStatus[BowlingStatsList[index].statTitle]) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [dropdownStatus]);

  const handleDropdownToggle = (statTitle, index) => {
    setDropdownStatus((prevStatus) => {
      const newStatus = {};
      BowlingStatsList.forEach((val) => {
        newStatus[val.statTitle] =
          val.statTitle === statTitle ? !prevStatus[val.statTitle] : false;
      });
      return newStatus;
    });
  };

  // Batting Stats API's---------------------
  const GetMostWicketStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 2);
    formData.append("sub_type", 1);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostWicketData(response.data);
  };
  const GetMostFifersStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 2);
    formData.append("sub_type", 2);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMost5WicketsHaulData(response.data);
  };
  const GetBestBowlingStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 2);
    formData.append("sub_type", 3);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setbestBowlingData(response.data);
  };
  const GetBestEconomyStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 2);
    formData.append("sub_type", 4);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setbestEconomyData(response.data);
  };
  // /Batting Stats API's---------------------

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );
  }

  const BowlingStatsList = [
    {
      statTitle: "Most Wickets",
      dataListName: mostWicketData,
      desktopHeaderValues: [
        "Matches",
        "Overs",
        "Balls",
        "Runs",
        "Wickets",
        "Economy",
      ],
      mobileHeaderValues: ["M", "O", "B", "R", "W", "E"],
      headerKeysLength: 6,
      mappingKey: "most_wickets",
    },
    {
      statTitle: "Most 5 Wickets Haul",
      dataListName: most5WicketsHaulData,
      desktopHeaderValues: ["Matches", "Overs", "Balls", "Runs", "Wickets"],
      mobileHeaderValues: ["M", "O", "B", "R", "W"],
      headerKeysLength: 5,
      mappingKey: "most_five_wickets",
    },
    {
      statTitle: "Best Bowling",
      dataListName: bestBowlingData,
      desktopHeaderValues: [
        "Overs",
        "Balls",
        "Runs",
        "Wickets",
        "BBI",
        "Economy",
      ],
      mobileHeaderValues: ["O", "B", "R", "W", "BBI", "E"],
      headerKeysLength: 6,
      mappingKey: "most_bowling",
    },
    {
      statTitle: "Best Economy",
      dataListName: bestEconomyData,
      desktopHeaderValues: [
        "Matches",
        "Overs",
        "Balls",
        "Runs",
        "Wickets",
        "Economy",
      ],
      mobileHeaderValues: ["M", "O", "B", "R", "W", "E"],
      headerKeysLength: 6,
      mappingKey: "best_economy",
    },
  ];

  const GetStatsWidth = (val) => {
    return 100 / val;
  };

  const TableBodyData = (bowler, columnsWidth) => {
    return (
      <div className="flex flex-wrap justify-between">
        <p className="mb-0 sm:w-[25%] w-[30%] pe-2 md:text-[16px] text-[13px]">
          <Link
            to={`/player-profiles/${bowler.player_id}`}
            className="text-[#fff] hover:text-[#3ab949]"
          >
            {bowler.player}
          </Link>
        </p>
        <div className="flex justify-between sm:w-[75%] w-[70%] md:text-[16px] text-[12px] md:gap-x-4 gap-x-2">
          {bowler.matches && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.matches}
            </span>
          )}
          {bowler.overs && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.overs}
            </span>
          )}
          {bowler.balls && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.balls}
            </span>
          )}
          {bowler.runs && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.runs}
            </span>
          )}
          {bowler.wkts && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.wkts}
            </span>
          )}
          {bowler.bbi && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.bbi}
            </span>
          )}
          {bowler.economy && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.economy}
            </span>
          )}
          {bowler.eco && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {bowler.eco}
            </span>
          )}
        </div>
      </div>
    );
  };
  const NoDataFound = () => {
    return (
      <span className="text-center text-[red] block font-[600]">
        No Data Found
      </span>
    );
  };
  return (
    <>
      {BowlingStatsList.map((val, ind) => (
        <div
          className="bg-[#242424] pb-4 md:mb-5 mb-4 rounded-lg w-[100%] group"
          key={ind}
        >
          <div
            className="bg-gradient-to-r from-[#39441d] to-[#141815] py-3 px-4 flex justify-between items-center"
            style={{ borderRadius: "10px 10px 0 0", cursor: "pointer" }}
            onClick={() => handleDropdownToggle(val.statTitle, ind)}
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
            ref={(el) => (contentRefs.current[ind] = el)}
            className={`batting-stat overflow-hidden transition-max-height duration-500 ease-in-out`}
            style={{ maxHeight: "0px" }}
          >
            <div className="mx-[2%] my-3">
              <div className="flex flex-wrap text-[#ffffff6e] justify-between py-3 my-3 px-2 rounded-lg border-2 border-[#252927]">
                <p className="mb-0 sm:w-[25%] w-[30%]">Name</p>
                <div className="justify-between sm:w-[75%] w-[70%] xl:flex hidden gap-x-4">
                  {val.desktopHeaderValues.map((headerKey, ind) => (
                    <span
                      key={ind}
                      style={{
                        width: GetStatsWidth(val.headerKeysLength) + "%",
                      }}
                    >
                      {headerKey}
                    </span>
                  ))}
                </div>
                <div className="justify-between sm:w-[75%] w-[70%] xl:hidden flex text-[13px] gap-x-4">
                  {val.mobileHeaderValues.map((headerKey, ind) => (
                    <span
                      key={ind}
                      style={{
                        width: GetStatsWidth(val.headerKeysLength) + "%",
                      }}
                    >
                      {headerKey}
                    </span>
                  ))}
                </div>
              </div>
              {val.statTitle === "Most Wickets" && (
                <>
                  {mostWicketData.most_wickets &&
                  mostWicketData.length === undefined
                    ? mostWicketData.most_wickets.map((bowler, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(bowler, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most 5 Wickets Haul" && (
                <>
                  {most5WicketsHaulData.most_five_wickets &&
                  most5WicketsHaulData.length === undefined
                    ? most5WicketsHaulData.most_five_wickets.map(
                        (bowler, ind) => (
                          <div
                            className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                            key={ind}
                          >
                            {TableBodyData(bowler, 100 / val.headerKeysLength)}
                          </div>
                        )
                      )
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Best Bowling" && (
                <>
                  {bestBowlingData.most_bowling &&
                  bestBowlingData.length === undefined
                    ? bestBowlingData.most_bowling.map((bowler, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(bowler, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Best Economy" && (
                <>
                  {bestEconomyData.best_economy &&
                  bestEconomyData.length === undefined
                    ? bestEconomyData.best_economy.map((bowler, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(bowler, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BowlingStat;
