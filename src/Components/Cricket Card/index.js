import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  getLiveMatchList,
  getUpcomingMatchData,
} from "../../redux/CricketApi/actions";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const CricketCard = () => {
  const dispatch = useDispatch();
  const { upcoming_match_datas } =
    useSelector((state) => state.CricketReducer) || {};
  const { live_match_datas } =
    useSelector((state) => state.CricketReducer) || {};

  // Upcoming Match Api Call
  useEffect(() => {
    if (!upcoming_match_datas || upcoming_match_datas.length === 0) {
      dispatch(getUpcomingMatchData());
    }
  }, [upcoming_match_datas, dispatch]);

  // Live match Api Call
  useEffect(() => {
    if (live_match_datas || live_match_datas.length === 0) {
      // console.log(live_match_datas);
      dispatch(getLiveMatchList());
    }
  }, [dispatch]);

  // Upcoming Slice Data
  const upcomingMatches = upcoming_match_datas
    ? upcoming_match_datas.slice(0, 20)
    : [""];
  // const liveMatches = live_match_datas ? live_match_datas.slice(0, 20) : [""];

  // Slider Breakpoint
  const breakPoints = [
    { width: 1, itemsToShow: 1 }, // Mobile devices
    { width: 550, itemsToShow: 2 }, // Tablets in portrait
    { width: 850, itemsToShow: 3 }, // Tablets in landscape
    { width: 1150, itemsToShow: 3 }, // Small desktops
    { width: 1450, itemsToShow: 4 }, // Medium desktops
    { width: 1750, itemsToShow: 4 }, // Large desktops
  ];

  return (
    <div className="main-container">
      {upcomingMatches.length > 0 && (
        <Carousel className="" breakPoints={breakPoints} speed={500}>
          {/* Live Card */}
          {live_match_datas.map((match, index) => (
            <Link
              to={`/match-details/${match.series_id}/${match.match_id}/${match.team_a_id}/${match.team_b_id}`}
              className="text-white"
              key={index}
            >
              <div key={match.match_id} className="cotainer-card">
                <div
                  className="inner-card1"
                  style={{ backgroundColor: "#1a461a" }}
                >
                  <span>{match.match_status}</span>
                  <span>{match.match_time}</span>
                  <span>{match.matchs}</span>
                </div>
                <div className="inner-card2">
                  <div className="sub-inner-card">
                    <div className="subinner">
                      <img
                        src={match.team_a_img}
                        className="object-cover rounded-full"
                      />
                      <span className="text-[14px]">{match.team_a_short}</span>
                    </div>
                    <div className="subinner">
                      <span className="text-[14px]">{match.team_b_short}</span>
                      <img
                        src={match.team_b_img}
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <span>{match.series}</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Upcoming Card */}
          {upcomingMatches.map((match, index) => (
            <Link
              to={`/match-details/${match.series_id}/${match.match_id}/${match.team_a_id}/${match.team_b_id}`}
              className="text-white"
              key={index}
            >
              <div key={match.match_id} className="cotainer-card">
                <div className="inner-card1" style={{ background: "blue" }}>
                  <span>{match.match_status}</span>
                  <span>{match.match_time}</span>
                  <span>{match.matchs}</span>
                </div>
                <div className="inner-card2">
                  <div className="sub-inner-card">
                    <div className="subinner">
                      <img
                        src={match.team_a_img}
                        className="object-cover rounded-full"
                      />
                      <span className="text-[14px]">{match.team_a_short}</span>
                    </div>
                    <div className="subinner">
                      <span className="text-[14px]">{match.team_b_short}</span>
                      <img
                        src={match.team_b_img}
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <span>{match.series}</span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CricketCard;
