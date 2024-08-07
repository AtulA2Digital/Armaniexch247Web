import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postAPIHandler } from "../../Api/api";

const News_Details = () => {
  const { newsId } = useParams();
  const [newsDetails, setNewsDetails] = useState([]);
  // console.log("newsDetails - ", newsDetails);

  const getNewsDetails = async (value) => {
    const formData = new FormData();
    formData.append("news_id", value);

    const response = await postAPIHandler("seriesNewsDetail", formData);
    setNewsDetails(response.data);
  };

  useEffect(() => {
    getNewsDetails(newsId);
  }, [newsId]);
  return (
    <>
      {newsDetails.length !== 0 && (
        <div className="xl:w-[90%] w-[96%] mx-auto px-2 md:mt-10 py-7">
          <div className="mb-4">
            <img
              src={newsDetails.image}
              alt=""
              className="xl:h-[600px] md:h-[400px] object-cover object-top"
            />
          </div>
          <p className="mb-2 text-[18px] font-[400] text-[#ffffffaf]">
            {newsDetails.pub_date}
          </p>
          <h1>{newsDetails.title}</h1>
          <div
            className="mt-md-5 mt-4 text-justify font-[18px]"
            dangerouslySetInnerHTML={{
              __html: newsDetails.content,
            }}
          />
        </div>
      )}
    </>
  );
};

export default News_Details;
