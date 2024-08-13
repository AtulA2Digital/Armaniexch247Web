import React, { useEffect } from "react";
import Layout from "../../LayoutWrapper/AdminLayout";
import Container from "react-bootstrap/Container";
import { Box, Grid, Typography } from "@mui/material";
import LatestPost from "../../Components/Latest Post";
import TrendingNow from "../../Components/Trending Now";
import HomeBanner from "../../Images/Bannner/home-banner.webp";
import FollowUsOn from "../../Components/Follow Us On";
import CategoryNewsCard from "../../Components/Category-News-Card";
import MatchInfo from "../../Components/Match Info";
import CricketCard from "../../Components/Cricket Card";
import { Helmet } from 'react-helmet';

const Home = () => {
  const cricketNewsList = [
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
  ];

  const shortNewsList = [
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
  ];
  return (
    <>
      <Helmet>
        <title>Test New Page</title>
        <meta name="description" content="This is the description of my page" />
        <meta name="keywords" content="React, Helmet, SEO, Meta Tags" />
        <link rel="canonical" href="https://www.example.com/my-page" />
      </Helmet>
      <CricketCard />
      <Container className="p-0 my-5">
        <Box className="Cards-section">
          <Grid container gap={1}>
            {/* Left Block---------------------------------- */}
            <Grid item lg={9} sm={9}>
              <Grid
                container
                gap={2}
                className="mb-4 flex-md-row flex-column-reverse"
              >
                {/* Trending News-------------------------------------- */}
                <Grid item lg={3.5} sm={3.6}>
                  <TrendingNow />
                  <FollowUsOn />
                </Grid>
                {/* Latest Post----------------------------- */}
                <Grid item lg={8.2} sm={8}>
                  <Box className="page-banner mb-4">
                    <img src={HomeBanner} alt="Home Banner" />
                  </Box>
                  <Typography
                    component="h2"
                    variant="h2"
                    className="lates-post-title text-uppercase mb-3"
                  >
                    <span className="yellow-bottom-border">Latest Post</span>
                  </Typography>
                  <LatestPost />
                  <LatestPost />
                </Grid>
              </Grid>

              {/* Cricket News------------------ */}
              <Grid container gap={1} className="mb-4">
                <Grid item xs={12}>
                  <Typography
                    component="h2"
                    variant="h2"
                    className="lates-post-title text-uppercase mb-2"
                  >
                    <span className="yellow-bottom-border">Cricket</span>
                  </Typography>
                </Grid>

                {cricketNewsList.map((news, ind) => {
                  return (
                    <Grid
                      item
                      lg={3.9}
                      sm={5.9}
                      className="bg-gray rounded-3"
                      key={ind}
                    >
                      <CategoryNewsCard
                        cardTitle={news.title}
                        cardDate={news.date}
                        cardDesc={news.desc}
                        cardLink={news.link}
                        cardType="Category"
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {/* Football News------------------ */}
              <Grid container gap={1} className="mb-4">
                <Grid item xs={12}>
                  <Typography
                    component="h2"
                    variant="h2"
                    className="lates-post-title text-uppercase mb-2"
                  >
                    <span className="yellow-bottom-border">Football</span>
                  </Typography>
                </Grid>

                {cricketNewsList.map((news, ind) => {
                  return (
                    <Grid
                      item
                      lg={3.9}
                      sm={5.9}
                      className="bg-gray rounded-3"
                      key={ind}
                    >
                      <CategoryNewsCard
                        cardTitle={news.title}
                        cardDate={news.date}
                        cardDesc={news.desc}
                        cardLink={news.link}
                        cardType="Category"
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {/* Bollywood News------------------ */}
              <Grid container gap={1} className="mb-4">
                <Grid item xs={12}>
                  <Typography
                    component="h2"
                    variant="h2"
                    className="lates-post-title text-uppercase mb-2"
                  >
                    <span className="yellow-bottom-border">Bollywood</span>
                  </Typography>
                </Grid>

                {cricketNewsList.map((news, ind) => {
                  return (
                    <Grid
                      item
                      lg={3.9}
                      sm={5.9}
                      className="bg-gray rounded-3"
                      key={ind}
                    >
                      <CategoryNewsCard
                        cardTitle={news.title}
                        cardDate={news.date}
                        cardDesc={news.desc}
                        cardLink={news.link}
                        cardType="Category"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            {/* Right Sidebar----------------------------------- */}
            <Grid item lg={2.9} sm={2.8}>
              <Box className="shortNews p-3 mb-2 bg-gray">
                <Grid container gap={1} className="mb-5">
                  <Grid item xs={12}>
                    <Typography
                      component="h3"
                      variant="h3"
                      className="short-news-title text-uppercase mb-3"
                    >
                      <span className="yellow-bottom-border">Short News</span>
                    </Typography>
                  </Grid>

                  {shortNewsList.map((news, ind) => {
                    return (
                      <Grid item lg={12} key={ind}>
                        <CategoryNewsCard
                          cardTitle={news.title}
                          cardDate={news.date}
                          cardDesc={news.desc}
                          cardLink={news.link}
                          cardType="Short News"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              {/* <ShortNews /> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
