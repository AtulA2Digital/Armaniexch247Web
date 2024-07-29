import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Squads_Icon from "../../Images/Cricket-Pages/team-white.png";
import { postAPIHandler } from "../../Api/api";
import "./style.css";

const Commentary = ({ status }) => {
  const { matchId } = useParams();
  const [liveInfo, setLiveInfo] = useState(null);
  // console.log("liveInfo - ", liveInfo);
  const [commentaries, setCommentaries] = useState({});
  // console.log("commentaries - ", commentaries);
  // console.log("Match Status - ", status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetLiveMatchInfo(matchId);

    // setTimeout(() => {
    //   GetCommentary(matchId);
    // }, 1000);

    const interval = setInterval(() => {
      GetLiveMatchInfo(matchId);
      GetCommentary(matchId);
    }, 1000);

    return () => clearInterval(interval);
  }, [matchId]);

  const GetCommentary = async (val) => {
    const formData = new FormData();
    formData.append("match_id", val);
    const response = await postAPIHandler("commentary", formData);
    setCommentaries(response.data);
    setLoading(false);
  };
  // Match Live Info--------------
  const GetLiveMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("liveMatch", formData);
    // console.log("response-->", response);
    setLiveInfo(response.data);
  };

  if (loading)
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );

  const renderCommentaryByOver = (overData, overName, inning) => {
    const incrementedOverName = parseInt(overName, 10) + 1;
    return (
      <div className="mb-4">
        {/* Over Name---------------- */}
        <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-2 px-4 d-flex justify-between mb-2 flex-wrap ">
          <h4 className="mb-0 mobile-50">
            <span>{incrementedOverName} Over</span>
            {overData.length > 0 && !overData[0].data.overs ? (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {" "}
                  Runs Scored: {overData[0].data.runs}
                </span>
              </>
            ) : (
              <span className="font-[400] text-[14px] d-block">Last Over</span>
            )}
          </h4>
          {/* Team Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {" "}
                  Score after {overData[0].data.over} overs
                </span>
                <span className="font-[600] text-[14px] d-block">
                  {overData[0].data.team} {overData[0].data.team_score}-
                  {overData[0].data.team_wicket}
                </span>
              </>
            )}
          </div>
          {/* Player Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.batsman_1_name}{" "}
                  {overData[0].data.batsman_1_runs} (
                  {overData[0].data.batsman_1_balls})
                </span>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.batsman_2_name}{" "}
                  {overData[0].data.batsman_2_runs} (
                  {overData[0].data.batsman_2_balls})
                </span>
              </>
            )}
          </div>
          {/* Bowler Score---- */}
          <div className="mobile-50">
            {overData.length > 0 && !overData[0].data.overs && (
              <>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.bolwer_name}
                </span>
                <span className="font-[400] text-[14px] d-block">
                  {overData[0].data.bolwer_overs}-
                  {overData[0].data.bolwer_maidens}-
                  {overData[0].data.bolwer_runs}-
                  {overData[0].data.bolwer_wickets}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Over By Over--------------- */}
        {(overData[0].data.overs ? overData : overData.slice(1)).map(
          (comment, index) => {
            return (
              <div
                key={index}
                className="border-b-[1px] border-[#7786502b] mb-2 flex gap-4"
              >
                <span>
                  <strong className="text-[#778650]">
                    {comment.data.overs}
                  </strong>
                </span>
                <p className="font-[400]">
                  {comment.data.title}, {/* Run */}{" "}
                  {comment.data.runs === "0" ? (
                    <span className="">no run, </span>
                  ) : comment.data.runs === "4" ? (
                    <span className="font-[600]">FOUR, </span>
                  ) : comment.data.runs === "6" ? (
                    <span className="font-[600]">SIX, </span>
                  ) : (
                    <span className="">{comment.data.runs} runs, </span>
                  )}
                  <span className="font-[600]">
                    {comment.data.wides > "0" ? "WIDE, " : ""}
                    {comment.data.wicket > "0" ? "WICKET, " : ""}
                    {comment.data.noballs > "0" ? "NO BALL, " : ""}
                    {comment.data.legbyes > "0" ? "Leg Byes, " : ""}
                    {comment.data.byes > "0" ? "Byes, " : ""}
                  </span>
                  {/* <span>{comment.data.description.length > 0 ? ", " : ""}</span> */}
                  <span className="">{comment.data.description}</span>
                </p>
              </div>
            );
          }
        )}
      </div>
    );
  };

  const firstInning = commentaries["1 Inning"]
    ? Object.entries(commentaries["1 Inning"]).map(
      ([overName, overDetails], ind) => (
        <div key={ind}>
          {renderCommentaryByOver(overDetails, overName, "1 Inning")}
        </div>
      )
    )
    : null;
  const secondInning = commentaries["2 Inning"]
    ? Object.entries(commentaries["2 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "2 Inning")}
          </div>
        );
      }
    )
    : null;
  const thirdInning = commentaries["3 Inning"]
    ? Object.entries(commentaries["3 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "3 Inning")}
          </div>
        );
      }
    )
    : null;
  const fourthInning = commentaries["4 Inning"]
    ? Object.entries(commentaries["4 Inning"]).map(
      ([overName, overDetails], ind) => {
        return (
          <div key={ind}>
            {renderCommentaryByOver(overDetails, overName, "4 Inning")}
          </div>
        );
      }
    )
    : null;
  const hasFirstInning = firstInning && firstInning.length > 0;
  const hasSecondInning = secondInning && secondInning.length > 0;
  const hasThirdInning = thirdInning && secondInning.length > 0;
  const hasFourthInning = fourthInning && secondInning.length > 0;
  // console.log("secondInning - ", secondInning);


  const RecentOverData = (Device) => {
    let oversToDisplay;

    // Adjust the condition based on the Device value
    if (Device === 'Desktop') {
      oversToDisplay = liveInfo.last4overs.length >= 3
        ? liveInfo.last4overs.slice(-3)
        : liveInfo.last4overs;
    } else {
      oversToDisplay = liveInfo.last4overs.length >= 2
        ? liveInfo.last4overs.slice(-2)
        : liveInfo.last4overs;
    }

    return (
      <>
        ... | {
          oversToDisplay.map((recent, ind) => (
            <React.Fragment key={ind}>
              {recent.balls.map((balls, ballsInd) => (
                <React.Fragment key={ballsInd}>
                  {balls}
                  {ballsInd !== recent.balls.length - 1 && ", "}
                </React.Fragment>
              ))}
              {ind !== oversToDisplay.length - 1 && " | "}
            </React.Fragment>
          ))
        }
      </>
    );
  };

  return (
    <>
      {((liveInfo && liveInfo.toss.length > 0 && liveInfo.last4overs)) ? (
        <div className="md:my-6 py-8 mx-4">
          <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-10 w-[90%] mx-auto">
            <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
              <img
                src={Squads_Icon}
                alt="squads"
                className="w-[50px] border-2 rounded-full border-[#fff] p-2"
              />
              Commentary
            </p>
          </div>

          {/* Live Score--------------------- */}
          <div className="live-score-wrapper flex flex-wrap justify-between mb-5 border-b-2 border-[#39441d]">
            {/* Batting & Bowling----- */}
            <div className=" bg-[#181919] border-2 rounded-[10px] border-[#181919] pt-3 md:px-7 px-3 xl:w-[55%] w-[100%] md:mb-4 mb-[40px]">
              {/* 1st Team */}
              {liveInfo.balling_team == liveInfo.team_a_id &&
                liveInfo.team_a_scores && (
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-[#ffffffa1] font-[500] mb-0 flex items-center gap-2">
                      <img
                        className=" w-[40px] h-[40px] rounded-full object-cover"
                        src={liveInfo.team_a_img}
                        alt=""
                      />
                      {liveInfo.team_a_short}:
                    </h3>
                    <p className="team-score mb-0 text-[18px] text-[#ffffffa1]">
                      {liveInfo.team_a_scores +
                        "(" +
                        liveInfo.team_a_over +
                        ")"}
                    </p>
                  </div>
                )}
              {liveInfo.balling_team == liveInfo.team_b_id &&
                liveInfo.team_b_scores && (
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-[#ffffffa1] font-[500] mb-0 flex items-center gap-2">
                      <img
                        className=" w-[40px] h-[40px] rounded-full object-cover"
                        src={liveInfo.team_b_img}
                        alt=""
                      />
                      {liveInfo.team_b_short}:
                    </h3>
                    <p className="team-score mb-0 text-[18px] text-[#ffffffa1]">
                      {liveInfo.team_b_scores +
                        " (" +
                        liveInfo.team_b_over +
                        ")"}
                    </p>
                  </div>
                )}
              {/* 2nd Team */}
              <div className="flex md:items-center justify-between flex-md-row flex-column flex-wrap gap-x-2 gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-[500] mb-0 flex items-center gap-2">
                    <img
                      className=" w-[40px] h-[40px] rounded-full object-cover"
                      src={
                        liveInfo.batting_team == liveInfo.team_a_id
                          ? liveInfo.team_a_img
                          : liveInfo.team_b_img
                      }
                      alt="team img"
                    />
                    {liveInfo.batting_team == liveInfo.team_a_id
                      ? liveInfo.team_a_short
                      : liveInfo.team_b_short}
                    :
                  </h3>
                  <p className="team-score mb-0 text-[18px]">
                    {liveInfo.batting_team == liveInfo.team_a_id
                      ? liveInfo.team_a_scores +
                      " (" +
                      liveInfo.team_a_over +
                      ")"
                      : liveInfo.team_b_scores +
                      "(" +
                      liveInfo.team_b_over +
                      ")"}
                    <span className=" ps-1 text-[14px] text-[#ffffffa1]">
                      CRR: {liveInfo.curr_rate}
                    </span>
                    {liveInfo.rr_rate > 0 && (
                      <span className="text-[14px] text-[#ffffffa1]">
                        , RR: {liveInfo.rr_rate}
                      </span>
                    )}
                  </p>
                </div>
                <p className="team-score mb-0 text-[20px] ps-2">
                  Last Event:
                  <span
                    className="bg-[red] text-[#fff] inline-block text-center rounded-sm ms-2 pb-1 px-2 blink-button"
                    style={{ minWidth: 30 }}
                  >
                    {liveInfo.first_circle}
                  </span>
                </p>
              </div>

              {/* Batting */}
              <div className="bg-[#242424] mb-4 rounded-lg group pb-2 mt-4">
                <div
                  className="py-2 px-4 "
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    background:
                      "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)",
                  }}
                >
                  <h3 className="text-[#000] text-[18px] font-bold mb-0">
                    Batting
                  </h3>
                </div>
                <div className="squad-wrapper">
                  <div className="flex flex-wrap text-[#ffffff6e] justify-between py-2 my-3 px-2 rounded-lg mx-[2%] border-2 border-[#252927]">
                    <p className="mb-0 sm:w-[50] w-[40%]">Name</p>
                    <div className="flex justify-between sm:w-[50] w-[60%]">
                      <span>R</span>
                      <span>B</span>
                      <span>4s</span>
                      <span>6s</span>
                      <span>SR</span>
                    </div>
                  </div>
                  {liveInfo.batsman.map((batsman, ind) => {
                    return (
                      <div
                        className="px-2 mx-[2%] border-b-2 border-[#252927] pb-2 my-3"
                        key={ind}
                      >
                        {batsman.name !== "-" && (
                          <div className="flex flex-wrap justify-between">
                            <p className="mb-0 sm:w-[50] w-[40%]">
                              <Link
                                className="text-[#fff]  hover:text-[#3ab949]"
                                to={`/player-profiles/${batsman.player_id}`}
                              >
                                {batsman.name}
                              </Link>
                            </p>
                            <div className="flex justify-between sm:w-[50] w-[60%]">
                              <span>{batsman.run}</span>
                              <span>{batsman.ball}</span>
                              <span>{batsman.fours}</span>
                              <span>{batsman.sixes}</span>
                              <span>{batsman.strike_rate}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bowling */}
              <div className="bg-[#242424] mb-4 rounded-lg group pb-2">
                <div
                  className="py-2 px-4 "
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    background:
                      "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)",
                  }}
                >
                  <h3 className="text-[#000] text-[18px] font-bold mb-2">
                    Bowling
                  </h3>
                </div>
                <div className="squad-wrapper">
                  <div className="flex flex-wrap text-[#ffffff6e] justify-between py-2 my-3 px-2 rounded-lg mx-[2%] border-2 border-[#252927]">
                    <p className="mb-0 sm:w-[50] w-[40%]">Name</p>
                    <div className="flex justify-between sm:w-[50] w-[60%]">
                      <span>O</span>
                      <span>R</span>
                      <span>W</span>
                      <span>ER</span>
                    </div>
                  </div>
                  {/* Current Bowler */}
                  {liveInfo.bolwer.name !== "-" && (
                    <div className="flex flex-wrap justify-between  pb-2 my-3 px-2  mx-[2%] border-b-2 border-[#252927]">
                      <p className="mb-0 sm:w-[50] w-[40%]">
                        <Link
                          className="text-[#fff] hover:text-[#3ab949]"
                          to={`/player-profiles/${liveInfo.bolwer.player_id}`}
                        >
                          {liveInfo.bolwer.name}*
                        </Link>
                      </p>
                      <div className="flex justify-between sm:w-[50] w-[60%]">
                        <span>{liveInfo.bolwer.over}</span>
                        <span>{liveInfo.bolwer.run}</span>
                        <span>{liveInfo.bolwer.wicket}</span>
                        <span>{liveInfo.bolwer.economy}</span>
                      </div>
                    </div>
                  )}
                  {/* Last Bowler */}
                  {liveInfo.last_bolwer.name !== "-" && (
                    <div className="flex flex-wrap justify-between  pb-2 my-3 px-2  mx-[2%] border-b-2 border-[#252927]">
                      <p className="mb-0 sm:w-[50] w-[40%]">
                        <Link
                          className="text-[#fff] hover:text-[#3ab949]"
                          to={`/player-profiles/${liveInfo.last_bolwer.player_id}`}
                        >
                          {liveInfo.last_bolwer.name}
                        </Link>
                      </p>
                      <div className="flex justify-between sm:w-[50] w-[60%]">
                        <span>{liveInfo.last_bolwer.over}</span>
                        <span>{liveInfo.last_bolwer.run}</span>
                        <span>{liveInfo.last_bolwer.wicket}</span>
                        <span>{liveInfo.last_bolwer.economy}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Yet To Bat */}
              {liveInfo.yet_to_bet && <div className="bg-[#242424] mb-4 rounded-lg group pb-2">
                <div
                  className="py-2 px-4 "
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    background:
                      "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)",
                  }}
                >
                  <h3 className="text-[#000] text-[18px] font-bold mb-2">
                    Yet To Bat
                  </h3>
                </div>
                <p className="font-[400] text-[#ffffffa1] my-3 mx-[2%]">
                  {liveInfo.yet_to_bet.map((player, ind) => {
                    return (< React.Fragment key={ind} >{player + (ind !== liveInfo.yet_to_bet.length - 1 ? ", " : "")}</React.Fragment>)

                  })}
                </p>
              </div>}

            </div>

            {/* Key Stats & Summary */}
            <div className="xl:w-[43%] w-[100%] md:mb-4 mb-[40px]">
              {/* Key Stats */}
              <div className="bg-[#181919] mb-4" style={{ borderRadius: 10 }}>
                <div
                  className="py-2 px-4"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    background:
                      "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)",
                  }}
                >
                  <h3 className="text-[#000] text-[18px] font-bold mb-0">
                    Key Stats
                  </h3>
                </div>
                <div className="py-3 md:px-7 px-3" style={{ minHeight: 200 }}>
                  {/* Recent */}
                  <p className="font-[400] md:block hidden">
                    <span className="font-[600] text-[18px]">Recent: </span>
                    {RecentOverData("Desktop")}
                  </p>
                  <p className="font-[400] md:hidden block">
                    <span className="font-[600] text-[18px]">Recent:</span>{" "}
                    {RecentOverData("Mobile")}

                  </p>

                  {/* Powerplay */}
                  {liveInfo.powerplay.length > 0 && <p className="font-[400] text-[#ffffffa1]">
                    <span className="font-[500] text-[18px] text-[#fff]">
                      Powerplay:
                    </span>{" "}
                    {liveInfo.powerplay}
                  </p>}

                  {/* Partnership */}
                  <p className="font-[400] text-[#ffffffa1]">
                    <span className="font-[500] text-[18px] text-[#fff]">
                      Partnership:
                    </span>{" "}
                    {liveInfo.partnership.run} ({liveInfo.partnership.ball})
                  </p>
                  {/* lastwicket */}
                  {liveInfo.lastwicket.player.length > 0 && <p className="font-[400] text-[#ffffffa1]">
                    <span className="font-[500] text-[18px] text-[#fff]">
                      Last Wicket:
                    </span>{" "}
                    {liveInfo.lastwicket.player + " " + liveInfo.lastwicket.run} ({liveInfo.lastwicket.ball})
                  </p>}
                  {/* Toss */}
                  <p className="font-[400] text-[#ffffffa1]">
                    <span className="font-[500] text-[18px] text-[#fff]">
                      Toss:
                    </span>{" "}
                    {liveInfo.toss}
                  </p>
                </div>
              </div>
              {/* Summary */}
              {liveInfo.session && <div className="bg-[#181919] pb-4" style={{ borderRadius: 10 }}>
                <div
                  className="py-2 px-4"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    background:
                      "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)",
                  }}
                >
                  <h3 className="text-[#000] text-[18px] font-bold mb-0">
                    Match Summary
                  </h3>
                </div>
                <div
                  className="md:px-7 px-3"
                  style={{ maxHeight: 400, overflowY: "scroll" }}
                >
                  <div
                    className="mt-2 text-justify md:px-5"
                    dangerouslySetInnerHTML={{
                      __html: liveInfo.session,
                    }}
                  />
                </div>
              </div>}

            </div>
          </div>

          {/* Commentary---------------- */}
          {commentaries.length !== 0 && <div className="d-flex justify-between flex-wrap">
            {hasFourthInning && (
              <div className={` ${hasFourthInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4">
                  4rth Inning
                </h3>
                {fourthInning}
              </div>
            )}
            {hasThirdInning && (
              <div className={` ${hasThirdInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4">
                  3rd Inning
                </h3>
                {thirdInning}
              </div>
            )}
            {hasSecondInning && (
              <div className={` ${hasSecondInning ? "xl:w-[48%] w-full" : ""}`}>
                <h3 className="text-md-start text-center uppercase mb-4">
                  2nd Inning
                </h3>
                {secondInning}
              </div>
            )}
            {hasFirstInning && (
              <div
                className={`test ${hasFirstInning ? "xl:w-[48%] w-full" : ""}`}
              >
                <h3 className="text-md-start text-center uppercase mb-4">
                  1st Inning
                </h3>
                {firstInning}
              </div>
            )}
          </div>}
        </div>
      ) : (
        <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
          No Data Found
        </div>
      )}
    </>
  );
};

export default Commentary;
