import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "../../style.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { postAPIHandler } from "../../../../Api/api";

const BattingStat = ({ statType }) => {
  const { seriesId } = useParams();

  // Batting Stats State------------------
  const [mostRunData, setMostRunData] = useState([]);
  const [mostHighestScoreData, setMostHighestScoreData] = useState([]);
  const [mostBattingAvgData, setMostBattingAvgData] = useState([]);
  const [mostBattingSRData, setMostBattingSRData] = useState([]);
  const [mostHundredsData, setMostHundredsData] = useState([]);
  // console.log("mostHundredsData -", mostHundredsData);
  // console.log("mostHundredsData length -", mostHundredsData.length);
  const [mostFiftiesData, setMostFiftiesData] = useState([]);
  const [mostFoursData, setMostFoursData] = useState([]);
  const [mostSixesData, setMostSixesData] = useState([]);
  const [mostNinetiesData, setMostNinetiesData] = useState([]);
  // /Batting Stats State------------------

  const [loading, setLoading] = useState(true);
  const [dropdownStatus, setDropdownStatus] = useState({});
  const contentRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      GetMostRunStats(seriesId);
      GetMostHighestScoreStats(seriesId);
      GetMostBattingAvgStats(seriesId);
      GetMostBattingSRStats(seriesId);
      GetMostHundredStats(seriesId);
      GetMostFiftiesStats(seriesId);
      GetMostFoursStats(seriesId);
      GetMostSixesStats(seriesId);
      GetMostNinetiesStats(seriesId);
      setLoading(false);
    }, 1000);
  }, [seriesId, statType]);

  // For Dropdown Transition----------------
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (dropdownStatus[BattingStatsList[index].statTitle]) {
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
      BattingStatsList.forEach((val) => {
        newStatus[val.statTitle] =
          val.statTitle === statTitle ? !prevStatus[val.statTitle] : false;
      });
      return newStatus;
    });
  };

  // Batting Stats API's---------------------
  const GetMostRunStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 1);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostRunData(response.data);
  };
  const GetMostHighestScoreStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 2);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostHighestScoreData(response.data);
  };
  const GetMostBattingAvgStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 3);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostBattingAvgData(response.data);
  };
  const GetMostBattingSRStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 4);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostBattingSRData(response.data);
  };
  const GetMostHundredStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 5);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostHundredsData(response.data);
  };
  const GetMostFiftiesStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 6);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostFiftiesData(response.data);
  };
  const GetMostFoursStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 7);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostFoursData(response.data);
  };
  const GetMostSixesStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 8);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostSixesData(response.data);
  };
  const GetMostNinetiesStats = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    formData.append("type", 1);
    formData.append("sub_type", 9);
    const response = await postAPIHandler("seriesStatsBySeriesId", formData);
    setMostNinetiesData(response.data);
  };
  // /Batting Stats API's---------------------

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );
  }

  const BattingStatsList = [
    {
      statTitle: "Most Runs",
      dataListName: mostRunData,
      desktopHeaderValues: [
        "Matches",
        "Innings",
        "Runs",
        "Average",
        "Strike Rate",
        "Fours",
        "Sixes",
      ],
      mobileHeaderValues: ["M", "In", "R", "Av", "SR", "4's", "6's"],
      headerKeysLength: 7,
      mappingKey: "most_runs",
    },
    {
      statTitle: "Highest Individual Score",
      dataListName: mostHighestScoreData,
      desktopHeaderValues: ["Runs", "Balls", "Strike Rate", "Fours", "Sixes"],
      mobileHeaderValues: ["R", "B", "SR", "4's", "6's"],
      headerKeysLength: 5,
      mappingKey: "highest_scores",
    },
    {
      statTitle: "Best Batting Average",
      dataListName: mostBattingAvgData,
      desktopHeaderValues: ["Matches", "Innings", "Runs", "Average"],
      mobileHeaderValues: ["M", "In", "R", "Av"],
      headerKeysLength: 4,
      mappingKey: "batting_avg",
    },
    {
      statTitle: "Best Batting Strike Rate",
      dataListName: mostBattingSRData,
      desktopHeaderValues: [
        "Matches",
        "Innings",
        "Runs",
        "Average",
        "Strike Rate",
      ],
      mobileHeaderValues: ["M", "In", "R", "Av", "SR"],
      headerKeysLength: 6,
      mappingKey: "batting_sr",
    },
    {
      statTitle: "Most 100+ Score",
      dataListName: mostHundredsData,
      desktopHeaderValues: [
        "Matches",
        "Innings",
        "Runs",
        "Highest Score",
        "Hundreds",
      ],
      mobileHeaderValues: ["M", "In", "R", "HS", "100's"],
      headerKeysLength: 5,
      mappingKey: "most_hundreds",
    },
    {
      statTitle: "Most 50+ Score",
      dataListName: mostFiftiesData,
      desktopHeaderValues: [
        "Matches",
        "Innings",
        "Runs",
        "Highest Score",
        "Fifties",
      ],
      mobileHeaderValues: ["M", "In", "R", "HS", "50's"],
      headerKeysLength: 5,
      mappingKey: "most_fifty",
    },
    {
      statTitle: "Most 90's Score",
      dataListName: mostNinetiesData,
      desktopHeaderValues: [
        "Matches",
        "Innings",
        "Runs",
        "Highest Score",
        "Nineties",
      ],
      mobileHeaderValues: ["M", "In", "R", "HS", "90's"],
      headerKeysLength: 5,
      mappingKey: "most_nineties",
    },
    {
      statTitle: "Most Fours",
      dataListName: mostFoursData,
      desktopHeaderValues: ["Matches", "Innings", "Runs", "Fours"],
      mobileHeaderValues: ["M", "In", "R", "4's"],
      headerKeysLength: 4,
      mappingKey: "most_fours",
    },
    {
      statTitle: "Most Sixes",
      dataListName: mostSixesData,
      desktopHeaderValues: ["Matches", "Innings", "Runs", "Sixes"],
      mobileHeaderValues: ["M", "In", "R", "6's"],
      headerKeysLength: 4,
      mappingKey: "most_sixes",
    },
  ];

  const GetStatsWidth = (val) => {
    return 100 / val;
  };

  const TableBodyData = (batsman, columnsWidth) => {
    return (
      <div className="flex flex-wrap justify-between">
        <p className="mb-0 sm:w-[25%] w-[30%] pe-2 md:text-[16px] text-[13px]">
          <Link
            to={`/player-profiles/${batsman.player_id}`}
            className="text-[#fff] hover:text-[#3ab949]"
          >
            {batsman.player}
          </Link>
        </p>
        <div className="flex justify-between sm:w-[75%] w-[70%] md:text-[16px] text-[12px] md:gap-x-4 gap-x-2">
          {batsman.matches && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.matches}
            </span>
          )}
          {batsman.inning && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.inning}
            </span>
          )}
          {batsman.runs && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.runs}
            </span>
          )}
          {batsman.balls && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.balls}
            </span>
          )}
          {batsman.avg && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.avg}
            </span>
          )}
          {batsman.sr && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.sr}
            </span>
          )}
          {batsman.strike_rate && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.strike_rate}
            </span>
          )}
          {batsman.fours && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.fours}
            </span>
          )}
          {batsman.high_score && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.high_score}
            </span>
          )}
          {batsman.fifty && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.fifty}
            </span>
          )}
          {batsman.hundreds && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.hundreds}
            </span>
          )}
          {batsman.nineties && (
            <span
              style={{
                width: columnsWidth + "%",
              }}
            >
              {batsman.nineties}
            </span>
          )}

          <span
            style={{
              width: columnsWidth + "%",
            }}
            className={batsman.sixes ? "inline-block" : "hidden"}
          >
            {batsman.sixes && batsman.sixes}
          </span>
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
      {BattingStatsList.map((val, ind) => (
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
              <div className="flex flex-wrap text-[#ffffff6e] justify-between py-md-3 py-1 my-3 px-2 rounded-lg border-2 border-[#252927]">
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
              {val.statTitle === "Most Runs" && (
                <>
                  {mostRunData.most_runs && mostRunData.length === undefined
                    ? mostRunData.most_runs.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Highest Individual Score" && (
                <>
                  {mostHighestScoreData.highest_scores &&
                  mostHighestScoreData.length === undefined
                    ? mostHighestScoreData.highest_scores.map(
                        (batsman, ind) => (
                          <div
                            className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                            key={ind}
                          >
                            {TableBodyData(batsman, 100 / val.headerKeysLength)}
                          </div>
                        )
                      )
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Best Batting Average" && (
                <>
                  {mostBattingAvgData.batting_avg &&
                  mostBattingAvgData.length === undefined
                    ? mostBattingAvgData.batting_avg.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Best Batting Strike Rate" && (
                <>
                  {mostBattingSRData.batting_sr &&
                  mostBattingSRData.length === undefined
                    ? mostBattingSRData.batting_sr.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most 100+ Score" && (
                <>
                  {mostHundredsData.most_hundreds &&
                  mostHundredsData.length === undefined
                    ? mostHundredsData.most_hundreds.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most 50+ Score" && (
                <>
                  {mostFiftiesData.most_fifty &&
                  mostFiftiesData.length === undefined
                    ? mostFiftiesData.most_fifty.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most 90's Score" && (
                <>
                  {mostNinetiesData.most_nineties &&
                  mostNinetiesData.length === undefined
                    ? mostNinetiesData.most_nineties.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most Fours" && (
                <>
                  {mostFoursData.most_fours &&
                  mostFoursData.length === undefined
                    ? mostFoursData.most_fours.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
                        </div>
                      ))
                    : NoDataFound()}
                </>
              )}
              {val.statTitle === "Most Sixes" && (
                <>
                  {mostSixesData.most_sixes &&
                  mostSixesData.length === undefined
                    ? mostSixesData.most_sixes.map((batsman, ind) => (
                        <div
                          className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                          key={ind}
                        >
                          {TableBodyData(batsman, 100 / val.headerKeysLength)}
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

export default BattingStat;
