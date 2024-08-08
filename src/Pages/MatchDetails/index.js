import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAPIHandler, postAPIHandler } from "../../Api/api";
import MatchInfo from "../../Components/Match Info";
import PitchReport from "../../Components/PitchReport/PitchReport";
import Squads from "../../Components/Squads";
import PointsTable from "../../Components/PointsTable";
import Scoreboard from "../../Components/Scoreboard";
import Commentary from "../../Components/Commentary";
import CircularProgress from '@mui/material/CircularProgress';

const MatchDetails = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo);
  const [liveInfo, setLiveInfo] = useState(null);
  // console.log("liveInfo - ", liveInfo);
  const [infoToggle, setinfoToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("isLoading - ", isLoading);
  const [pitchReportToggle, setPitchReportToggle] = useState(false);
  const [squadsToggle, setSquadsToggle] = useState(false);
  const [pointsTableToggle, setPointsTableToggle] = useState(false);
  const [scoreboardToggle, setScoreboardToggle] = useState(false);
  const [commentaryToggle, setCommentaryToggle] = useState(false);
  const [teamScoreCard, setTeamScoreCard] = useState([]);
  const [liveMatchesList, setLiveMatchesList] = useState([]);
  // console.log("liveMatchesList - ", liveMatchesList);
  const [matchStatus, setMatchStatus] = useState();
  // console.log("matchStatus - ", matchStatus);
  const [matchIsLive, setMatchIsLive] = useState(false);
  // console.log("matchIsLive - ", matchIsLive);
  const { matchId, seriesId } = useParams();

  useEffect(() => {
    // Set loading to true initially
    setIsLoading(true);

    // Filter Live Match------------------
    const LiveMatchData = (liveMatchesList && liveMatchesList.length > 0) && liveMatchesList.filter((match) => {
      return match.match_id == matchId;
    });
    // console.log("LiveMatchData - ", LiveMatchData);

    if (LiveMatchData !== false) {
      if (LiveMatchData && LiveMatchData.length > 0) {
        setMatchIsLive(true);
        setMatchStatus("LIVE");
        setIsLoading(false); // Set loading to false when data is available
      } else {
        setMatchIsLive(false);
        if (liveInfo && !matchIsLive) {
          if (liveInfo.result) {
            setMatchStatus("FINISHED");
          } else {
            setMatchStatus("UPCOMING");
          }
        }
        setIsLoading(false); // Set loading to false when data is available
      }
    }


  }, [liveMatchesList, matchInfo]);

  const handlePointsTable = () => {
    setPointsTableToggle(true);
    setinfoToggle(false);
    setSquadsToggle(false);
    setPitchReportToggle(false);
    setScoreboardToggle(false);
    setCommentaryToggle(false);
  };

  const handleInfo = () => {
    setinfoToggle(true);
    setPointsTableToggle(false);
    setSquadsToggle(false);
    setPitchReportToggle(false);
    setScoreboardToggle(false);
    setCommentaryToggle(false);
  };

  const handleSquadsToggle = () => {
    setSquadsToggle(true);
    setinfoToggle(false);
    setPointsTableToggle(false);
    setPitchReportToggle(false);
    setScoreboardToggle(false);
    setCommentaryToggle(false);
  };

  const handlePitchReportToggle = () => {
    setPitchReportToggle(true);
    setSquadsToggle(false);
    setinfoToggle(false);
    setPointsTableToggle(false);
    setScoreboardToggle(false);
    setCommentaryToggle(false);
  };

  const handleScoreboardToggle = () => {
    setScoreboardToggle(true);
    setPitchReportToggle(false);
    setSquadsToggle(false);
    setinfoToggle(false);
    setPointsTableToggle(false);
    setCommentaryToggle(false);
  };

  const handleCommentaryToggle = () => {
    setCommentaryToggle(true);
    setScoreboardToggle(false);
    setPitchReportToggle(false);
    setSquadsToggle(false);
    setinfoToggle(false);
    setPointsTableToggle(false);
  };

  useEffect(() => {
    GetMatchInfo(matchId);
    GetLiveMatchInfo(matchId);

    const interval = setInterval(() => {
      GetLiveMatchInfo(matchId);
      GetTeamScorecard(matchId);
      GetLiveMatchesList();
    }, 1000);

    return () => clearInterval(interval);
  }, [matchId]);

  // Countdown
  const calculateCountdown = (matchTime) => {
    const now = new Date();
    // const matchDate = new Date(matchInfo.data.match_date);
    const matchDate = new Date(now);
    // console.log("matchDate1 - ", matchDate);

    const [time, modifier] = matchTime.split(" ");
    let [hours, minutes] = time.split(":");
    hours =
      (modifier === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10)) % 24;

    matchDate.setHours(hours);
    matchDate.setMinutes(minutes);
    matchDate.setSeconds(0);

    // console.log("matchDate2 - ", matchDate);
    // console.log("now - ", now);
    const difference = matchDate - now;
    // console.log("difference - ", difference);

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      if (
        matchInfo.data.result.length === 0 &&
        matchInfo.data.toss.length === 0
      ) {
        return "Details will appear once the match starts.";
      }
    }
  };

  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    if (
      matchInfo &&
      matchInfo.data &&
      matchInfo.data.match_time &&
      matchInfo.data.match_date
    ) {
      const timer = setInterval(() => {
        const timeLeft = calculateCountdown(
          matchInfo.data.match_date && matchInfo.data.match_time
        );
        // console.log("timeLeft - ", timeLeft);
        setCountdown(timeLeft);
      }, 1000);

      return () => clearInterval(timer); // Clear the interval on component unmount
    }
  }, [matchInfo]);

  // Match Live Info--------------
  const GetLiveMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("liveMatch", formData);
    // console.log("response-->", response);
    setLiveInfo(response.data);
  };

  // Match Info API-----------------
  const GetMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);
    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
  };

  const GetTeamScorecard = async (val) => {
    const formData = new FormData();
    formData.append("match_id", val);
    const response = await postAPIHandler("scorecardByMatchId", formData);
    // console.log("scorecardByMatchId resp - ", response);
    setTeamScoreCard(response.data);
  };

  // Match Info API-----------------
  const GetLiveMatchesList = async (value) => {
    const response = await getAPIHandler("liveMatchList");
    // console.log("GetLiveMatchesList response-->", response);
    setLiveMatchesList(response.data);


  };

  const capitalizeSentence = (sentence) => {
    // Split the sentence into words
    const words = sentence.toLowerCase().split(" ");

    // Capitalize each word's first letter
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back into a sentence
    return capitalizedWords.join(" ");
  };
  return (
    <>
      {liveInfo && matchInfo && (
        <div
          key={liveInfo?.match_id}
          className="bg-cover gap-6 pt-20 pb-10 flex flex-col items-center match-info-bg bg-center"
        >
          <h1 className="md:text-[30px] text-white text-center font-[600] md:px-[0] px-[10px]">
            {liveInfo?.team_a_short} vs {liveInfo?.team_b_short},{" "}
            {matchInfo?.data.matchs} <br />
            <span className="text-[18px] text-[#ffffffba]">{matchInfo.data.match_type} Match {matchInfo.data.is_hundred === 2 && <span className="text-[14px]">(100 Balls)</span>}</span>
          </h1>
          <p>
            {isLoading ? (
              <CircularProgress style={{ color: "#3ab949" }} />
            ) : (
              <span
                className={`d-inline-block p-1 py-2 rounded-[6px] blink-button min-w-[100px] text-center font-[600]`}
                style={{
                  background:
                    matchStatus === "LIVE"
                      ? "rgb(58, 185, 73)"
                      : matchStatus === "UPCOMING"
                        ? "blue"
                        : "red",
                }}
              >
                {matchStatus}
              </span>
            )}
          </p>


          {/* Live Card Start */}
          {liveInfo && (
            <div className="bg-[#000000a8] rounded-[12px] lg:w-[45%] w-[90%] md:px-5 px-[20px] py-4 text-center ">
              {/* Team */}
              {(liveInfo.batting_team) || (liveInfo.toss.length === 0) ?
                (<div className="flex justify-between livecard">
                  <div className="space-y-8">
                    <div className="flex items-center gap-2">
                      <img
                        className=" w-[30px] h-[30px] rounded-full object-cover"
                        src={liveInfo.team_a_img} alt=""
                      />
                      <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0">
                        {liveInfo.team_a}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        className=" w-[30px] h-[30px] rounded-full object-cover"
                        src={liveInfo.team_b_img} alt=""
                      />

                      <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0">
                        {liveInfo.team_b}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-8">
                    {/* Team A Score------------ */}
                    <span className="lg:text-[18px] text-[15px] text-white font-[500] mb-0">
                      {liveInfo.team_a_scores ? (
                        liveInfo.team_a_scores_over.map((score, ind) => {
                          return (
                            <span key={ind}>
                              {ind === 1 && <span>&</span>}
                              {score.score + " (" + score.over + ")"}
                            </span>
                          );
                        })
                      ) : (
                        <span className="lg:text-[18px] text-[15px]">
                          No Data
                        </span>
                      )}
                    </span>

                    {/* Team B Score------------ */}
                    <span className="lg:text-[18px] text-[15px] text-white font-[500] mb-0">
                      {liveInfo.team_b_scores ? (
                        liveInfo.team_b_scores_over.map((score, ind) => {
                          return (
                            <span key={ind}>
                              {ind === 1 && <span> & </span>}
                              {score.score + " (" + score.over + ")"}
                            </span>
                          );
                        })
                      ) : (
                        <span className="lg:text-[18px] text-[15px]">
                          No Data
                        </span>
                      )}
                    </span>
                  </div>
                </div>) :
                (<>
                  {teamScoreCard.length === undefined && (<>
                    {Object.entries(teamScoreCard.scorecard).map(([groupName, inning], ind) => {
                      return (<div className="flex items-center justify-between gap-2 mb-4 pb-2 scorecard" key={ind}>
                        <div className="flex items-center gap-2">
                          <img
                            className=" w-[30px] h-[30px] rounded-full object-cover"
                            src={inning.team.flag} alt=""
                          />
                          <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0 md:block hidden">
                            {inning.team.name}
                          </p>
                          <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0 md:hidden block">
                            {inning.team.short_name}
                          </p>
                        </div>
                        <p className="mb-0">
                          <span className="lg:text-[18px] text-[15px] text-white font-[500] mb-0">
                            {/* 416-10 (88.3) */}
                            {inning.team.score + "-" + inning.team.wicket + " (" + inning.team.over + ") "}
                          </span>
                        </p>
                      </div>);
                    })}
                    {/* Super Over */}
                    {teamScoreCard.super_over && <>
                      <p className="bg-[#a0a0a045] py-1 rounded-md mb-4 text-xl blink-button w-[80%] mx-auto">Super Over</p>
                      {Object.entries(teamScoreCard.super_over).map(([groupName, inning], ind) => {
                        return (<div className="flex items-center justify-between gap-2 mb-4 pb-2" key={ind}>
                          <div className="flex items-center gap-2">
                            <img
                              className=" w-[30px] h-[30px] rounded-full object-cover"
                              src={inning.team.flag} alt=""
                            />
                            <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0 md:block hidden">
                              {inning.team.name}
                            </p>
                            <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0 md:hidden block">
                              {inning.team.short_name}
                            </p>
                          </div>
                          <p className="mb-0">
                            <span className="lg:text-[18px] text-[15px] text-white font-[500] mb-0">
                              {/* 416-10 (88.3) */}
                              {inning.team.score + "-" + inning.team.wicket + " (" + inning.team.over + ") "}
                            </span>
                          </p>
                        </div>);
                      })}
                    </>}
                  </>)}

                </>)
              }

              {/* Team Countdown & Toss & Others*/}
              <div className="lg:text-[18px] text-[15px] text-white font-[500] pt-4">
                {/* {liveInfo && liveInfo?.data && liveInfo?.data.result
                  ? null
                  : countdown} */}
                <span className="capitalize">
                  {liveInfo.result.length > 0
                    ? capitalizeSentence(liveInfo.result)
                    : liveInfo.trail_lead
                      ? capitalizeSentence(liveInfo.trail_lead)
                      : liveInfo.toss.length > 0
                        ? capitalizeSentence(liveInfo.toss)
                        : countdown}
                </span>
              </div>

              {/* Series Name With Link */}
              <div className="lg:text-[18px] text-[15px] text-white font-[500]  mt-4">
                <Link
                  className="text-decoration-underline text-[#3ab949] cursor-pointer blink-button"
                  to={`/series-details/${seriesId}`}
                >
                  Series Details
                </Link>
              </div>

              {/* Match ANd Series Name  */}
              <div className=" bg-[#a0a0a045] w-full py-2 rounded-md mt-3">
                {matchInfo?.data.matchs}, {matchInfo?.data.place},{" "}
                {matchInfo?.data.match_date}, {matchInfo?.data.series}
              </div>
            </div>
          )}
          {/* Live Card end */}

          <div className="pt-14 space-x-3 lg:w-[100%] sm:w-[700px] mx-auto lg:text-center page-info-tabs">
            <span
              onClick={handleInfo}
              style={{
                backgroundColor: infoToggle ? "#3AB949" : "#000",
                borderColor: infoToggle ? "#fff" : "#000",
              }}
              className="info-hover bg-[#000] hover:bg-[#000000A3] px-6 py-2 rounded-[32px] text-white cursor-pointer"
            >
              Match Info
            </span>
            <span
              onClick={handleCommentaryToggle}
              style={{
                backgroundColor: commentaryToggle ? "#3AB949" : "#000",
                borderColor: commentaryToggle ? "#fff" : "#000",
              }}
              className="info-hover bg-[#000] hover:bg-[#000000A3]  px-6 py-2 rounded-[32px] text-white hover:text-[#3AB949] cursor-pointer  "
            >
              Commentary
            </span>
            <span
              onClick={handleScoreboardToggle}
              style={{
                backgroundColor: scoreboardToggle ? "#3AB949" : "#000",
                borderColor: scoreboardToggle ? "#fff" : "#000",
              }}
              className="info-hover bg-[#000] hover:bg-[#000000A3]  px-6 py-2 rounded-[32px] text-white hover:text-[#3AB949] cursor-pointer  "
            >
              Scorecard
            </span>
            <span
              onClick={handlePitchReportToggle}
              style={{
                backgroundColor: pitchReportToggle ? "#3AB949" : "#000",
                borderColor: pitchReportToggle ? "#fff" : "#000",
              }}
              className="info-hover bg-[#000] hover:bg-[#000000A3]  px-6 py-2 rounded-[32px] text-white hover:text-[#3AB949] cursor-pointer  "
            >
              Pitch Report
            </span>
            <span
              onClick={handleSquadsToggle}
              style={{
                backgroundColor: squadsToggle ? "#3AB949" : "#000",
                borderColor: squadsToggle ? "#fff" : "#000",
              }}
              className="info-hover bg-[#000] hover:bg-[#000000A3]  px-6 py-2 rounded-[32px] text-white hover:text-[#3AB949] cursor-pointer  "
            >
              Squads
            </span>
            <span
              onClick={handlePointsTable}
              style={{
                backgroundColor: pointsTableToggle ? "#3AB949" : "#000",
                borderColor: pointsTableToggle ? "#fff" : "#000",
              }}
              className={`info-hover bg-[#000]
                hover:bg-[#000000A3] px-6 py-2 rounded-[32px] text-white hover:text-[#3AB949] cursor-pointer d-${""}`}
            >
              Points Table
            </span>
          </div>
        </div >
      )}
      <div>{infoToggle && <MatchInfo status={matchStatus} />}</div>
      <div>{pitchReportToggle && <PitchReport />}</div>
      <div>{squadsToggle && <Squads />}</div>
      <div>{pointsTableToggle && <PointsTable seriesId={seriesId} />}</div>
      <div>{scoreboardToggle && <Scoreboard />}</div>
      <div>{commentaryToggle && <Commentary status={matchStatus} />}</div>
    </>
  );
};

export default MatchDetails;
