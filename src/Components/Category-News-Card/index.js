import React from "react";
import PostImage from "../../Images/Cards/post-img.webp";
import { Box, Typography } from "@mui/material";

const CategoryNewsCard = ({
  cardTitle,
  cardDate,
  cardDesc,
  cardLink,
  cardType,
}) => {
  return (
    <Box
      className={`news-category card-wrapper p-2 mb-2 bg-${
        cardType !== "Category" ? "black" : "gray"
      } rounded-3`}
    >
      <Box className="post-img-wrapper">
        <img src={PostImage} alt="Post Image" className=" rounded-2" />
      </Box>
      <Typography variant="h5" component="h5" className="mt-3  font-600">
        {cardTitle}
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        className="mb-2 text-yellow font-500"
      >
        {cardDate}
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        className="mb-3 text-gray font-500"
      >
        {cardDesc}
      </Typography>
    </Box>
  );
};

export default CategoryNewsCard;
