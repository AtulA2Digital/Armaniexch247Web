import React, { useState } from "react";
import Ranking from "../../Components/Ranking";

const ICC_Rankings = () => {
  const [ranking, setRanking] = useState("Men");
  return (
    <>
      <div className="ranking-tabs md:px-7 sm:px-3 xl:w-[60%] lg:w-[80%] w-[100%] mx-auto">
        <div className="pt-14 page-info-tabs lg:space-x-4 space-x-2 pb-4 border-b-2 border-[#ffffff14] mx-xl-0 mx-4">
          <span
            onClick={() => {
              setRanking("Men");
            }}
            style={{
              backgroundColor: ranking === "Men" ? "#3AB949" : "#fff",
              color: ranking === "Men" ? "#fff" : "#000",
            }}
            className={`info-hover bg-[#00000057] hover:bg-[#000000A3] px-6 py-2 rounded-[32px] hover:text-[#3AB949] cursor-pointer font-[600]`}
          >
            Men
          </span>
          <span
            onClick={() => {
              setRanking("Women");
            }}
            style={{
              backgroundColor: ranking === "Women" ? "#3AB949" : "#fff",
              color: ranking === "Women" ? "#fff" : "#000",
            }}
            className={`info-hover bg-[#00000057] hover:bg-[#000000A3] px-6 py-2 rounded-[32px] hover:text-[#3AB949] cursor-pointer font-[600]`}
          >
            Women
          </span>
        </div>
      </div>
      <Ranking RankingFor={ranking} />
    </>
  );
};

export default ICC_Rankings;
