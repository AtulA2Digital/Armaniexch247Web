import React, { useEffect } from "react";
import PostImage from "../../Images/Cards/post-img.webp";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TrendingNow = () => {
  const trendingNowNews = [
    {
      title:
        "Williamson to guide as a captain for New Zealand team at ICC T20 World Cup 2024",
      date: "April 29, 2024",
      desc: "Captain Williamson to lead the team in the upcoming sixth Twenty20 World Cup in June",
      link: "#",
    },
    {
      title:
        "In the IPL 2024 match between DC and GT, Shubman Gill smashes Virat Kohli’s record and achieves a unique milestone",
      date: "April 29, 2024",
      desc: "Captain Williamson to lead the team in the upcoming sixth Twenty20 World Cup in June",
      link: "#",
    },
    {
      title: "Asian U-20 Javelin Champion grabbed by Deepanshu",
      date: "April 29, 2024",
      desc: "Captain Williamson to lead the team in the upcoming sixth Twenty20 World Cup in June",
      link: "#",
    },
    {
      title:
        "Leeds’ Promotion Push Back On Track After Seven-Goal Thriller At Middlesbrough",
      date: "April 29, 2024",
      desc: "Captain Williamson to lead the team in the upcoming sixth Twenty20 World Cup in June",
      link: "#",
    },
  ];
  return (
    <Box className="trending-now card-wrapper pb-2 bg-gray rounded-2">
      <Box className="trending-now-title-wrapper p-2 bg-white text-black">
        <Typography
          variant="h5"
          component="h5"
          className="font-600 text-uppercase text-center"
        >
          Trending Now
        </Typography>
      </Box>
      {trendingNowNews.map((news, ind) => {
        return (
          <Box className="trending-now-body px-2" key={ind}>
            <Typography variant="h5" component="h5" className="mt-3  font-600">
              {news.title}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              className="mb-2 text-yellow font-500"
            >
              {news.date}
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              className="mb-3 text-gray font-500"
            >
              {news.desc}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TrendingNow;
