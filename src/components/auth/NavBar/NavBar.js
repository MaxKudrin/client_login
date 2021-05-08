import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import SimpleMenu from "../SimpleMenu/SimpleMenu";
import {connect} from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBar(props) {
  const {classes} = props;
  let links = ["Login", "Register"];
  if (props.authenticated) {
    links = ["Logout"];
  }
  const createLinks = (linksArr) => {
    return linksArr.map((link, index) => (
      <NavLink to={`/${link.toLowerCase()}`} key={index}>
        <Button color="inherit">{link}</Button>
      </NavLink>
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Auth App
          </Typography>
          {createLinks(links)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    authenticated: !!state.auth.token,
  };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);

export default withStyles(styles)(connectedNavBar);
