import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleIcon from "../../Images/Cricket-Pages/Heading Icons/schedule-min.webp";
import { getUpcomingMatchData } from "../../redux/CricketApi/actions";
import { Link } from "react-router-dom";
import { getAPIHandler } from "../../Api/api";
import "./style.css";
import { Helmet } from "react-helmet";

const Schedule = () => {
  const dispatch = useDispatch();
  const { upcoming_match_datas } = useSelector((state) => state.CricketReducer);
  // console.log("upcoming_match_datas - ", upcoming_match_datas);
  const [activeSeriesType, setActiveSeriesType] = useState();
  const [getAllMatchesList, setGetAllMatchesList] = useState(true);
  const [matchStatus, setMatchStatus] = useState("Upcomming");
  const [liveMatchesList, setLiveMatchesList] = useState(null);
  // console.log("liveMatchesList - ", liveMatchesList);
  const [recentMatchesList, setRecentMatchesList] = useState(null);
  // console.log("recentMatchesList - ", recentMatchesList);

  useEffect(() => {
    if (!upcoming_match_datas || upcoming_match_datas.length === 0) {
      dispatch(getUpcomingMatchData());
    }
  }, [upcoming_match_datas, dispatch]);

  useEffect(() => {
    GetAllLiveMatches();
    GetAllRecentMatches();
  }, [matchStatus]);

  // Filter matches by active series type
  let SeriesTypeFilteredMatches =
    matchStatus === "Upcomming"
      ? upcoming_match_datas.filter((match) => {
        return match.series_type === activeSeriesType;
      })
      : matchStatus === "Live"
        ? liveMatchesList.filter((match) => {
          return match.series_type === activeSeriesType;
        })
        : recentMatchesList.filter((match) => {
          return match.series_type === activeSeriesType;
        });

  // Function to group matches by date
  const groupMatchesByDate = (matches) => {
    if (matchStatus === "Upcomming") {
      return matches.reduce((acc, match) => {
        const date = match.date_wise;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(match);
        return acc;
      }, {});
    } else if (matchStatus === "Recent") {
      return matches.reduce((acc, match) => {
        const date = match.date_wise;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(match);
        return acc;
      }, {});
    }
  };

  let matchesGroupedByDate = groupMatchesByDate(SeriesTypeFilteredMatches);
  if (getAllMatchesList) {
    if (matchStatus === "Upcomming") {
      matchesGroupedByDate = groupMatchesByDate(upcoming_match_datas);
    } else if (matchStatus === "Live") {
      SeriesTypeFilteredMatches = liveMatchesList;
    } else {
      matchesGroupedByDate = groupMatchesByDate(recentMatchesList);
    }
  }

  const GetAllLiveMatches = async () => {
    const response = await getAPIHandler("liveMatchList");
    // console.log("GetAllLiveMatches response-->", response);
    setLiveMatchesList(response.data);
  };

  const GetAllRecentMatches = async () => {
    const response = await getAPIHandler("recentMatches");
    // console.log("GetAllLiveMatches response-->", response);
    setRecentMatchesList(response.data);
  };
  // console.log("SeriesTypeFilteredMatches - ", SeriesTypeFilteredMatches);
  return (
    <>
      <Helmet>
        <title>Match Schedule | Stay Updated with Live Matches at Armaniexch247news</title>
        <meta name="description" content="Don't miss a moment of the action! Check out the latest match schedule at Armaniexch247news for live updates on all your favorite sports. Stay informed and get ready to bet on the best games." />
      </Helmet>
      <div className="xl:w-[90%] w-[95%] mx-auto px-2 my-10 py-7">
        <div className="rounded-lg py-3 mb-5 sm:w-[90%] mx-auto" style={{ background: "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)" }}>
          <p className="text-black md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
            <img
              src={ScheduleIcon}
              alt="squads"
              className="w-[60px] border-2 rounded-full border-[#fff] p-2 bg-[#000]"
            />
            Cricket Schedule
          </p>
        </div>

        {/* Match Status Wise List Tab--------------- */}
        <div className="lg:space-x-4 space-x-2 pb-3 border-b-2 mb-4 border-[#ffffff14] match-status-tabs">
          <button
            onClick={() => {
              setMatchStatus("Live");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${matchStatus === "Live" ? "active" : ""
              }`}
          >
            Live
          </button>
          <button
            onClick={() => {
              setMatchStatus("Recent");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${matchStatus === "Recent" ? "active" : ""
              }`}
          >
            Recent
          </button>
          <button
            onClick={() => {
              setMatchStatus("Upcomming");
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] px-6 py-2 rounded-[32px] font-[600] cursor-pointer ${matchStatus === "Upcomming" ? "active" : ""
              }`}
          >
            Upcomming
          </button>
        </div>

        {/* Match Type Wise List Tab------------- */}
        <div className="lg:space-x-4 space-x-2 pb-3 border-b-2 mb-4 border-[#ffffff14] match-type-tabs">
          <button
            onClick={() => {
              setGetAllMatchesList(true);
              setActiveSeriesType();
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${getAllMatchesList ? "active" : ""
              }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setActiveSeriesType("International");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesType === "International" ? "active" : ""
              }`}
          >
            International
          </button>
          <button
            onClick={() => {
              setActiveSeriesType("Domestic");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesType === "Domestic" ? "active" : ""
              }`}
          >
            Domestic & Others
          </button>
          <button
            onClick={() => {
              setActiveSeriesType("League");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesType === "League" ? "active" : ""
              }`}
          >
            League
          </button>
          <button
            onClick={() => {
              setActiveSeriesType("Women");
              setGetAllMatchesList(false);
            }}
            className={`toggle-button info-hover bg-[#ffffff] text-[#000] md:px-6 px-[5px] py-2 rounded-[32px] font-[600] cursor-pointer ${activeSeriesType === "Women" ? "active" : ""
              }`}
          >
            Women
          </button>
        </div>

        {/* Upcomming And Recent Matches------------------ */}
        {matchStatus !== "Live" &&
          Object.keys(matchesGroupedByDate).map((date) => (
            <div key={date} className="mb-10">
              <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg p-3 mb-2">
                {date.toUpperCase()} {/* Displaying date from date_wise */}
              </div>
              {matchesGroupedByDate[date].map((match, ind) => (
                <Link
                  to={`/match-details/${match.series_id}/${match.match_id}/${match.team_a_id}/${match.team_b_id}`}
                  className="text-white"
                  key={ind}
                >
                  {/* {console.log("matchesGroupedByDate match", match)} */}
                  <div
                    key={match.match_id}
                    className="flex flex-wrap justify-between w-100 py-3 rounded-lg mt-2 bg-[#232525] hover:bg-[#393c3c] px-3 md:gap-y-0 gap-y-[20px]"
                  >
                    <p className="mb-0 w-[20%] text-[16px]">{match.series}</p>

                    <div className="mb-0 w-[60%] text-[16px]">
                      {match.team_a} vs {match.team_b}, {match.matchs}
                      <p className="my-2 text-[14px] text-[#ffffffaf]">
                        {match.venue}
                      </p>
                      {match.result && (
                        <p className="mb-0 text-[16px] text-[red]">
                          {match.result}
                        </p>
                      )}
                      {!match.result && (
                        <p className="text-[16px] mb-0 text-[#3ab949]">
                          Match starts at {match.match_date}, {match.match_time}
                        </p>
                      )}
                    </div>

                    <p className="mb-0 text-[16px]">
                      {match.match_time} <span>{match.date_time}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}

        {/* Live Matches------------------ */}
        <div className="my-10">
          {matchStatus === "Live" &&
            (SeriesTypeFilteredMatches.length > 0 ? (
              SeriesTypeFilteredMatches.map((val, ind) => (
                <div key={ind} className="mb-10">
                  <Link
                    to={`/match-details/${val.series_id}/${val.match_id}/${val.team_a_id}/${val.team_b_id}`}
                    className="text-white"
                    key={ind}
                  >
                    <div
                      key={val.match_id}
                      className="flex flex-wrap justify-between w-100 py-3 rounded-lg mt-2 bg-[#232525] hover:bg-[#393c3c] px-3 md:gap-y-0 gap-y-[20px]"
                    >
                      <p className="mb-0 w-[20%] text-[16px]">{val.series}</p>

                      <p className="mb-0 w-[60%] text-[16px]">
                        {val.team_a} vs {val.team_b}, {val.matchs}
                        <p className="my-2 text-[14px] text-[#ffffffaf]">
                          {val.venue}
                        </p>
                        <p className="mb-0 text-[16px] text-[#3ab949] text-capitalize">
                          {/* {val.need_run_ball} */}
                          {val.toss}
                        </p>
                      </p>

                      <p className="mb-0 text-[16px] ">
                        {val.match_time} <span>{val.date_time}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-white py-4 bg-[#242424] rounded-lg">
                No Data Found
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Schedule;
