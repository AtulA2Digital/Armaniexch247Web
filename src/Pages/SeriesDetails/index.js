import React, { useEffect, useState } from "react";
import SeriesIcon from "../../Images/Cricket-Pages/Heading Icons/series-min.webp";
import { getAPIHandler, postAPIHandler } from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import Stats from "../../Components/SeriesDetails/Stats";
import Squads from "../../Components/SeriesDetails/Squads";
import Venues from "../../Components/SeriesDetails/Venues";
import SeriesInfo from "../../Components/SeriesDetails/SeriesInfo";
import { Helmet } from "react-helmet";

const SeriesDetails = () => {
  const { seriesId } = useParams();
  var FormData = require("form-data");
  const [seriesRecentData, setSeriesRecentData] = useState([]);
  // console.log("seriesRecentData - ", seriesRecentData);
  const [seriesUpcommingData, setSeriesUpcommingData] = useState([]);
  const [seriesLiveMatches, setSeriesLiveMatches] = useState([]);
  // console.log("seriesLiveMatches - ", seriesLiveMatches);
  const [seriesDataTab, setSeriesDataTab] = useState("Matches");
  const [statType, setStatType] = useState("Batting");

  const getSeriesRecentDetails = async (value) => {
    const formData = new FormData();
    formData.append("series_id", value);

    const response = await postAPIHandler("recentMatchesBySeriesId", formData);
    // console.log("recentMatchesBySeriesId response-->", response);
    setSeriesRecentData(response.data);
  };

  const getSeriesUpcommingDetails = async (value) => {
    const formData = new FormData();
    formData.append("series_id", value);

    const response = await postAPIHandler(
      "upcomingMatchesBySeriesId",
      formData
    );
    // console.log("upcomingMatchesBySeriesId response-->", response);
    setSeriesUpcommingData(response.data);
  };

  const getSeriesLiveMatches = async () => {
    const response = await getAPIHandler("liveMatchList");
    setSeriesLiveMatches(response.data);
  };

  useEffect(() => {
    getSeriesRecentDetails(seriesId);
    getSeriesLiveMatches();
    getSeriesUpcommingDetails(seriesId);
  }, [seriesId]);

  const filteredLiveMatch = seriesLiveMatches.filter(
    (match) => match.series_id == seriesId
  );
  // console.log("filteredLiveMatch - ", filteredLiveMatch);

  return (
    <>
      <Helmet>
        <title>Series Details & Updates | Comprehensive Coverage at Armaniexch247news</title>
        <meta name="description" content="Visit Armaniexch247news to explore the most recent series details. Get full coverage, match analysis, and key highlights of every series, all in one place." />
      </Helmet>
      <div className="xl:w-[90%] w-[96%] mx-auto px-2 md:mt-10 py-7">
        <div className="rounded-lg py-3 mb-5 sm:w-[90%] mx-auto" style={{ background: "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)" }}>
          <p className="text-black md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
            <img
              src={SeriesIcon}
              alt="squads"
              className="w-[60px] border-2 rounded-full border-[#fff] p-2 bg-[#000]"
            />
            {seriesRecentData.length !== 0
              ? seriesRecentData[0].series
              : seriesUpcommingData.length !== 0 && seriesUpcommingData[0].series}
          </p>
        </div>
        {/* Match Status Wise List Tab--------------- */}
        <div className="lg:space-x-4 space-x-2 pb-3 border-b-2 mb-4 border-[#ffffff14] match-type-tabs">
          <button
            onClick={() => {
              setSeriesDataTab("Matches");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${seriesDataTab === "Matches" ? "active" : ""
              }`}
          >
            Matches
          </button>
          <button
            onClick={() => {
              setSeriesDataTab("Series Info");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${seriesDataTab === "Series Info" ? "active" : ""
              }`}
          >
            Series Info
          </button>
          <button
            onClick={() => {
              setSeriesDataTab("Stats");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${seriesDataTab === "Stats" ? "active" : ""
              }`}
          >
            Stats
          </button>
          <button
            onClick={() => {
              setSeriesDataTab("Squads");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer 
            ${seriesDataTab === "Squads" ? "active" : ""}
          `}
          >
            Squads
          </button>
          <button
            onClick={() => {
              setSeriesDataTab("Venues");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer 
            ${seriesDataTab === "Venues" ? "active" : ""}
          `}
          >
            Venues
          </button>
        </div>

        {/* Matches---------------- */}
        {seriesDataTab === "Matches" && (
          <div className="series-details-wrapper">

            {/* Header */}
            <div className="flex mb-2 justify-start items-center w-100 py-3 rounded-lg bg-gradient-to-r from-[#39441d] to-[#141815] px-3 text-left text-xl font-bold">
              <span className="w-[20%] text-white">Date</span>{" "}
              <span className="text-white w-[60%] md:ps-0 ps-2">
                Match Details
              </span>
              <span className="text-white ">Time</span>
            </div>

            {/* Body */}
            {(seriesRecentData !== undefined && seriesRecentData !== null) && (seriesUpcommingData !== undefined && seriesUpcommingData !== null) ? <>

              {/* Series Recent Matches Data--- */}
              {seriesRecentData !== undefined && seriesRecentData !== null && (
                seriesRecentData
                  .slice()
                  .reverse()
                  .map((val, ind) => {
                    return (
                      <Link
                        to={`/match-details/${seriesId}/${val.match_id}/${val.team_a_id}/${val.team_b_id}`}
                        key={ind}
                      >
                        <div className="flex mb-2 justify-start items-start w-100 py-3 rounded-lg bg-[#232525] hover:bg-[#393c3c] px-3 text-left text-xl">
                          <p className="w-[20%] text-white md:text-[16px] text-[11px] mb-0 leading-[20px]">
                            {val.date_wise}
                          </p>{" "}
                          <div className="w-[60%] mb-0 md:pe-4 md:ps-0 ps-2 flex flex-md-row flex-column md:gap-4 gap-2">
                            <div className="text-[16px] text-white flex items-center gap-4  md:w-[50%]">
                              <div className="text-center md:w-[40%]">
                                <img
                                  src={val.team_a_img}
                                  alt="team"
                                  className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                                />
                                <span className="lg:block hidden">
                                  {val.team_a}
                                </span>
                                <span className="lg:hidden block">
                                  {val.team_a_short}
                                </span>
                              </div>
                              <span className="text-[26px] text-[red]">vs</span>
                              <div className="text-center md:w-[40%]">
                                <img
                                  src={val.team_b_img}
                                  alt="team"
                                  className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                                />
                                <span className="lg:block hidden">
                                  {val.team_b}
                                </span>
                                <span className="lg:hidden block">
                                  {val.team_b_short}
                                </span>
                              </div>
                            </div>
                            <div className="md:w-[45%] mb-0">
                              <div className="text-[17px] text-white flex items-center gap-4 mb-2">
                                {val.matchs}
                              </div>
                              <p className="text-[14px] text-[#ffffffaf] mb-2 leading-[20px]">
                                {val.venue}
                              </p>
                              <p className="text-[16px] text-[red] leading-[20px] mb-0">
                                {val.result}
                              </p>
                            </div>
                          </div>
                          <p className="text-white md:text-[16px] text-[11px] mb-0">
                            {val.match_time}
                          </p>
                        </div>
                      </Link>
                    );
                  })
              )}

              {/* Live Matches Data--- */}
              {filteredLiveMatch !== undefined && filteredLiveMatch !== null && (
                filteredLiveMatch
                  .slice()
                  .reverse()
                  .map((val, ind) => {
                    return (
                      <Link
                        to={`/match-details/${seriesId}/${val.match_id}/${val.team_a_id}/${val.team_b_id}`}
                        key={ind}
                      >
                        <div className="flex mb-2 justify-start items-start w-100 py-3 rounded-lg bg-[#232525] hover:bg-[#393c3c] px-3 text-left text-xl">
                          <p className="w-[20%] text-white md:text-[16px] text-[11px] mb-0 leading-[20px]">
                            {val.match_date},{" "}
                            {val.match_time}
                          </p>{" "}
                          <div className="w-[60%] mb-0 md:pe-4 md:ps-0 ps-2 flex flex-md-row flex-column md:gap-4 gap-2">
                            <div className="text-[16px] text-white flex items-center gap-4  md:w-[50%]">
                              <div className="text-center md:w-[40%]">
                                <img
                                  src={val.team_a_img}
                                  alt="team"
                                  className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                                />
                                <span className="lg:block hidden">
                                  {val.team_a}
                                </span>
                                <span className="lg:hidden block">
                                  {val.team_a_short}
                                </span>
                              </div>
                              <span className="text-[26px] text-[#3ab949]">vs</span>
                              <div className="text-center md:w-[40%]">
                                <img
                                  src={val.team_b_img}
                                  alt="team"
                                  className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                                />
                                <span className="lg:block hidden">
                                  {val.team_b}
                                </span>
                                <span className="lg:hidden block">
                                  {val.team_b_short}
                                </span>
                              </div>
                            </div>
                            <div className="md:w-[45%] mb-0">
                              <div className="text-[17px] text-white flex items-center gap-4 mb-2">
                                {val.matchs}
                              </div>
                              <p className="text-[14px] text-[#ffffffaf] mb-2 leading-[20px]">
                                {val.venue}
                              </p>
                              <p className="text-[16px] text-[#3ab949] leading-[20px] mb-0">
                                {val.toss}
                              </p>
                            </div>
                          </div>
                          <p className="text-white md:text-[16px] text-[11px] mb-0">
                            {val.match_time}
                            <br />
                            <br />
                            <span className="bg-[#3ab949] blink-button pt-1 pb-2 px-2 rounded-sm">Live</span>
                          </p>
                        </div>
                      </Link>
                    );
                  })
              )}

              {/* Series Upcomming Matches Data--- */}
              {seriesUpcommingData !== undefined && seriesUpcommingData !== null && (
                seriesUpcommingData.map((val, ind) => {
                  return (
                    <Link
                      to={`/match-details/${seriesId}/${val.match_id}/${val.team_a_id}/${val.team_b_id}`}
                      key={ind}
                    >
                      <div className="flex mb-2 justify-start items-start w-100 py-3 rounded-lg bg-[#232525] hover:bg-[#393c3c] px-3 text-left text-xl">
                        <p className="w-[20%] text-white md:text-[16px] text-[11px] mb-0 leading-[20px]">
                          {val.date_wise}
                        </p>{" "}
                        <div className="w-[60%] mb-0 md:pe-4 md:ps-0 ps-2 flex flex-md-row flex-column md:gap-4 gap-2">
                          <div className="text-[16px] text-white flex items-center gap-4  md:w-[50%]">
                            <div className="text-center md:w-[40%]">
                              <img
                                src={val.team_a_img}
                                alt="team"
                                className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                              />
                              <span className="lg:block hidden">{val.team_a}</span>
                              <span className="lg:hidden block">
                                {val.team_a_short}
                              </span>
                            </div>
                            <span className="text-[26px] text-[#3ab949]">vs</span>
                            <div className="text-center md:w-[40%]">
                              <img
                                src={val.team_b_img}
                                alt="team"
                                className="rounded-full md:w-[50px] w-[40px] md:h-[50px] h-[40px] object-cover mx-auto md:mb-2 mb-1"
                              />
                              <span className="lg:block hidden">{val.team_b}</span>
                              <span className="lg:hidden block">
                                {val.team_b_short}
                              </span>
                            </div>
                          </div>
                          <div className="md:w-[45%] mb-0">
                            <div className="text-[17px] text-white flex items-center gap-4 mb-2">
                              {val.matchs}
                            </div>
                            <p className="text-[14px] text-[#ffffffaf] mb-2 leading-[20px]">
                              {val.venue}
                            </p>
                            <p className="text-[16px] text-[red] leading-[20px] mb-0">
                              {val.result}
                            </p>
                            <p className="text-[16px] text-[#3ab949]">
                              Match starts at {val.match_date}, {val.match_time}
                            </p>
                          </div>
                        </div>
                        <p className="text-white md:text-[16px] text-[11px] mb-0">
                          {val.match_time}
                        </p>
                      </div>
                    </Link>
                  );
                })
              )}
            </> : <p className="mb-0 py-3 rounded-lg bg-[#232525]px-3 text-left text-xl font-bold">
              No Data Found
            </p>}


          </div>
        )}

        {/* Series Info */}
        {seriesDataTab === "Series Info" && <SeriesInfo />}

        {/* Stats------------------------ */}
        {seriesDataTab === "Stats" && (
          <>
            <div className="lg:space-x-4 space-x-2 pb-3 border-b-2 mb-4 border-[#ffffff14] match-status-tabs">
              <button
                onClick={() => {
                  setStatType("Batting");
                }}
                className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${statType === "Batting" ? "active" : ""
                  }`}
              >
                Batting
              </button>
              <button
                onClick={() => {
                  setStatType("Bowling");
                }}
                className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${statType === "Bowling" ? "active" : ""
                  }`}
              >
                Bowling
              </button>
            </div>
            <Stats statType={statType} />
          </>
        )}

        {/* Squads---------------------- */}
        {seriesDataTab === "Squads" && <Squads />}

        {/* Venues---------------------- */}
        {seriesDataTab === "Venues" && <Venues />}
      </div>
    </>
  );
};

export default SeriesDetails;
