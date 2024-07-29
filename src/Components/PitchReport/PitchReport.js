import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
// weather Icons------------
import Thermometer from "../../Images/Cricket-Pages/thermometer.png";
import Humidity from "../../Images/Cricket-Pages/humidity.png";
import Wind_Speed from "../../Images/Cricket-Pages/wind-speed.png";
import Rainny from "../../Images/Cricket-Pages/rainny.png";
import Wind_Direction from "../../Images/Cricket-Pages/Wind-Direction.png";

// Ground Icons----------
import Capacity from "../../Images/Cricket-Pages/Grounds/capacity.png";
import Ends from "../../Images/Cricket-Pages/Grounds/Ends.png";
import Known_As from "../../Images/Cricket-Pages/Grounds/know as.png";
import Location from "../../Images/Cricket-Pages/Grounds/location.png";
import Opened from "../../Images/Cricket-Pages/Grounds/opened.png";
import Profile from "../../Images/Cricket-Pages/Grounds/profile.png";
import Timezone from "../../Images/Cricket-Pages/Grounds/timezone.png";
import Floodlights from "../../Images/Cricket-Pages/Grounds/floodlight.png";
import { postAPIHandler } from "../../Api/api";


const PitchReport = () => {
  const { matchId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  // console.log("matchInfo - ", matchInfo && matchInfo.data);
  const [venueID, setVenueID] = useState(null);
  // console.log("venueID - ", venueID);
  const [venueDetails, setVenueDetails] = useState(null);
  // console.log("venueDetails - ", venueDetails);
  const [loading, setLoading] = useState(false);

  // Fetch match details
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetMatchInfo(matchId);
    }, 1000);
  }, [matchId]);

  // Fetch venue details
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetVenueInfo(venueID);
    }, 1000);
  }, [venueID]);

  if (loading)
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );

  // Match Info API-----------------
  const GetMatchInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("matchInfo", formData);
    // console.log("response-->", response);
    setMatchInfo(response);
    setVenueID(response.data.venue_id);
    setLoading(false);
  };

  // Venue Info-----------
  const GetVenueInfo = async (value) => {
    const formData = new FormData();
    formData.append("venue_id", value);

    const response = await postAPIHandler("venuesDetail", formData);
    // console.log("venuesDetail response-->", response);
    setVenueDetails(response.data);
    setLoading(false);
  };
  return (
    <>
      {matchInfo && (
        <div className="md:my-6 py-8 mx-4 gap-6 d-flex flex-col">
          {/* Venue Scoring Pattern */}
          {/* <div className="lg:w-[49%] md:w-[48%]">
            <div className="bg-[#181919] rounded-[12px] p-4 mb-4">
              <div className="flex justify-between items-center">
                <p className="text-white text-[20px] font-semibold pb-3">
                  Pitch Scoring Pattern
                </p>
              </div>
              <div className="flex items-center justify-between px-3 mb-3 rounded-[6px] text-[#777777] font-medium bg-[#232525] py-2">
                <p className="mb-0">Batting Avg Score</p>
                <p className="mb-0">( 1st Inning )</p>
              </div>
              <div className="flex items-center justify-between px-3 mb-3 rounded-[6px] text-[#777777] font-medium bg-[#232525] py-2">
                <p className="mb-0">Batting Avg Score</p>
                <p className="mb-0">( 2nd Inning ) </p>
              </div>
            </div>
          </div> */}

          {/* Pace Spin */}
          {/* <div className="lg:w-[49%] md:w-[48%]">
            <div className="bg-[#181919] border-2  rounded-[18px] border-[#181919] py-4 md:px-7 px-3 ">
              <p className="text-white text-[20px] font-semibold pb-2">
                Pace VS Spin on Pitch{" "}
              </p>

              <div className="flex justify-between">
                <p className="text-[#C9C7C7] text-sm">
                  Pace{" "}
                  <span className="text-[#E1282B]">
                    ( {matchInfo.data.pace_spin.pace_wkt} wicket )
                  </span>
                </p>
                <p className="text-[#C9C7C7] text-sm">
                  Spin{" "}
                  <span className="text-[#3AB949]">
                    ( {matchInfo.data.pace_spin.spin_wkt} wicket )
                  </span>
                </p>
              </div>

              <div
                className="flex items-center"
                style={{
                  width: "100%",
                  height: "12px",
                  backgroundColor: "#E1282B33",
                  borderRadius: "10px",
                  overflow: "hidden",
                  margin: "20px 10px 0 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    transition: "width 0.3s ease",
                    width: `${matchInfo.data.pace_spin.pace_percent}%`,
                    backgroundColor: "#e1282b61",
                  }}
                ></div>
                <div
                  style={{
                    height: "100%",
                    transition: "width 0.3s ease",
                    width: `${matchInfo.data.pace_spin.spin_percent}%`,
                    backgroundColor: "#3ab94987",
                  }}
                ></div>
              </div>
              <div className="flex justify-between pt-2">
                <p className="text-[#C9C7C7] text-sm">
                  {matchInfo.data.pace_spin.pace_percent}%
                </p>
                <p className="text-[#C9C7C7] text-sm">
                  {" "}
                  {matchInfo.data.pace_spin.spin_percent}%
                </p>
              </div>
            </div>
          </div> */}

          {/* Wheather */}
          {matchInfo.data.venue_weather && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div
                  className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0">Weather</p>
                </div>

                <div className="py-3">
                  <div className="flex px-4 flex-wrap gap-4">
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Thermometer} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.temp_c}°C
                      </p>
                      <p className="text-[#4D4D4D] text-sm mb-0">
                        Ahmedabad, India
                      </p>
                      <p className="text-[#4D4D4D] text-sm">Hazy</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Humidity} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.humidity}%
                      </p>
                      <p className=" text-[#777777] text-sm">(Humidity)</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Wind_Speed} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.wind_kph}KPH
                      </p>
                      <p className=" text-[#777777] text-sm">(Wind Speed)</p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Rainny} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.cloud}%
                      </p>
                      <p className=" text-[#777777] text-sm">
                        ({matchInfo.data.venue_weather.weather})
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:w-[30%] md:w-[45%] w-[100%]">
                      <img className="w-[56px] h-[56px]" src={Wind_Direction} />
                      <p className="text-[18px] font-bold text-white mt-2 mb-1">
                        {matchInfo.data.venue_weather.wind_dir}
                      </p>
                      <p className=" text-[#777777] text-sm">
                        (Wind Direction)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ground Picture */}
          {venueDetails && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div
                  className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0">Ground Picture</p>
                </div>

                <div className="">
                  <img
                    src={venueDetails.image}
                    alt="ground image"
                    className="lg:h-[400px] xl:object-contain object-cover"
                    style={{ borderRadius: "0 0 16px 16px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Ground Details */}
          {venueDetails && (
            <div className={`w-100`}>
              <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
                <div
                  className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
         text-[20px]"
                >
                  <p className="mb-0">Ground Details</p>
                </div>

                <div className="py-4">
                  <div className="flex px-4 flex-wrap gap-4 justify-between">
                    {/* capacity */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.capacity}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Capacity)</p>
                    </div>
                    {/* curator */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Profile} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.curator}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Curator)</p>
                    </div>
                    {/* ends */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Ends} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.ends}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Ends)</p>
                    </div>
                    {/* floodlights */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Floodlights} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.floodlights}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Floodlights)</p>
                    </div>
                    {/* home_to */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.home_to}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Home)</p>
                    </div>
                    {/* known_as */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Known_As} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.known_as}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Known As)</p>
                    </div>
                    {/* location */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Location} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.location}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Location)</p>
                    </div>
                    {/* name */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.name}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Ground Name)</p>
                    </div>
                    {/* opened */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Opened} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.opened}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Opened)</p>
                    </div>
                    {/* time_zone */}
                    <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                      <img className="w-[56px] h-[56px]" src={Timezone} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        {venueDetails.time_zone}
                      </p>
                      <p className="text-[#4D4D4D] text-sm">(Time Zone)</p>
                    </div>
                    {/* About */}
                    <div className="flex flex-col justify-start items-center w-100">
                      <img className="w-[56px] h-[56px]" src={Capacity} />
                      <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                        <span className="border-b-2 border-[#39441d] pb-1">
                          {" "}
                          About
                        </span>
                      </p>
                      <div className="text-[#fff] text-md">
                        {venueDetails && venueDetails.profile ? (
                          <div
                            className="mt-2 text-justify md:px-5"
                            dangerouslySetInnerHTML={{
                              __html: venueDetails.profile,
                            }}
                          />
                        ) : (
                          "--"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PitchReport;
