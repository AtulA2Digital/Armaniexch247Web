import { Box, Grid, Typography } from "@mui/material";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import React, { useState } from "react";

// Footer Logo----------
import FooterLogo from "../../Images/Universal/footer-logo.png";

// Social Icons---------
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const SocialIcon = ({ icon, link, hoverColor }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link
      to={link}
      target="_blank"
      className="px-2"
      style={{ color: "inherit", display: "inline-block" }}
    >
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: hovered ? hoverColor : "inherit",
          transition: "color 0.3s",
        }}
      >
        {icon}
      </span>
    </Link>
  );
};

const Footer = () => {
  const NavigationMenu = [
    { menuName: "Cricket", link: "/cricket" },
    { menuName: "Sports", link: "/sports" },
    { menuName: "Web-Stories", link: "/web-stories" },
    { menuName: "Bollywood", link: "/bollywood" },
    { menuName: "Business", link: "/business" },
    { menuName: "E-Games", link: "/e-games" },
    { menuName: "Entertainment", link: "/entertainment" },
  ];

  const latestPost = [
    {
      menuName:
        "Cristiano Ronaldo’s Al Nassr knocked Out of AFC Champions League 2023-24.",
      link: "#",
    },
    {
      menuName:
        "AIFF 25-member squad for the 2026 FIFA World Cup Qualifiers against Afghanistan",
      link: "#",
    },
    {
      menuName:
        "Virat Kohli is not in controversy during IPL 2024 and he is surprised by the public reaction towards him.",
      link: "#",
    },
  ];

  const knowMore = [
    { menuName: "Terms & Conditions", link: "/terms-Conditions" },
    { menuName: "Privacy Policy", link: "/privacy-and-policy" },
    { menuName: "Disclaimer", link: "/disclaimer" },
  ];

  const FollowUsOnList = [
    {
      title: "Facebook",
      icon: <FacebookRoundedIcon fontSize="large" />,
      link: "https://www.facebook.com/armaniexch247news",
      hoverColor: "#3b5998", // Facebook blue
    },
    {
      title: "Twitter",
      icon: <TwitterIcon fontSize="large" />,
      link: "https://twitter.com/Armaniex247News",
      hoverColor: "#1da1f2", // Twitter blue
    },
    {
      title: "Instagram",
      icon: <InstagramIcon fontSize="large" />,
      link: "https://www.instagram.com/armaniexch247news/",
      hoverColor: "#c13584", // Instagram pink
    },
    {
      title: "Youtube",
      icon: <YouTubeIcon fontSize="large" />,
      link: "https://www.youtube.com/channel/UCcQpD_qoFbi0EixcKvYlz6Q",
      hoverColor: "#ff0000", // YouTube red
    },
    {
      title: "Whatsapp",
      icon: <WhatsAppIcon fontSize="large" />,
      link: "https://wa.link/j1mbds",
      hoverColor: "#25d366", // WhatsApp green
    },
  ];

  return (
    <>
      <Box
        className="top-footer d-flex position-fixed w-100"
        style={{
          zIndex: 99,
        }}
      >
        <Container>
          <Grid container gap={5} className="justify-content-center">
            <Grid
              item
              lg={3.5}
              sm={6}
              xs={11}
              className="d-flex justify-between align-items-center bg-white px-1"
              style={{
                borderRadius: "50px",
                paddingTop: "4px",
                paddingBottom: "1px",
              }}
            >
              <button>
                <Link
                  to="/schedule"
                  className="bg-[#000] border-[#fff] hover:border-[#3ab949] px-3 py-2 text-white d-inline-block"
                  style={{
                    borderRadius: "20px",
                    borderWidth: "0 0 3px 0",
                    fontWeight: 600,
                    minWidth: "100px",
                  }}
                >
                  Schedule
                </Link>
              </button>
              <button>
                <Link
                  to="/series-list"
                  className="bg-[#000] border-[#fff] hover:border-[#3ab949] px-3 py-2 text-white d-inline-block"
                  style={{
                    borderRadius: "20px",
                    borderWidth: "0 0 3px 0",
                    fontWeight: 600,
                    minWidth: "100px",
                  }}
                >
                  Series
                </Link>
              </button>
              <button>
                <Link
                  to="/icc-rankings"
                  className="bg-[#000] border-[#fff] hover:border-[#3ab949] px-3 py-2 text-white d-inline-block"
                  style={{
                    borderRadius: "20px",
                    borderWidth: "0 0 3px 0",
                    fontWeight: 600,
                    minWidth: "100px",
                  }}
                >
                  Rankings
                </Link>
              </button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="footer" className="footer-wrapper py-5">
        <Container>
          <Grid container gap={5} className="zIndex-1">
            <Grid item lg={3.2} md={5.7} sm={5.5} xs={12}>
              <Box className="footer-logo-wrapper">
                <Link to="https://armaniexch247news.com/">
                  <img src={FooterLogo} alt="footer logo" />
                </Link>
              </Box>
              <Typography variant="h3" className="mt-4">
                {" "}
                <span className="yellow-bottom-border">FOLLOW US</span>
              </Typography>
              <Box className="social-icons-wrapper mt-4">
                {FollowUsOnList.map((socialIcon, ind) => (
                  <SocialIcon
                    key={ind}
                    icon={socialIcon.icon}
                    link={socialIcon.link}
                    hoverColor={socialIcon.hoverColor}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item lg={2.5} md={5.7} sm={5.5} xs={12}>
              <Typography variant="h3" className="mb-4">
                <span className="yellow-bottom-border">NAVIGATION</span>
              </Typography>
              {NavigationMenu.map((val, ind) => {
                return (
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                    key={ind}
                    className="text-uppercase footer-menu mb-3"
                  >
                    <ArrowForwardIosSharpIcon
                      style={{
                        color: "#B6FF00",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    />{" "}
                    <Link
                      to={`https://armaniexch247news.com${val.link}`}
                      className="text-white"
                    >
                      {val.menuName}
                    </Link>
                  </Typography>
                );
              })}
            </Grid>
            <Grid item lg={2.5} md={5.7} sm={5.5} xs={12}>
              <Typography variant="h3" className="mb-4">
                <span className="yellow-bottom-border">LATEST POST</span>
              </Typography>

              {latestPost.map((val, ind) => {
                return (
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                    key={ind}
                    className="footer-menu mb-3"
                  >
                    <ArrowForwardIosSharpIcon
                      style={{
                        color: "#B6FF00",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    />
                    <Link to={`${val.link}`} className="text-white">
                      {val.menuName}
                    </Link>
                  </Typography>
                );
              })}
            </Grid>
            <Grid item lg={2.5} md={5.7} sm={5.5} xs={12}>
              <Typography variant="h3" className="mb-4">
                <span className="yellow-bottom-border">KNOW MORE</span>
              </Typography>
              {knowMore.map((val, ind) => {
                return (
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                    key={ind}
                    className="text-uppercase footer-menu mb-3"
                  >
                    <ArrowForwardIosSharpIcon
                      style={{
                        color: "#B6FF00",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    />
                    <Link
                      to={`https://armaniexch247news.com${val.link}`}
                      className="text-white"
                    >
                      {val.menuName}
                    </Link>
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
