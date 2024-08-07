import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { postAPIHandler } from '../../../Api/api';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const SeriesInfo = () => {
    const { seriesId } = useParams();
    const [seriesNewsList, setSeriesNewsList] = useState([]);
    // console.log("seriesNewsList - ", seriesNewsList);
    const [MOTS, setMOTS] = useState();
    // console.log("MOTS - ", MOTS);

    const [dropdownStatus, setDropdownStatus] = useState({});
    const contentRefs = useRef([]);

    useEffect(() => {
        getSeriesNews()
        GetMOTS();
    }, [seriesId])

    // For Dropdown Transition----------------
    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                if (dropdownStatus[MOTSPerformanceList[index].statTitle]) {
                    ref.style.maxHeight = `${ref.scrollHeight}px`;
                } else {
                    ref.style.maxHeight = "0px";
                }
            }
        });
    }, [dropdownStatus]);

    const MOTSPerformanceList = [
        {
            statTitle: "Batting Performance",
            dataListName: MOTS !== undefined && MOTS.batsman,
            headerValues: [
                "Teams",
                "Match",
                "Run",
                "Ball",
                "Out By",
                "SR",
                "4's",
                "6's",
            ],
            headerKeysLength: 8,
        },
        {
            statTitle: "Bowling Performance",
            dataListName: MOTS !== undefined && MOTS.bolwer,
            headerValues: [
                "Teams",
                "Match",
                "Over",
                "Run",
                "Dot Balls",
                "Wkts",
                "Economy",
            ],
            headerKeysLength: 7,
        },
    ];

    const GetStatsWidth = (val) => {
        return 100 / val;
    };

    const handleDropdownToggle = (statTitle, index) => {
        setDropdownStatus((prevStatus) => {
            const newStatus = {};
            MOTSPerformanceList.forEach((val) => {
                newStatus[val.statTitle] =
                    val.statTitle === statTitle ? !prevStatus[val.statTitle] : false;
            });
            return newStatus;
        });
    };

    const GetMOTS = async () => {
        const formData = new FormData();
        formData.append("series_id", seriesId);

        const response = await postAPIHandler("manOfTheSeries", formData);
        // console.log("GetMOTS response-->", response.data, response.data.length);
        setMOTS(response.data);
    };

    const getSeriesNews = async (value) => {
        const formData = new FormData();
        formData.append("series_id", seriesId);

        const response = await postAPIHandler(
            "newsBySeriesId",
            formData
        );
        // console.log("upcomingMatchesBySeriesId response-->", response);
        setSeriesNewsList(response.data);
    };

    const TableBodyData = (batsman, columnsWidth, Type) => {
        return (
            <div className="flex justify-between md:text-[16px] text-[12px] md:gap-x-4 gap-x-2">
                {batsman.teams_name && (
                    <span
                        style={{
                            width: columnsWidth + "%",
                        }}
                    >
                        {batsman.teams_short_name}
                    </span>
                )}
                {batsman.matchs && (
                    <span
                        style={{
                            width: columnsWidth + 10 + "%",
                        }}
                    >
                        {batsman.matchs}
                    </span>
                )}

                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={Type === "Bowling" ? "inline-block" : "hidden"}
                >
                    {batsman.over && batsman.over}
                </span>
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                // className={batsman.sixes ? "inline-block" : "hidden"}
                >
                    {batsman.run && batsman.run}
                </span>
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={Type === "Bowling" ? "inline-block" : "hidden"}
                >
                    {batsman.dot_ball && batsman.dot_ball}
                </span>
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={Type === "Bowling" ? "inline-block" : "hidden"}
                >
                    {batsman.wicket && batsman.wicket}
                </span>
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={batsman.economy ? "inline-block" : "hidden"}
                >
                    {batsman.economy && batsman.economy}
                </span>
                {batsman.ball && (
                    <span
                        style={{
                            width: columnsWidth + "%",
                        }}
                    >
                        {batsman.ball}
                    </span>
                )}
                {batsman.out_by && (
                    <span
                        style={{
                            width: columnsWidth + 20 + "%",
                        }}
                    >
                        {batsman.out_by}
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
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={Type === "Batting" ? "inline-block" : "hidden"}

                >
                    {batsman.fours && batsman.fours}
                </span>
                <span
                    style={{
                        width: columnsWidth + "%",
                    }}
                    className={Type === "Batting" ? "inline-block" : "hidden"}
                >
                    {batsman.sixes && batsman.sixes}
                </span>
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
        <div className="series-info">
            {/* Man Of The Series */}
            {MOTS !== undefined && MOTS.length === undefined &&
                <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d] mb-5">
                    <div
                        className="bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[15px] md:px-7 px-3 flex items-center text-white font-medium 
 text-[20px]">
                        <p className="mb-0">Player Of The Series</p>
                    </div>
                    <div className="flex flex-col space-y-2 md:px-7 px-3 pt-4">
                        <div className="flex items-center gap-x-5 gap-y-4 mb-4 flex-wrap">
                            <img
                                src={MOTS.player.image}
                                alt="player"
                                className="md:w-[80px] w-[60px] md:h-[80px] h-[60px] rounded-full object-fit-cover object-top"
                            />
                            <Link
                                className="text-[#fff]  hover:text-[#3ab949]"
                                to={`/player-profiles/${MOTS.player.player_id}`}
                            >
                                <div className="">
                                    <p className="mb-0 text-[28px]">{MOTS.player.name}</p>
                                    <p className="mb-0 text-[#4D4D4D] font-[500] text-[16px]">{MOTS.player.play_role}</p>
                                </div>
                            </Link>
                        </div>
                        {MOTSPerformanceList.map((val, ind) => (
                            <div className="bg-[#242424] pb-4 mb-4 rounded-lg w-[100%] table-wrapper"
                                key={ind}
                            >
                                <div
                                    className="bg-gradient-to-r from-[#39441d] to-[#141815] py-3 px-4 flex justify-between items-center"
                                    style={{ borderRadius: "10px 10px 0px 0px", cursor: "pointer" }}
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
                                    className="overflow-hidden transition-max-height duration-500 ease-in-out"
                                    style={{ maxHeight: 0 }}
                                >
                                    <div className="table-body-wrapper">
                                        <div className="mx-[2%] my-3 table-body-inner-wrapper">
                                            <div className="text-[#ffffff6e] py-md-3 py-1 my-3 px-2 rounded-lg border-2 border-[#252927] Performance-stat-wrapper">
                                                <div className="flex justify-between gap-x-4">
                                                    {val.headerValues.map((headerKey, ind) => (
                                                        <span
                                                            key={ind}
                                                            style={{
                                                                width: GetStatsWidth(val.headerKeysLength) + (headerKey === "Match" ? 10 : headerKey === "Out By" && 20) + "%",
                                                            }}
                                                        >
                                                            {headerKey}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {val.statTitle === "Batting Performance" && (val.dataListName ? (
                                                <>
                                                    {val.dataListName.map((batsman, ind) => (
                                                        <div
                                                            className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                                                            key={ind}
                                                        >
                                                            {TableBodyData(batsman, 100 / val.headerKeysLength, "Batting")}
                                                        </div>
                                                    ))
                                                    }
                                                </>
                                            ) : NoDataFound())}

                                            {val.statTitle === "Bowling Performance" && (val.dataListName ? (
                                                <>
                                                    {val.dataListName.map((batsman, ind) => (
                                                        <div
                                                            className="px-2 border-b-2 border-[#252927] pb-2 my-3"
                                                            key={ind}
                                                        >
                                                            {TableBodyData(batsman, 100 / val.headerKeysLength, "Bowling")}
                                                        </div>
                                                    ))
                                                    }
                                                </>
                                            ) : NoDataFound())}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {/* Latest News */}
            <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div
                    className="bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[15px] md:px-7 px-3 flex items-center text-white font-medium 
 text-[20px]">
                    <p className="mb-0">Latest News</p>
                </div>
                <div className="flex justify-between flex-row flex-wrap gap-y-5 md:px-7 px-3 py-4">
                    {seriesNewsList.length > 0 ? seriesNewsList.map((news, ind) => {
                        return (<div className="bg-[#242424] rounded-[10px] xl:w-[32%] md:w-[49%] cursor-pointer venues-card" key={ind}>
                            <Link className="text-[#fff]" to={`/news/${news.news_id}`}>
                                <div
                                    className="news-img"
                                    style={{
                                        borderRadius: "10px 10px 0px 0px",
                                        height: 250,
                                        overflow: "hidden"
                                    }}
                                >
                                    <img
                                        src={news.image}
                                        alt="news"
                                        className="object-cover object-top h-100"
                                    />
                                </div>
                                <div className="ground-detais-wrapper p-4 px-md-4 px-3">
                                    <p className="mb-2 text-[14px] font-[400] text-[#ffffffaf]">
                                        {news.pub_date}
                                    </p>
                                    <p className="mb-0 text-[20px] font-[400] ">
                                        {news.title}
                                    </p>
                                    <button className="text-[#000] mt-4 px-3 py-2 rounded-full read-news font-[600]">
                                        Read More
                                    </button>
                                </div>
                            </Link>
                        </div>)
                    })
                        : <p className="md:px-7 px-3 text-[16px] text-[red] mb-0 font-[600]">No News Found</p>}

                </div>
            </div>
        </div>

    )
}

export default SeriesInfo
