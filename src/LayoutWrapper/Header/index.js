import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.css";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CampaignIcon from "@mui/icons-material/Campaign";
import ListIcon from "@mui/icons-material/List";

// Logo------------
import Logo from "../../Images/Universal/white-logo.png";
import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [iconColor, setIconColor] = useState("#fff");
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const menuList = [
    { menuName: "Cricket", link: "/cricket" },
    { menuName: "Sports", link: "/sports" },
    { menuName: "Web-Stories", link: "/webstories" },
    { menuName: "Bollywood", link: "/bollywood" },
    { menuName: "Business", link: "/business" },
    { menuName: "E-Games", link: "/e-games" },
  ];
  // Morquee Effect---------------------------
  useEffect(() => {
    const handleResize = () => {
      const newColor = window.innerWidth <= 1200 ? "#000" : "#fff"; // Change color for mobile
      setIconColor(newColor);
    };

    // Set initial color on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Change News-------------------------------

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % topNews.length);
    }, 5000); // Change news every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const topNews = [
    "Leeds' Promotion Push Back On Track After Seven-Goal Thriller At Middlesbrough",
    "Feminism f**ked up society, women should be independent but to a certain extent: Nora",
    "Fans threw a chicken wing onto the G1C court for some reason during the King's loss",
    "Indian men’s and women’s teams ranked 2nd in FIH Hockey 5s ranking",
  ];

  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-dark mb-3 header-nav header-bottom-border"
        >
          <Container>
            <Link
              to="https://armaniexch247news.com/"
              className="header-logo  p-0"
            >
              <img src={Logo} className="w-[150px] lg:w-[270px]" alt="logo" />
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              {/* <IconButton className=""> */}
              <ListIcon style={{ color: "#fff", fontSize: "50px" }} />
              {/* </IconButton> */}
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              // className="bg-black text-white"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="font-600"
                >
                  Armani Exch247 News
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="gap-5">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {menuList.map((val, ind) => {
                    return (
                      <Nav.Link
                        href={`https://armaniexch247news.com${val.link}`}
                        className="nav-menu bg-white text-black font-500 text-uppercase"
                        key={ind}
                      >
                        {val.menuName}
                      </Nav.Link>
                    );
                  })}
                </Nav>
                {/* <Box>
                  <IconButton className="p-0 pe-1">
                    <SearchIcon
                      style={{
                        color: iconColor,
                      }}
                      fontSize="large"
                    />
                  </IconButton>
                </Box> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
