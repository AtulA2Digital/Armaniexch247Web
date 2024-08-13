import React, { useState } from "react";
import Ranking from "../../Components/Ranking";
import { Helmet } from "react-helmet";

const ICC_Rankings = () => {
  const [ranking, setRanking] = useState("Men");
  const RankingData = [{ typename: "Men" }, { typename: "Women" }]
  return (
    <>
      <Helmet>
        <title>Match Rankings | Up-to-Date Sports Rankings at Armaniexch247news</title>
        <meta name="description" content="Stay ahead with the latest match rankings at Armaniexch247news. Get real-time updates, detailed insights, and expert analysis on your favorite teams and players." />
      </Helmet>
      <div className="ranking-tabs xl:w-[60%] lg:w-[80%] w-[100%] mx-auto">
        <div className="pt-14 page-info-tabs lg:space-x-4 space-x-2 pb-4 border-b-2 border-[#ffffff14] mx-xl-0 mx-4">
          {RankingData.map((val, ind) => {
            return (<span
              onClick={() => {
                setRanking(val.typename);
              }}
              style={{
                backgroundColor: val.typename === ranking ? "#3AB949" : "#fff",
                color: val.typename === ranking ? "#fff" : "#000",
              }}
              className={`info-hover bg-[#00000057] hover:bg-[#000000A3] px-6 py-2 rounded-[32px] hover:text-[#3AB949] cursor-pointer font-[600]`}
            >
              {val.typename}
            </span>)
          })}
        </div>
      </div>
      <Ranking RankingFor={ranking} />
    </>
  );
};

export default ICC_Rankings;
