import React, { useEffect, useState } from "react";
import { postAPIHandler } from "../../../Api/api";
import { Link, useParams } from "react-router-dom";

const Venues = () => {
    const { seriesId } = useParams();
    const [venuesList, setVenuesList] = useState([]);
    // console.log("venuesList - ", venuesList);

    useEffect(() => {
        getVenuesList();
    }, [seriesId]);

    const getVenuesList = async (value) => {
        const formData = new FormData();
        formData.append("series_id", seriesId);

        const response = await postAPIHandler("venuesBySeriesId", formData);
        // console.log("venuesBySeriesId response-->", response);
        setVenuesList(response.data);
    };
    return (
        <div className="flex justify-between flex-row flex-wrap gap-y-5">
            {venuesList.length > 0 ? venuesList.map((venue, ind) => {
                return (
                    <div className="bg-[#242424] rounded-[10px] xl:w-[32%] md:w-[49%] w-[100%] cursor-pointer venues-card" key={ind}>
                        <Link
                            className="text-[#fff]"
                            to={`/venue-details/${venue.id}`}
                        >
                            <img
                                src={venue.image}
                                alt="venue"
                                className="object-cover"
                                style={{ borderRadius: "10px 10px 0px 0px", maxHeight: 190 }}
                            />
                            <div className="ground-detais-wrapper p-4">
                                <p className="mb-0 text-[18px] font-[600]">
                                    {venue.name}
                                </p>
                                <p className="mb-0 text-[16px] font-[400] text-[#ffffffaf]">
                                    {venue.place}
                                </p>
                            </div>
                        </Link>
                    </div>
                )

            })
                : (
                    <div className="text-center text-white py-4 my-4 bg-[#242424] md:w-[50%] w-[75%] mx-auto rounded-lg">
                        No Data Found
                    </div>
                )
            }
        </div>
    );
};

export default Venues;
