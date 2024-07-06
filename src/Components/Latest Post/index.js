import React, { useEffect } from "react";
import PostImage from "../../Images/Cards/post-img.webp";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const LatestPost = () => {
  return (
    <Box className="latest-post card-wrapper p-2 mb-2 bg-gray rounded-2">
      <Box className="post-img-wrapper">
        <img src={PostImage} alt="Post Image" />
      </Box>
      <Typography variant="h4" component="h4" className="mt-3 mb-2">
        Williamson to guide as a captain for New Zealand team at ICC T20 World
        Cup 2024
      </Typography>
      <Typography variant="h5" component="h5" className="mb-3 text-gray">
        Captain Williamson to lead the team in the upcoming sixth Twenty20 World
        Cup in June
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        className="mb-3 text-yellow text-uppercase"
      >
        {/* <img src="" alt="" className="pe-3" /> */}
        <CalendarMonthIcon
          style={{
            color: "#B6FF00",
          }}
          fontSize="small"
          className="me-1"
        />{" "}
        April 29, 2024
      </Typography>
    </Box>
  );
};

export default LatestPost;
