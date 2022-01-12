import React from "react";
import {
  AppBar,
  ToolBar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { CallMissedSharp, ShoppingCart } from "@material-ui/icons";
import logo from "../../assests/commerce.jpg";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar
        position="fixed"
        className={CallMissedSharp.appBar}
        color="inherit"
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to="/"
          >
            <img
              src={logo}
              alt="commerce"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                aria-label="Show cart items"
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
