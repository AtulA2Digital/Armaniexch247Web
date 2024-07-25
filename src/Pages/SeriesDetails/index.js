import React, { useEffect, useState } from "react";
import Squads_Icon from "../../Images/Cricket-Pages/team-white.png";
import { postAPIHandler } from "../../Api/api";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Stats from "../../Components/SeriesDetails/Stats";
import Squads from "../../Components/SeriesDetails/Squads";

const SeriesDetails = () => {
  const { seriesId } = useParams();
  var FormData = require("form-data");
  const [seriesRecentData, setSeriesRecentData] = useState([]);
  const [seriesUpcommingData, setSeriesUpcommingData] = useState([]);
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

  useEffect(() => {
    getSeriesRecentDetails(seriesId);
    getSeriesUpcommingDetails(seriesId);
  }, [seriesId]);
  return (
    <div className="xl:w-[90%] w-[100%] mx-auto px-2 md:mt-10 py-7">
      <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-5 sm:w-[90%] mx-auto">
        <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
          <img
            src={Squads_Icon}
            alt="squads"
            className="w-[50px] border-2 rounded-full border-[#fff] p-2"
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

          {/* Series Recent Matches Data--- */}
          {seriesRecentData !== undefined && seriesRecentData !== null ? (
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
                      <p className="w-[20%] text-white md:text-[16px] text-[14px] mb-0 leading-[20px]">
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
                            <span className="md:block hidden">
                              {val.team_a}
                            </span>
                            <span className="md:hidden block">
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
                            <span className="md:block hidden">
                              {val.team_b}
                            </span>
                            <span className="md:hidden block">
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
                      <p className="text-white md:text-[16px] text-[14px] mb-0">
                        {val.match_time}
                      </p>
                    </div>
                  </Link>
                );
              })
          ) : (
            <p className="mb-0 py-3 rounded-lg bg-[#232525]px-3 text-left text-xl font-bold">
              No Data Found
            </p>
          )}

          {/* Series Upcomming Matches Data--- */}
          {seriesUpcommingData !== undefined && seriesUpcommingData !== null ? (
            seriesUpcommingData.map((val, ind) => {
              return (
                <Link
                  to={`/match-details/${seriesId}/${val.match_id}/${val.team_a_id}/${val.team_b_id}`}
                  key={ind}
                >
                  <div className="flex mb-2 justify-start items-start w-100 py-3 rounded-lg bg-[#232525] hover:bg-[#393c3c] px-3 text-left text-xl">
                    <p className="w-[20%] text-white md:text-[16px] text-[14px] mb-0 leading-[20px]">
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
                          <span className="md:block hidden">{val.team_a}</span>
                          <span className="md:hidden block">
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
                          <span className="md:block hidden">{val.team_b}</span>
                          <span className="md:hidden block">
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
                    <p className="text-white md:text-[16px] text-[14px] mb-0">
                      {val.match_time}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="mb-0 py-3 rounded-lg bg-[#232525]px-3 text-left text-xl font-bold">
              No Data Found
            </p>
          )}
        </div>
      )}

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
    </div>
  );
};

export default SeriesDetails;
