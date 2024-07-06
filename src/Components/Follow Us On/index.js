import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

// Social Icons---------
import FacebookRoundedIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

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

const FollowUsOn = () => {
  const FollowUsOnList = [
    {
      title: "Facebook",
      icon: <FacebookRoundedIcon fontSize="large" />,
      link: "#",
      hoverColor: "#3b5998", // Facebook blue
    },
    {
      title: "Twitter",
      icon: <TwitterIcon fontSize="large" />,
      link: "#",
      hoverColor: "#1da1f2", // Twitter blue
    },
    {
      title: "Instagram",
      icon: <InstagramIcon fontSize="large" />,
      link: "#",
      hoverColor: "#c13584", // Instagram pink
    },
    {
      title: "Youtube",
      icon: <YouTubeIcon fontSize="large" />,
      link: "#",
      hoverColor: "#ff0000", // YouTube red
    },
    {
      title: "Whatsapp",
      icon: <WhatsAppIcon fontSize="large" />,
      link: "#",
      hoverColor: "#25d366", // WhatsApp green
    },
  ];

  return (
    <Box className="trending-now card-wrapper my-2 pb-2 bg-gray rounded-2">
      <Box className="trending-now-title-wrapper p-2 bg-white text-black">
        <Typography
          variant="h5"
          component="h5"
          className="font-600 text-uppercase text-center"
        >
          Follow Us On
        </Typography>
      </Box>
      <Box className="social-icons-wrapper my-4 text-center d-flex flex-wrap row-gap-3">
        {FollowUsOnList.map((socialIcon, ind) => (
          <SocialIcon
            key={ind}
            icon={socialIcon.icon}
            link={socialIcon.link}
            hoverColor={socialIcon.hoverColor}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FollowUsOn;
