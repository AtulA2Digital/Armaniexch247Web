import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Squads_Icon from "../../Images/Cricket-Pages/team-white.png";
import { postAPIHandler } from "../../Api/api";
import "./style.css";

const Commentary = ({ status }) => {
  const { matchId } = useParams();
  const [liveInfo, setLiveInfo] = useState(null);
  console.log("liveInfo - ", liveInfo);
  const [commentaries, setCommentaries] = useState({});
  // console.log("commentaries - ", commentaries);
  // console.log("Match Status - ", status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    GetLiveMatchInfo(matchId);

    setTimeout(() => {
      GetCommentary(matchId);
    }, 1000);

    const interval = setInterval(() => {
      GetLiveMatchInfo(matchId);
      GetCommentary(matchId);
    }, 5000);

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
  return (
    <>
      {commentaries.length !== 0 ? (
        <div className="my-10 py-8 w-[90%] mx-auto">
          <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-4 mx-auto w-100">
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
          {liveInfo && (
            <div className="live-score-wrapper">
              <div className=" bg-[#181919] border-2 rounded-[18px] border-[#181919] py-4 md:px-7 px-3 w-[60%] md:mb-4 mb-[40px]">
                <div className="flex items-center gap-2">
                  <p className="lg:text-[22px] text-[15px] text-white font-[500] mb-0 flex items-center gap-2">
                    <img
                      className=" w-[30px] h-[30px] rounded-full object-cover"
                      src={liveInfo.team_a_img}
                    />
                    {liveInfo.team_a}
                  </p>
                  <h2 className="team-score">{liveInfo.team_a_scores}</h2>
                </div>
              </div>
            </div>
          )}

          {/* Commentary---------------- */}
          <div className="d-flex justify-between flex-wrap">
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
          </div>
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
