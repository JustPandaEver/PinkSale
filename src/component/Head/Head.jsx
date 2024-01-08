import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import pink1 from "../Assets/pink1.png";
import LineAxisIcon from "@mui/icons-material/LineAxis";
// import pink1 from "../Assets/pink1.png"
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./Head.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrLaunch } from "react-icons/gr";
import HomeIcon from "@mui/icons-material/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Modal_connect from "../Modal_connect/Modal_connect";
import { useNavigate } from "react-router";
import Mylockin from "../Mylockin/Mylockin";
import Token from "../Token_pink/Token";
import Createlock from "../Creat_lock/Creatlock";
import Lockinfo from "../Lock_detail/Lockinfo";
import Lockin from "../Lock_in/Lockin";
import Canvas from "../Canvas/Canvas";
import Modal_bnb from "../Model_bnb/Model_bnb";
import Lauchpad from "../Create_lauchpad/Lauchpad";
import Create_private_sale from "../Create_private_sale/Create_private_sale";
import Launchpad_list from "../Launchpad_list/Launchpad_list";
import Launchpad_list_view from "../Launchpad_list_view/Launchpad_list_view";
const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 0),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  // boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [show, setShow] = useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: "flex" }} className="boby">
      <CssBaseline />

      <AppBar position="fixed" open={open} className="appbar_color ">
        <Canvas />
        <Toolbar className="d-none d-md-flex gradent ">
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon className="open_menu d-none d-md-block" />
          </IconButton>
          {/* <DrawerHeader className="close_icon_start" > */}

          <IconButton
            onClick={handleDrawerClose}
            sx={{ display: !open ? "none" : "block", marginRight: 1 }}
            color=""
            aria-label="open drawer"
            edge="start"
          >
            {theme.direction === "" ? (
              <MenuIcon />
            ) : (
              <svg
                className="open_menu"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path>
              </svg>
            )}
          </IconButton>
          {/* </DrawerHeader> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="d-flex align-items-center "
          >
            <img src={pink1} className="pink_img " alt="" />
            <Typography
              variant="h6"
              className="color_text_h6 ps-2 d-none d-md-flex"
            >
              Pinksales
            </Typography>
          </Typography>

          <Typography
            className="d-flex justify-content-end  "
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Modal_bnb />
            <Modal_connect />
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <div className=" d-none d-md-block ">
        <Drawer
          variant="permanent"
          open={open}
          className=""
          sx={{ backgroundColor: " #001355 " }}
        >
          <div className="height_sidebar2 pt-3">
            <div className=" mt-5">
              <div className="HOVER text-start home_icon_launch pt-3 d-flex align color_home mt-2 ">
                <Tooltip title="Home" arrow placement="right">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    className="ant-menu-item-icon me-1 "
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                  </svg>
                </Tooltip>
                <p
                  className="ms-1"
                  style={{ display: !open ? "none" : "block" }}
                >
                  Home
                </p>{" "}
              </div>
              <Accordion
                className="border-none accordian_color_blue  "
                disableGutters
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className="color-expant"
                      style={{ display: !open ? "none" : "block" }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className=""
                >
                  <div className="HOVER d-flex pt-2">
                    <div className="dropdown">
                      <div className="dropbtn">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          className="ant-menu-item-icon me-1 "
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M864 736c0-111.6-65.4-208-160-252.9V317.3c0-15.1-5.3-29.7-15.1-41.2L536.5 95.4C530.1 87.8 521 84 512 84s-18.1 3.8-24.5 11.4L335.1 276.1a63.97 63.97 0 0 0-15.1 41.2v165.8C225.4 528 160 624.4 160 736h156.5c-2.3 7.2-3.5 15-3.5 23.8 0 22.1 7.6 43.7 21.4 60.8a97.2 97.2 0 0 0 43.1 30.6c23.1 54 75.6 88.8 134.5 88.8 29.1 0 57.3-8.6 81.4-24.8 23.6-15.8 41.9-37.9 53-64a97 97 0 0 0 43.1-30.5 97.52 97.52 0 0 0 21.4-60.8c0-8.4-1.1-16.4-3.1-23.8H864zM762.3 621.4c9.4 14.6 17 30.3 22.5 46.6H700V558.7a211.6 211.6 0 0 1 62.3 62.7zM388 483.1V318.8l124-147 124 147V668H388V483.1zM239.2 668c5.5-16.3 13.1-32 22.5-46.6 16.3-25.2 37.5-46.5 62.3-62.7V668h-84.8zm388.9 116.2c-5.2 3-11.2 4.2-17.1 3.4l-19.5-2.4-2.8 19.4c-5.4 37.9-38.4 66.5-76.7 66.5-38.3 0-71.3-28.6-76.7-66.5l-2.8-19.5-19.5 2.5a27.7 27.7 0 0 1-17.1-3.5c-8.7-5-14.1-14.3-14.1-24.4 0-10.6 5.9-19.4 14.6-23.8h231.3c8.8 4.5 14.6 13.3 14.6 23.8-.1 10.2-5.5 19.6-14.2 24.5zM464 400a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"></path>
                        </svg>
                      </div>
                      <div
                        style={{
                          display: !open ? " block" : "none",
                          zIndex: "1 !important",
                        }}
                      >
                        <div className="dropdown-content text-start">
                          <Link to="/lauchpad"> Create launchpad</Link>
                          <a href="#"> Create fair launch</a>
                          <a href="#"> Create dutch auct...</a>
                          <a href="#"> Create subscription...</a>
                          <a href="#"> Create token</a>
                          <Link to="/Launchpad_list"> Launchpad list</Link>
                        </div>
                      </div>
                    </div>
                    <p style={{ display: !open ? "none" : "block" }}>
                      Launchpads
                    </p>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-color-lonch"
                  style={{ display: !open ? "none" : "block" }}
                >
                  <Typography>
                    <ul className="text-start">
                      <li className="list-style-none">
                        <Link
                          to="/lauchpad"
                          className="HOVER text-decoration-none"
                        >
                          Create launchpad
                        </Link>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Create fair launch
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Create dutch auct...
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Create subscription...
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Create token
                        </a>
                      </li>
                      <li className="list-style-none">
                        <Link
                          to="/Launchpad_list"
                          className="HOVER text-decoration-none"
                        >
                          Launchpad list
                        </Link>
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="border-none accordian_color_blue"
                disableGutters
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className="color-expant"
                      style={{ display: !open ? "none" : "block" }}
                    />
                  }
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className="HOVER d-flex pt-3">
                    <div className="dropdown">
                      <div className="dropbtn">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          className="ant-menu-item-icon me-1 "
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.995,6.903c-0.033-0.342-0.239-0.643-0.547-0.797l-7.973-4c-0.281-0.143-0.613-0.142-0.895-0.002l-8.027,4 C3.256,6.254,3.051,6.541,3.009,6.871c-0.013,0.097-1.145,9.741,8.541,15.008C11.698,21.96,11.863,22,12.027,22 c0.17,0,0.34-0.043,0.492-0.13C21.826,16.611,21.033,7.297,20.995,6.903z M12.018,19.847c-6.86-4.01-7.14-10.352-7.063-12.205 l7.071-3.523l6.998,3.511C19.029,9.5,18.543,15.873,12.018,19.847z"></path>
                        </svg>

                        <div style={{ display: !open ? " block" : "none" }}>
                          <div className="dropdown-content text-start">
                            <a href="#"> Create Private Sale</a>
                            <a href="#"> Private Sale List</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className=""
                      style={{ display: !open ? "none" : "block" }}
                    >
                      Private Sale
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-color-lonch"
                  style={{ display: !open ? "none" : "block" }}
                >
                  <Typography>
                    <ul className="text-start">
                      <li className="list-style-none">
                        <Link
                          to="/Create_private_sale"
                          className="HOVER text-decoration-none"
                        >
                          Create Private Sale
                        </Link>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Private Sale List
                        </a>
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                disableGutters
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                className="accordian_shadow accordian_color_blue"
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className="color-expant"
                      style={{ display: !open ? "none" : "block" }}
                    />
                  }
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className="HOVER d-flex pt-3">
                    <div className="dropdown">
                      <div className="dropbtn">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          className="ant-menu-item-icon me-1"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zm-40 376H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"></path>
                        </svg>
                        <div style={{ display: !open ? "block" : " none" }}>
                          <div className="dropdown-content text-start">
                            <a href="#"> Create Lock</a>
                            <a href="#"> Token</a>
                            <a href="#"> Liquidity</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className=""
                      style={{ display: !open ? "none" : "block" }}
                    >
                      PinkLock
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-color-lonch"
                  style={{ display: !open ? "none" : "block" }}
                >
                  <Typography>
                    <ul className="text-start">
                      <li className="list-style-none pink_lock_and_key">
                        <a
                          href="#"
                          className="HOVER text-decoration-none "
                          onClick={() => history("/Createlock")}
                        >
                          Create Lock
                        </a>
                      </li>
                      <li className="list-style-none bg-tokan pink_lock_and_key">
                        <a
                          className="HOVER text-decoration-none "
                          onClick={() => history("/token")}
                        >
                          Token
                        </a>
                      </li>
                      <li className="list-style-none pink_lock_and_key">
                        <a
                          href="#"
                          className="HOVER text-decoration-none"
                          onClick={() => setShow(!show)}
                        >
                          Liquidity
                        </a>
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                className="accordian_shadow accordian_color_blue"
                disableGutters
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className="color-expant"
                      style={{ display: !open ? "none" : "block" }}
                    />
                  }
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                  className="new_no"
                >
                  <Typography className="HOVER d-flex pt-3">
                    <div className="dropdown">
                      <div className="dropbtn">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          className="ant-menu-item-icon"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M247 25.332c-.642.046-1.288.098-1.936.152-28.244 52.446-31.912 108.59-28.084 167.936 3.77 58.42 14.916 119.542 15.936 181.58h46.168c1.02-62.038 12.167-123.16 15.936-181.58 3.828-59.347.16-115.49-28.084-167.936-.648-.054-1.294-.106-1.936-.152V352h-18V25.332zm-23.795 3.51c-7.21 1.567-14.562 3.595-21.893 6.04l-2.398 2.88c-38.992 46.79-49.743 83.613-45.955 123.384 3.787 39.772 23.27 83.214 47.31 139.31l4.45 11.458c.898 3.188 4.327 9.14 7.594 15.463-3.76-44.326-10.457-88.814-13.294-132.797-3.65-56.57-.748-112.657 24.185-165.738zm65.59 0c24.933 53.08 27.835 109.168 24.185 165.738-2.837 43.983-9.534 88.47-13.294 132.797 3.267-6.324 6.696-12.275 7.595-15.463l4.45-11.46c24.04-56.094 43.523-99.536 47.31-139.308 3.79-39.77-6.962-76.593-45.954-123.384l-2.4-2.88c-7.33-2.445-14.682-4.473-21.89-6.04zM167.5 49.422c-3.667 1.97-7.256 4.04-10.73 6.21C126.256 74.705 105 100.5 105 128c0 61.75 22.053 90.394 49.773 122.074 2.808 3.21 5.702 6.47 8.608 9.76-14.478-34.99-25.395-66.073-28.34-96.98-3.537-37.152 5.253-73.565 32.46-113.432zm177 0c27.207 39.867 35.997 76.28 32.46 113.432-2.945 30.907-13.862 61.99-28.34 96.98 2.905-3.29 5.8-6.55 8.607-9.76C384.947 218.394 407 189.75 407 128c0-27.5-21.256-53.296-51.77-72.367-3.474-2.172-7.063-4.24-10.73-6.21zM224 393v37h21.424v-37H224zm42.576 0v37H288v-37h-21.424zM224 448v44h64v-44h-64z"></path>
                        </svg>
                        <div style={{ display: !open ? "block" : " none" }}>
                          <div className="dropdown-content text-start">
                            <a href="#"> Create Airdrop</a>
                            <a href="#"> Airdrop List</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className=""
                      style={{ display: !open ? "none" : "block" }}
                    >
                      Airdrop
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-color-lonch"
                  style={{ display: !open ? "none" : "block" }}
                >
                  <Typography>
                    <ul className="text-start">
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Create Airdrop
                        </a>
                      </li>
                      <li className="list-style-none bg-tokan">
                        <a href="#" className="HOVER text-decoration-none">
                          Airdrop List
                        </a>
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2 ">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Buy Crypto Fiat
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M899.6 276.5L705 396.4 518.4 147.5a8.06 8.06 0 0 0-12.9 0L319 396.4 124.3 276.5c-5.7-3.5-13.1 1.2-12.2 7.9L188.5 865c1.1 7.9 7.9 14 16 14h615.1c8 0 14.9-6 15.9-14l76.4-580.6c.8-6.7-6.5-11.4-12.3-7.9zm-126 534.1H250.3l-53.8-409.4 139.8 86.1L512 252.9l175.7 234.4 139.8-86.1-53.9 409.4zM512 509c-62.1 0-112.6 50.5-112.6 112.6S449.9 734.2 512 734.2s112.6-50.5 112.6-112.6S574.1 509 512 509zm0 160.9c-26.6 0-48.2-21.6-48.2-48.3 0-26.6 21.6-48.3 48.2-48.3s48.2 21.6 48.2 48.3c0 26.6-21.6 48.3-48.2 48.3z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Leaderboard
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.995,6.9c-0.034-0.342-0.241-0.642-0.548-0.795l-8-4c-0.281-0.141-0.613-0.141-0.895,0l-8,4 C3.246,6.259,3.039,6.559,3.005,6.9c-0.011,0.107-0.961,10.767,8.589,15.014C11.723,21.972,11.861,22,12,22 s0.277-0.028,0.406-0.086C21.956,17.667,21.006,7.008,20.995,6.9z M12,19.897C5.231,16.625,4.911,9.642,4.966,7.635L12,4.118 l7.029,3.515C19.066,9.622,18.701,16.651,12,19.897z"></path>
                  <path d="M11 12.586L8.707 10.293 7.293 11.707 11 15.414 16.707 9.707 15.293 8.293z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Anti-Bot
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3.741 1.408l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .741-.438zM5 13v6.617L18.85 12 5 4.383V11h5v2H5z"></path>
                  </g>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Multi-Sender
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  dexview.com
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.928,11.607c-0.202-0.488-0.635-0.605-0.928-0.633V8c0-1.103-0.897-2-2-2h-6V4.61c0.305-0.274,0.5-0.668,0.5-1.11 C13.5,2.672,12.828,2,12,2s-1.5,0.672-1.5,1.5c0,0.442,0.195,0.836,0.5,1.11V6H5C3.897,6,3,6.897,3,8v2.997 C2.951,11,2.918,11.003,2.918,11.003C2.395,11.04,1.99,11.476,1.99,12v2c0,0.553,0.447,1,1,1H3v5c0,1.103,0.897,2,2,2h14 c1.103,0,2-0.897,2-2v-5c0.553,0,1-0.447,1-1v-1.938C22.011,11.909,21.988,11.753,21.928,11.607z M5,20V8h14l0.001,3.996 C19.001,11.998,19,11.999,19,12v2c0,0.002,0.001,0.003,0.001,0.005L19.002,20H5z"></path>
                  <ellipse cx="8.5" cy="12" rx="1.5" ry="2"></ellipse>
                  <ellipse cx="15.5" cy="12" rx="1.5" ry="2"></ellipse>
                  <path d="M8 16H16V18H8z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Pools Alert
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  className="ant-menu-item-icon me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M296 250c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm184 144H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-48 458H208V148h560v320c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm440-88H728v-36.6c46.3-13.8 80-56.6 80-107.4 0-61.9-50.1-112-112-112s-112 50.1-112 112c0 50.7 33.7 93.6 80 107.4V764H520c-8.8 0-16 7.2-16 16v152c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V780c0-8.8-7.2-16-16-16zM646 620c0-27.6 22.4-50 50-50s50 22.4 50 50-22.4 50-50 50-50-22.4-50-50zm180 266H566v-60h260v60z"></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  KYC & Audit
                </p>{" "}
              </div>
              <div className="HOVER text-start ps-3 pt-3 d-flex align mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  className="ant-menu-item-icon  me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinejoin="round"
                    stroke-width="32"
                    d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
                  ></path>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="32"
                    d="M256 56v120a32 32 0 0032 32h120m-232 80h160m-160 80h160"
                  ></path>
                </svg>
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Docs
                </p>{" "}
              </div>

              <Accordion
                disableGutters
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
                className="accordian_shadow accordian_color_blue"
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className="color-expant"
                      style={{ display: !open ? "none" : "block" }}
                    />
                  }
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className="HOVER d-flex ms- pt-2">
                    <div className="dropdown">
                      <div className="dropbtn">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 24 24"
                          className="ant-menu-item-icon me-1"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                             fillRule="nonzero"
                              d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888-1.189 1.148c-.122.118-.221.219-.409.244-.187.026-.341-.03-.454-.34l-.87-2.871-.012.008z"
                            ></path>
                          </g>
                        </svg>
                        <div style={{ display: !open ? " block" : "none" }}>
                          <div className="dropdown-content text-start">
                            <a href="#"> English</a>
                            <a href="#">简体中文</a>
                            <a href="#">日本語</a>
                            <a href="#"> Turkey</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className=""
                      style={{ display: !open ? "none" : "block" }}
                    >
                      Telegram
                    </p>{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-color-lonch"
                  style={{ display: !open ? "none" : "block" }}
                >
                  <Typography>
                    <ul className="text-start">
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          English
                        </a>
                      </li>
                      <li className="list-style-none bg-tokan">
                        <a href="#" className="HOVER text-decoration-none">
                          简体中文
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          日本語
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Tiếng Việt
                        </a>
                      </li>
                      <li className="list-style-none">
                        <a href="#" className="HOVER text-decoration-none">
                          Turkey
                        </a>
                      </li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <div className="HOVER text-start ps-3 pt-3 d-flex align ">
                {/* <Tooltip title="Delete"  placement="right" arrow="ture"  > */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="ant-menu-item-icon  me-1"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                     fillRule="nonzero"
                      d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131 4.718-.942 7.855-4.492 7.855-10.348 0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645-.335 1.64-.5 2.352-1.214 3.331 0 7.642-4.697 11.358-9.463 12.309-3.268.652-8.02-.419-9.382-1.841.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037 1.158.475 1.442.465 1.973.538z"
                    ></path>
                  </g>
                </svg>
                {/* </Tooltip> */}
                <p className="" style={{ display: !open ? "none" : "block" }}>
                  Twitter
                </p>{" "}
              </div>
            </div>

            <div className="HOVER text-start ps-3 pt-3 d-flex align mb-5-margin ">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="ant-menu-item-icon me-1"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M13 19.938A8.001 8.001 0 0 0 12 4a8 8 0 0 0-1 15.938V14H9v-2h2v-1.654c0-1.337.14-1.822.4-2.311A2.726 2.726 0 0 1 12.536 6.9c.382-.205.857-.328 1.687-.381.329-.021.755.005 1.278.08v1.9H15c-.917 0-1.296.043-1.522.164a.727.727 0 0 0-.314.314c-.12.226-.164.45-.164 1.368V12h2.5l-.5 2h-2v5.938zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
                </g>
              </svg>
              <p className="" style={{ display: !open ? "none" : "block" }}>
                Facebook
              </p>{" "}
            </div>
          </div>
        </Drawer>
      </div>
      <div className="hello_pink d-none d-md-block">
        <div style={{ display: !open ? "none" : "block" }}>
          <div className="MainLayout_siderFooter__3itw9 d-flex justify-content-around ">
            <div className="pb-2 ms-2">
              <img
                src={pink1}
                alt="pinksale"
                className="PinksalePrice_logo__w6X7p"
                width="20"
              />

              <a
                href="#"
                target="_blank"
                className="fs-6-pink text-decoration-none text-dark pt-3 ps-1"
              >
                PINKSALE
              </a>
            </div>
            <div className="PinksalePrice ps-3 pt-1 ">$158.16</div>
          </div>
        </div>
        {/* <div style="height: 4px;"></div> */}
        <div className="d-flex items-center justify-content-around pb-1 d-none d-md-flex color_of_dark">
          <div className="flex-1" style={{ display: !open ? "none" : "block" }}>
            <div className="ant-dropdown-trigger Language_root__131TC d-flex align-items-center">
              <img
                src="data:image/png;base64,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"
                alt="English"
                width="20"
                height="20"
                className="Language_flag__3YaoS"
              />
              <div className="Language_country__3_TAG ps-1">English</div>
            </div>
          </div>
          <div className="ThemeSwitcher_root__20QfE d-flex">
            <div className="ThemeSwitcher_label__9Qa0m"></div>
            <div className="ThemeSwitcher_themeIcon__3wg-7 ThemeSwitcher_active__7oUEZ pb-3 ps-1">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke-width="32"
                  d="M256 48v48m0 320v48m147.08-355.08l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
                ></path>
                <circle
                  cx="256"
                  cy="256"
                  r="80"
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke-width="32"
                ></circle>
              </svg>
            </div>
            <div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                 fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ThemeSwitcher_themeIcon__3wg-7">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="32"
                  d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Box
        component=""
        sx={{ flexGrow: 1, p: 1 }}
        className="color_of_back_ground"
      >
        <DrawerHeader />

        <Routes>
          <Route exact path="/" element={<Createlock />} />
          <Route exact path="/my_lockin/:id" element={<Mylockin />} />
          <Route exact path="/token" element={<Token />} />
          <Route exact path="/Createlock" element={<Createlock />} />
          <Route exact path="/Lauchpad" element={<Lauchpad />} />
          <Route exact path="/Launchpad_list" element={<Launchpad_list />} />
          <Route
            exact
            path="/Launchpad_list_view"
            element={<Launchpad_list_view />}
          />
          {/* <Route exact path="/" element={<Mylockin/>}/> */}
          <Route exact path="/lockinfo/:id" element={<Lockinfo />} />
          <Route exact path="/lockin/:id" element={<Lockin />} />
          <Route
            exact
            path="/Create_private_sale"
            element={<Create_private_sale />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
