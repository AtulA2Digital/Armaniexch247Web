import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../Api/api";

// Ground Icons----------
import Capacity from "../../Images/Cricket-Pages/Grounds/capacity.png";
import Ends from "../../Images/Cricket-Pages/Grounds/Ends.png";
import Known_As from "../../Images/Cricket-Pages/Grounds/know as.png";
import Location from "../../Images/Cricket-Pages/Grounds/location.png";
import Opened from "../../Images/Cricket-Pages/Grounds/opened.png";
import Profile from "../../Images/Cricket-Pages/Grounds/profile.png";
import Timezone from "../../Images/Cricket-Pages/Grounds/timezone.png";
import Floodlights from "../../Images/Cricket-Pages/Grounds/floodlight.png";

const Venue_Details = () => {
  const { venueId } = useParams();
  const [venueDetails, setvenueDetails] = useState([]);
  // console.log("venueDetails - ", venueDetails);

  const getvenueDetails = async (value) => {
    const formData = new FormData();
    formData.append("venue_id", value);

    const response = await postAPIHandler("venuesDetail", formData);
    setvenueDetails(response.data);
  };

  useEffect(() => {
    getvenueDetails(venueId);
  }, [venueId]);

  return (
    <>
      {venueDetails.length !== 0 && <div className="xl:w-[90%] w-[96%] mx-auto px-2 md:mt-10 py-7">
        <div className="bg-gradient-to-r from-[#39441d] to-[#141815] rounded-lg py-3 mb-5 sm:w-[90%] mx-auto">
          <p className="text-white md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
            <img
              src={venueDetails.image}
              alt="squads"
              className="w-[50px] h-[50px] border-1 rounded-full border-[#fff] p-1"
            />
            {venueDetails.name}
          </p>
        </div>
        <div className="w-100 mb-10">
          <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
            <div
              className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
 text-[20px]"
            >
              <p className="mb-0">Ground Picture</p>
            </div>
            <div className="">
              <img
                alt="ground"
                className="lg:h-[400px] xl:object-contain object-cover"
                src={venueDetails.image}
                style={{ borderRadius: "0px 0px 16px 16px" }}
              />
            </div>
          </div>
        </div>
        <div className="w-100">
          <div className="bg-[#000000] border-2 rounded-[18px] border-[#39441d]">
            <div
              className=" bg-gradient-to-r from-[#39441d] to-[#141815] w-[100%] py-3 rounded-t-[12px] md:px-7 px-3 flex items-center text-white font-medium 
 text-[20px]"
            >
              <p className="mb-0">Ground Details</p>
            </div>
            <div className="py-4">
              <div className="flex px-4 flex-wrap gap-4 justify-between">
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Capacity}
                    alt="capacity"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.capacity}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Capacity)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Profile}
                    alt="curator"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.curator}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Curator)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Ends}
                    alt="ends"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.ends}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Ends)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Floodlights}
                    alt="floodlights"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.floodlights}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Floodlights)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Capacity}
                    alt="home"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.home_to}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Home)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Known_As}
                    alt="known_as"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.known_as}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Known As)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Location}
                    alt="location" />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.location}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Location)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Capacity}
                    alt="name"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.name}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Ground Name)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Opened}
                    alt="opened"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.opened}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Opened)</p>
                </div>
                <div className="flex flex-col justify-start items-center lg:w-[18%] md:w-[30%] w-[45%]">
                  <img
                    className="w-[56px] h-[56px]"
                    src={Timezone}
                    alt="timezone"
                  />
                  <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                    {venueDetails.time_zone}
                  </p>
                  <p className="text-[#4D4D4D] text-sm">(Time Zone)</p>
                </div>
                {venueDetails.profile.length > 0 &&
                  <div className="flex flex-col justify-start items-center w-100">
                    <img
                      className="w-[56px] h-[56px]"
                      src={Capacity}
                      alt="about"
                    />
                    <p className="text-[16px] font-bold text-white mt-2 mb-1 text-center">
                      <span className="border-b-2 border-[#39441d] pb-1">
                        {" "}
                        About
                      </span>
                    </p>
                    <div
                      className="text-[#fff] text-md"
                      dangerouslySetInnerHTML={{
                        __html: venueDetails.profile,
                      }}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>}

    </>
  );
};

export default Venue_Details;
