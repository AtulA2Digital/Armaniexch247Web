import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { postAPIHandler } from "../../Api/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MatchInfo = ({ status }) => {
  // Match Info Api Variable
  const { matchId, team_a_id, team_b_id, seriesId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo);
  const [playing11, setPlaying11] = useState(null);
  // console.log("playing11 length - ", playing11 && playing11.length);
  const [MOTS, setMOTS] = useState();
  // console.log("MOTS - ", MOTS);
  const [loading, setLoading] = useState(false);

  // console.log("status - ", status);
  // Match Info API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetMatchDetails(matchId);
      GetPlaying11(matchId);
      GetMOTS();
    }, 1000);
  }, [matchId]);

  const totalMatches = matchInfo && matchInfo.data.head_to_head.matches.length;
  // console.log("totalMatches - ", totalMatches);
  const winCountA = matchInfo && matchInfo.data.head_to_head.team_a_win_count;
  const winCountB = matchInfo && matchInfo.data.head_to_head.team_b_win_count;

  function formatProgress(value) {
    // Check if the number has a fractional part
    if (value % 1 !== 0) {
      return parseFloat(value.toFixed(2)); // Show 2 decimal places, then convert back to number
    } else {
      return value; // Show as a whole number
    }
  }

  let progress1 = (winCountA * 100) / totalMatches;
  progress1 = formatProgress(progress1);
  let progress2 = (winCountB * 100) / totalMatches;
  progress2 = formatProgress(progress2);
  // console.log("progress - ", progress1 + ", " + progress2);

  const GetMatchDetails = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
    setLoading(false);
  };

  const GetPlaying11 = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("playingXiByMatchId", formData);
    // console.log("GetPlaying11 response-->", response);
    setPlaying11(response.data);
    setLoading(false);
  };

  const GetMOTS = async () => {
    const formData = new FormData();
    formData.append("series_id", seriesId);

    const response = await postAPIHandler("manOfTheSeries", formData);
    // console.log("GetMOTS response-->", response.data, response.data.length);

    setMOTS(response.data);
  };

  const Playing11Data = (team) => {
    // console.log("Playing11Data called");
    return (
      <div className="playing-11-wrapper mt-2 xl:w-[48%] w-[100%]">
        <div className="flex items-center justify-center gap-3 team-details bg-gradient-to-r from-[#39441d] to-[#141815] md:px-5 px-3 py-3 rounded-[12px]">
          <img
            src={team.flag}
            alt="team img"
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <h4 className="team-name">{team.name}</h4>
        </div>
        <div className="players-data mt-4 flex justify-between flex-wrap gap-y-5">
          {team.player.map((data, ind) => {
            return (
              <div
                className="player-details text-center xl:w-[33%] md:w-[24%] w-[49%]"
                key={ind}
              >
                <Link to={`/player-profiles/${data.player_id}`} className="text-[#fff] hover:text-[#3ab949]">
                  <img
                    src={data.image}
                    alt="team img"
                    className="rounded-full w-[80px] h-[80px] object-cover mx-auto object-top"
                  />
                  <h5 className="team-name mt-2 mb-0">
                    {data.name}
                  </h5>
                  <p className="text-[14px] text-[#777777]">{data.play_role}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Progress Bar According Devices-------------------
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };

  const size = useWindowSize();
  // console.log("display size - ", size);
  const isMobile = size.width < 768;
  const progress1Width = isMobile
    ? `${progress1 === 0 || progress2 === 0
      ? progress1 + "%"
      : progress1 > progress2
        ? "60%"
        : "40%"
    }`
    : `${progress1}%`;
  const progress2Width = isMobile
    ? `${progress1 === 0 || progress2 === 0
      ? progress2 + "%"
      : progress2 > progress1
        ? "60%"
        : "40%"
    }`
    : `${progress2}%`;
  return (
    <>
      {matchInfo ? (
        <div className="md:my-6 py-8">
          {/* Match Details */}
          <div className="flex flex-wrap xl:justify-between items-center mb-10 py-4 mx-4 md:px-7 px-3 gap-10 shadow-2xl border-2 rounded-[18px] border-[#39441d]">
            <div className="space-y-4 ">
              <p className="text-white text-[20px] font-semibold pb-2 ">
                Match Details
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex md:gap-1 gap-3">
                  <p className="text-[#777777] lg:text-[18px] font-medium">
                    Series
                  </p>
                  <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                    <Link
                      className="text-[#C9C7C7] hover:text-[#3ab949]"
                      to={`/series-details/${seriesId}`}
                    >
                      {matchInfo.data.series}
                    </Link>
                  </p>
                </div>
                <div className=" flex md:gap-1 gap-3">
                  <p className="text-[#777777] lg:text-[18px] font-medium ">
                    Match
                  </p>
                  <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                    {matchInfo.data.team_a} vs {matchInfo.data.team_b}
                  </p>
                </div>
                <div className="flex md:gap-1 gap-3">
                  <p className="text-[#777777] lg:text-[18px] font-medium ">
                    Match No.
                  </p>
                  <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                    {matchInfo.data.matchs}
                  </p>
                </div>
                <div className="flex md:gap-1 gap-3">
                  <p className="text-[#777777] lg:text-[18px] font-medium ">
                    Match Type
                  </p>
                  <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                    {matchInfo.data.match_type}
                    {matchInfo.data.is_hundred === 2 && <span className="text-[16px]"> (100 Balls)</span>}
                  </p>
                </div>
                {/* Toss---- */}
                {matchInfo.data.toss.length > 0 && (
                  <div className="flex md:gap-1 gap-3">
                    <p className="text-[#777777] lg:text-[18px] font-medium ">
                      Toss
                    </p>
                    <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                      {matchInfo.data.toss}
                    </p>
                  </div>
                )}
                {/* Player Of The Match---- */}
                {matchInfo.data.man_of_match_player.length > 0 && (
                  <div className="flex md:gap-1 gap-3">
                    <p className="text-[#777777] lg:text-[18px] font-medium ">
                      Player Of The Match
                    </p>
                    <p className="text-[#C9C7C7] lg:text-[18px] font-medium ">
                      <Link
                        className="text-[#C9C7C7] hover:text-[#3ab949]"
                        to={`/player-profiles/${matchInfo.data.man_of_match}`}
                      >
                        {matchInfo.data.man_of_match_player}
                      </Link>
                    </p>
                  </div>
                )}
                {/* Player Of The Series---- */}
                {MOTS !== undefined && MOTS.length !== 0 && (
                  <div className="flex md:gap-1 gap-3">
                    <p className="text-[#777777] lg:text-[18px] font-medium ">
                      Player Of The Series
                    </p>
                    <p className="text-[#C9C7C7] lg:text-[18px] font-medium">
                      <Link
                        className="text-[#C9C7C7] hover:text-[#3ab949]"
                        to={`/player-profiles/${MOTS.player.player_id}`}
                      >
                        {MOTS.player.name}
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 ">
              <div className="flex md:flex-col items-center md:justify-start justify-center gap-1 bg-[#181919] lg:px-16 w-full lg:w-[200px] py-2 text-center text-[14px] font-medium text-[#C9C7C7] rounded-[12px]">
                {/* <DataRange /> */}
                <CalendarMonthIcon
                  style={{ fontSize: "30px", color: "#fff" }}
                />
                <span className="">{matchInfo.data.match_date}</span>
                <span className="">{matchInfo.data.match_time}</span>
              </div>
              <Link
                className="text-[#fff] hover:text-[#3ab949] flex flex-col items-center justify-center gap-1 bg-[#181919] lg:px-16 w-full lg:w-[400px] py-2 text-center text-[14px] font-medium rounded-[12px]"
                to={`/venue-details/${matchInfo.data.venue_id}`}
              >
                {/* <Location style={{ fontSize: "30px" }} /> */}
                <LocationOnIcon style={{ fontSize: "32px" }} />
                <span className="">{matchInfo.data.venue}</span>
                {/* <span className="">{matchInfo.data.place}</span> */}
              </Link>
            </div>
          </div>

          {/* Playing 11 */}
          {status !== "UPCOMING" &&
            playing11 !== null &&
            playing11.length === undefined && (
              <div className="mb-10 py-4 mx-4 md:px-7 px-3 gap-10 shadow-2xl border-2 rounded-[18px] border-[#39441d]">
                <div className="space-y-4 ">
                  <p className="text-white text-[20px] font-semibold pb-2 ">
                    Match Playing XI
                  </p>
                  <div className="team-wrapper d-flex justify-between flex-wrap">
                    {Playing11Data(playing11 && playing11.team_a)}
                    {Playing11Data(playing11 && playing11.team_b)}
                  </div>
                </div>
              </div>
            )}

          {/* Team Comparison */}
          <div className="bg-[#000000] mx-4 border-2 rounded-[18px] border-[#39441d] mt-10 py-4 px-3">
            <div>
              <p className="text-white text-[20px] font-semibold pb-2">
                Team Comparison{" "}
                <span className="text-sm text-[#677375]">
                  (Last 10 Matches)
                </span>
              </p>
            </div>

            <div className="flex justify-between  items-center bg-gradient-to-r from-[#39441d] to-[#141815] md:px-5 px-3 py-3 rounded-[12px] my-4">
              <div className="flex md:items-center items-start md:flex-row flex-col gap-3 w-[50%]">
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  src={matchInfo.data.team_a_img}
                />
                <div className="">
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-2 lg:block hidden">
                    {matchInfo.data.team_a}
                  </p>
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-2 lg:hidden block">
                    {matchInfo.data.team_a_short}
                  </p>
                  <p className="-mt-1 flex items-center gap-1 text-[#9D9D9D] text-sm font-medium mb-0">
                    vs all teams
                  </p>
                </div>
              </div>
              <div className="flex md:items-center items-end md:flex-row flex-col justify-end gap-3 w-[50%]">
                <img
                  className="w-[50px] h-[50px] rounded-full md:hidden block"
                  src={matchInfo.data.team_b_img}
                />
                <div className="flex flex-col ">
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-2 lg:block hidden">
                    {matchInfo.data.team_b}
                  </p>
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-2 lg:hidden block text-right">
                    {matchInfo.data.team_b_short}
                  </p>
                  <p className="-mt-1 flex items-center gap-1 text-[#9D9D9D] text-sm font-medium mb-0">
                    vs all teams
                  </p>
                </div>
                <img
                  className="w-[50px] h-[50px] rounded-full md:block hidden"
                  src={matchInfo.data.team_b_img}
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-[#232525] via-[#23252500] to-[#232525] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_a_win}
              </div>
              <div>
                <p className="text-[#C9C7C7] text-[16px] font-medium">Win</p>
              </div>
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_b_win}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#232525] via-[#23252500] to-[#232525] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_a_avg_score}
              </div>
              <div>
                <p className="text-[#C9C7C7] text-[16px] font-medium">
                  Avg Score
                </p>
              </div>
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {" "}
                {matchInfo.data.team_comparison.team_b_avg_score}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#232525] via-[#23252500] to-[#232525] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_a_high_score}
              </div>
              <div>
                <p className="text-[#C9C7C7] text-[16px] font-medium">
                  Highest Score
                </p>
              </div>
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_b_high_score}
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-[#232525] via-[#23252500] to-[#232525] px-[6%] py-3 rounded-[6px] my-4">
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_a_low_score}
              </div>
              <div>
                <p className="text-[#C9C7C7] text-[16px] font-medium">
                  Lowest Score
                </p>
              </div>
              <div className="text-[#C9C7C7] text-[16px] font-medium">
                {matchInfo.data.team_comparison.team_b_low_score}
              </div>
            </div>
          </div>

          {/* Head To Head */}
          <div className="border-2 border-[#39441d] mx-4 rounded-[18px] my-10 py-4 px-3 ">
            <div className="flex md:flex-row flex-col justify-between md:items-center items-start md:pb-0 pb-[20px]">
              <p className="text-white text-[20px] font-semibold pb-2">
                Head to Head{" "}
                <span className="text-sm text-[#677375]">
                  (Since Sept 2023)
                </span>
              </p>
            </div>
            <div className="bg-[#181919] rounded-[12px] md:px-7 px-3 md:py-5 py-[20px] w-100">
              <div className="flex justify-between ">
                <div className="flex md:items-center items-start gap-2 md:flex-row flex-col">
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={matchInfo.data.team_a_img}
                  />
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                    {matchInfo.data.team_a}
                  </p>
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-0 lg:hidden block">
                    {matchInfo.data.team_a_short}
                  </p>
                </div>
                <div className="rounded-full bg-[#262626] flex flex-col items-center justify-center w-[40px] h-[40px] text-white text-sm">
                  Vs
                </div>
                <div className="flex md:items-center items-end gap-2 md:flex-row flex-col">
                  <img
                    className="w-[40px] h-[40px] rounded-full md:hidden block"
                    src={matchInfo.data.team_b_img}
                  />
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                    {matchInfo.data.team_b}
                  </p>
                  <p className="text-[22px] text-[#C9C7C7] font-[500] mb-0 lg:hidden block">
                    {matchInfo.data.team_b_short}
                  </p>
                  <img
                    className="w-[40px] h-[40px] rounded-full md:block hidden"
                    src={matchInfo.data.team_b_img}
                  />
                </div>
              </div>
              {/* Progress Bar */}
              <div
                // className="flex items-center"
                style={{
                  width: "100%",
                  // height: "12px",
                  backgroundColor: "#E1282B33",
                  borderRadius: "10px",
                  overflow: "hidden",
                  margin: "20px 10px 0 0",
                  minHeight: "20px",
                }}
              >
                {totalMatches === 0 ? (
                  <div
                    className="text-center text-[14px]"
                    style={{
                      paddingTop: "1px",
                      paddingBottom: "3px",
                    }}
                  >
                    No Data Available
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        height: "100%",
                        transition: "width 0.3s ease",
                        width: progress1Width,
                        backgroundColor: "#706d6d",
                      }}
                      className="float-start"
                    >
                      <span
                        className={`text-[14px] font-[800] ps-2 text-white ${progress1 > 0 ? "block" : "hidden"
                          }`}
                      >
                        {progress1}% {matchInfo.data.team_a_short}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        transition: "width 0.3s ease",
                        // width: `${progress2}%`,
                        width: progress2Width,
                        backgroundColor: "#fff",
                      }}
                      className={`float-end`}
                    >
                      <span
                        className={`text-[14px] font-[800] text-black text-end pe-2 ${progress2 > 0 ? "block" : "hidden"
                          } `}
                      >
                        {progress2}% {matchInfo.data.team_b_short}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className=" text-white my-4 flex justify-between md:px-5">
                <div>
                  <span
                    style={{
                      width: "15px",
                      height: "15px",
                      background: "#706d6d",
                      display: "inline-block",
                    }}
                    className="me-2"
                  ></span>{" "}
                  {matchInfo.data.team_a_short}
                </div>
                WINNING %
                <div>
                  <span
                    style={{
                      width: "15px",
                      height: "15px",
                      background: "#fff",
                      display: "inline-block",
                    }}
                    className="me-2"
                  ></span>{" "}
                  {matchInfo.data.team_b_short}
                </div>
              </div>
              {/* Win-Loss & Matches */}
              <div className="flex justify-between flex-wrap ">
                {/* Win-Loss--------- */}
                <div className="lg:w-[49%] w-[100%] bg-[#232525] mx-auto rounded-[12px] md:px-6 px-[10px] py-4 xl:mb-0 md:mb-[20px]">
                  <p className="text-[#9C9C9C] text-center py-2">Win - Loss</p>
                  <div className="flex justify-between">
                    {/* section 1 */}
                    <div className="flex gap-4 md:flex-row flex-col flex-wrap w-[49%] justify-center">
                      <p className="text-md-center text-start mb-0 w-100">
                        {matchInfo.data.team_a_short}
                      </p>
                      <div className="flex gap-3">
                        <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#3AB949] text-sm text-white flex justify-center items-center">
                          W
                        </div>
                        <div className="-ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#3AB949] text-sm text-white flex justify-end items-center ">
                          <span className="pr-3">{winCountA}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#E1282B] text-sm text-white flex justify-center items-center">
                          L
                        </div>
                        <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#E1282B] text-sm text-white flex justify-end items-center ">
                          <span className="pr-3"> {winCountB}</span>
                        </div>
                      </div>
                    </div>
                    {/* Section 2 */}
                    <div className="flex gap-4 md:flex-row flex-col flex-wrap w-[49%] justify-center">
                      <p className="text-md-center text-start mb-0 w-100">
                        {matchInfo.data.team_b_short}
                      </p>
                      <div className="flex gap-3">
                        <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#3AB949] text-sm text-white flex justify-center items-center">
                          W
                        </div>
                        <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#3AB949] text-sm text-white flex justify-end items-center ">
                          <span className="pr-3"> {winCountB}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="z-40 border border-[#353535] rounded-full w-[24px] h-[24px] bg-[#E1282B] text-sm text-white flex justify-center items-center">
                          L
                        </div>
                        <div className=" -ml-6 rounded-full w-[51px] h-[20px] m-auto bg-[#E1282B] text-sm text-white flex justify-end items-center ">
                          <span className="pr-3">{winCountA}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Last Matches------ */}
                <div className="lg:w-[49%] w-[100%] bg-[#232525] mx-auto rounded-[12px] md:px-6 px-[10px] py-4 md:block hidden">
                  <p className="text-[#9C9C9C] py-2 flex justify-between mb-2">
                    <span className="w-[20%] text-start">Matches</span>
                    <span className="w-[20%] text-start">
                      {matchInfo.data.team_a_short} Team
                    </span>
                    <span className="w-[20%] text-start">
                      {matchInfo.data.team_b_short} Team
                    </span>
                    <span className="w-[40%] text-start">Result</span>
                  </p>
                  {matchInfo.data.head_to_head.matches.map((val, ind) => {
                    return (
                      <p
                        className="text-[#fff] flex justify-between text-[15px]"
                        key={ind}
                      >
                        <span className="w-[20%] text-start">{val.matchs}</span>
                        <span className="w-[20%] text-start">
                          {val.team_a_score + " (" + val.team_a_over + ")"}
                        </span>
                        <span className="w-[20%] text-start">
                          {val.team_b_score + " (" + val.team_b_over + ")"}
                        </span>
                        <span className="w-[40%] text-start">{val.result}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* umpire and toss comparision    */}
          <div className="mx-4 flex flex-wrap md:flex-row flex-col justify-between md:px-7 px-3 py-4 gap-6 bg-[#000000] border-2 rounded-[18px] border-[#39441d] mt-10 ">
            <div className="xl:w-[48.5%] w-[100%]">
              <div className="bg-[#181919] border-2 rounded-[18px] border-[#181919] py-4 md:px-7 px-3 w-[100%] md:mb-4 mb-[40px]">
                <p className="text-white text-[20px] font-semibold pb-2">
                  Toss Comparison{" "}
                  <span className="text-sm text-[#677375]">
                    ( Last 5 matches)
                  </span>
                </p>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] mb-2 ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img
                      className="w-[30px] h-[30px] rounded-full "
                      src={matchInfo.data.team_a_img}
                    />
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_a}
                    </p>
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0  lg:hidden block">
                      {matchInfo.data.team_a_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#C9C7C7] flex gap-1">
                    {matchInfo.data.toss_comparison.team_a.map(
                      (result, index) => (
                        <p
                          key={index}
                          className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                            ? "bg-[#3AB949]"
                            : result === "L"
                              ? "bg-[#E1282B]"
                              : ""
                            }`}
                        >
                          {result}
                        </p>
                      )
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img
                      className="w-[30px] h-[30px] rounded-full"
                      src={matchInfo.data.team_b_img}
                    />
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_b}
                    </p>
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 block lg:hidden">
                      {matchInfo.data.team_b_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#C9C7C7] flex gap-1">
                    {matchInfo.data.toss_comparison.team_b.map(
                      (result, index) => (
                        <p
                          key={index}
                          className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                            ? "bg-[#3AB949]"
                            : result === "L"
                              ? "bg-[#E1282B]"
                              : ""
                            }`}
                        >
                          {result}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-[#181919] border-2 rounded-[18px] border-[#181919] py-4 md:px-7 px-3 w-[100%] ">
                <p className="text-white text-[20px] font-semibold pb-2">
                  Recent Forms{" "}
                  <span className="text-sm text-[#677375]">
                    ( Last 5 matches)
                  </span>
                </p>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] mb-2 ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img
                      className="w-[30px] h-[30px] rounded-full "
                      src={matchInfo.data.team_a_img}
                    />
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_a}
                    </p>
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0  lg:hidden block">
                      {matchInfo.data.team_a_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#C9C7C7] flex gap-1">
                    {matchInfo.data.forms.team_a.map((result, index) => (
                      <p
                        key={index}
                        className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                          ? "bg-[#3AB949]"
                          : result === "L"
                            ? "bg-[#E1282B]"
                            : ""
                          }`}
                      >
                        {result}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border-2 border-[#252927] rounded-[6px] ">
                  <div className="flex items-center gap-2 md:p-2">
                    <img
                      className="w-[30px] h-[30px] rounded-full"
                      src={matchInfo.data.team_b_img}
                    />
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 lg:block hidden">
                      {matchInfo.data.team_b}
                    </p>
                    <p className="text-[16px] text-[#C9C7C7] font-[500] mb-0 block lg:hidden">
                      {matchInfo.data.team_b_short}
                    </p>
                  </div>
                  <div className="text-[16px] text-[#C9C7C7] flex gap-1">
                    {matchInfo.data.forms.team_b.map((result, index) => (
                      <p
                        key={index}
                        className={`text-white mb-0 rounded-full w-[25px] flex items-center justify-center ${result === "W"
                          ? "bg-[#3AB949]"
                          : result === "L"
                            ? "bg-[#E1282B]"
                            : ""
                          }`}
                      >
                        {result}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-[48.5%] w-[100%]">
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div
                  className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
          text-[20px]"
                >
                  <p className="mb-0">Umpire</p>
                </div>

                <div className="flex items-center justify-center py-4 gap-5 w-[100%] md:px-4 px-[10px]">
                  <div className="space-y-4 w-[100%]">
                    <div className="bg-[#232525] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#777777] text-[14px] mb-0">
                        Match Umpires
                      </p>
                      <p className="text-[#C9C7C7] text-[14px] font-medium mb-0 text-end">
                        {matchInfo.data.umpire}
                      </p>
                    </div>
                    <div className="bg-[#232525] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#777777] text-[14px] mb-0">
                        3rd Umpire
                      </p>
                      <p className="text-[#C9C7C7] text-[14px] font-medium mb-0 text-end">
                        {matchInfo.data.third_umpire}
                      </p>
                    </div>
                    <div className="bg-[#232525] rounded-[6px] flex justify-between md:gap-10 gap-2 items-center md:px-4 px-[10px] py-3">
                      <p className="text-[#777777] text-[14px] mb-0">Referee</p>
                      <p className="text-[#C9C7C7] text-[14px] text-end font-medium mb-0">
                        {matchInfo.data.referee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Box className="px-3 py-4 my-5 text-center">
          <CircularProgress style={{ color: "#3ab949" }} />
        </Box>
      )}
    </>
  );
};

export default MatchInfo;
