import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Squads_Icon from "../../Images/Cricket-Pages/team-white.png";
import { postAPIHandler } from "../../Api/api";

const Squads = () => {
  const { matchId } = useParams();
  const [teams, setTeams] = useState(null);
  // console.log("teams - ", teams);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      GetSquadInfo(matchId);
    }, 1000);
  }, [matchId]);

  if (loading) {
    return (
      <Box className="px-3 py-4 my-5 text-center">
        <CircularProgress style={{ color: "#3ab949" }} />
      </Box>
    );
  }

  // Squad Info-----------
  const GetSquadInfo = async (value) => {
    const formData = new FormData();
    formData.append("match_id", value);

    const response = await postAPIHandler("squadsByMatchId", formData);
    // console.log("squadsByMatchId response-->", response);
    setTeams(response.data);
    setLoading(false);
  };

  const renderTeam = (team) => (
    <div className="bg-[#242424] hover:bg-[#39441dad] px-4 py-[40px] rounded-[12px] sm:w-[49%] squad-wrapper group md:mb-0 mb-[40px]">
      <h3 className="text-[#76932c] text-[18px] font-bold mb-4 text-center group-hover:text-white">
        {team.name} ({team.short_name})
      </h3>
      <div className="flex flex-wrap">
        {team.player.map((player) => (
          <div key={player.player_id} className="xl:w-[50%] w-[100%] p-2">
            <Link
              className="text-[#fff]"
              to={`/player-profiles/${player.player_id}`}
            >
              <div className="bg-[#181919] hover:bg-[#3ab94930] xl:px-4 px-[20%] py-4 rounded-[8px] flex items-center ">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-[40px] h-[40px] rounded-full mr-2 object-fit-cover object-top"
                />
                <div>
                  <p className="text-[#C9C7C7] text-[14px] font-medium mb-0">
                    {player.name}
                  </p>
                  <p className="text-[#757575] text-[12px] mb-0">
                    {player.play_role}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {teams && teams.length === undefined ? (
        <div className="md:my-6 py-8 mx-4 bg-[#000000] rounded-[18px] ">
          <div className="rounded-lg py-3 mb-5 sm:w-[90%] mx-auto" style={{ background: "linear-gradient(90.3deg, rgb(175, 107, 22) 0.16%, rgb(248, 223, 101) 50.89%, rgb(220, 154, 43) 101.62%)" }}>
            <p className="text-black md:text-[30px] text-[24px] font-semibold px-4 flex items-center justify-center gap-x-4 mb-0">
              <img
                src={Squads_Icon}
                alt="squads"
                className="w-[60px]  border-2 rounded-full border-[#fff] p-2 bg-black"
              />
              Squads
            </p>
          </div>
          <div className="flex flex-wrap justify-between">
            {teams.team_a && renderTeam(teams.team_a)}
            {teams.team_b && renderTeam(teams.team_b)}
          </div>
        </div>
      ) : (
        <div className="text-center text-white py-4 my-10 bg-[#242424] w-50 mx-auto rounded-lg">
          No Data Found
        </div>
      )}
    </>
  );
};

export default Squads;
