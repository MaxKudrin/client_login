import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {IconButton} from "@material-ui/core";
import {GridMenuIcon} from "@material-ui/data-grid";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

function SimpleMenu(props) {
  let links = ["Main", "Login", "Register"];
  if (props.authenticated) {
    links = ["Main", "Users", "Logout"];
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const createMenuItems = (itemsArr) => {
    return itemsArr.map((item, index) => (
      <NavLink key={index} to={`/${item.toLowerCase()}`}>
        <MenuItem onClick={handleClose}>{item}</MenuItem>
      </NavLink>
    ));
  };
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
        edge="start"
      >
        <GridMenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {createMenuItems(links)}
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(SimpleMenu);
