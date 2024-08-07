import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "../style.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { postAPIHandler } from "../../../Api/api";

const Squads = () => {
  const { seriesId } = useParams();
  const [seriesSquads, setSeriesSquads] = useState([]);
  // console.log("seriesSquads - ", seriesSquads);
  const [loading, setLoading] = useState(true);
  const [dropdownStatus, setDropdownStatus] = useState({});
  const contentRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      GetSeriesSquads(seriesId);
      setLoading(false);
    }, 1000);
  }, [seriesId]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        if (dropdownStatus[seriesSquads[index]?.team?.name]) {
          ref.style.maxHeight = `${ref.scrollHeight}px`;
        } else {
          ref.style.maxHeight = "0px";
        }
      }
    });
  }, [dropdownStatus, seriesSquads]);

  const handleDropdownToggle = (teamName) => {
    setDropdownStatus((prevStatus) => {
      const newStatus = {};
      seriesSquads.forEach((val) => {
        newStatus[val.team.name] =
          val.team.name === teamName ? !prevStatus[val.team.name] : false;
      });
      return newStatus;
    });
  };

  const GetSeriesSquads = async (val) => {
    const formData = new FormData();
    formData.append("series_id", val);
    const response = await postAPIHandler("squadsBySeriesId", formData);
    setSeriesSquads(response.data);
  };

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );
  }

  return (
    <>
      {seriesSquads.length > 0 ? (
        seriesSquads.map((val, ind) => (
          <div
            className="bg-[#242424] pb-4 md:mb-5 mb-4 rounded-lg w-[100%] group"
            key={ind}
          >
            <div
              className="bg-gradient-to-r from-[#39441d] to-[#141815] py-2 px-4 flex justify-between items-center"
              style={{ borderRadius: "10px 10px 0 0", cursor: "pointer" }}
              onClick={() => handleDropdownToggle(val.team.name)}
            >
              <div className="flex items-center justify-center gap-3 team-details">
                <img
                  src={val.team.flag}
                  alt="team img"
                  className="rounded-full w-[40px] h-[40px] object-cover"
                />
                <p className="team-name mb-0 text-[18px] font-[600]">
                  {val.team.name}
                </p>
              </div>
              <div className="toggle-icon-wrapper">
                {dropdownStatus[val.team.name] ? (
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
              <div className="mx-[2%] mt-3">
                <div className="players-data mt-4 flex justify-center flex-wrap gap-y-5">
                  {val.player.map((data, ind) => (
                    <div
                      className="player-details text-center xl:w-[16.66%] md:w-[24%] w-[49%]"
                      key={ind}
                    >
                      <Link
                        to={`/player-profiles/${data.player_id}`}
                        className="text-[#fff] hover:text-[#3ab949]"
                      >
                        <img
                          src={data.image}
                          alt="team img"
                          className="rounded-full w-[80px] h-[80px] object-cover mx-auto object-top"
                        />
                        <h5 className="team-name mt-2 mb-0">
                          {data.name}
                        </h5>
                        <p className="text-[14px] text-[#777777]">
                          {data.play_role}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )
        : (
          <div className="text-center text-white py-4 my-4 bg-[#242424] w-50 mx-auto rounded-lg">
            No Data Found
          </div>
        )
      }
    </>
  );
};

export default Squads;
