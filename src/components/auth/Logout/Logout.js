import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {logout} from "../../../redux/Actions/authActions";
import {usersLogout} from "../../../redux/Actions/usersActions";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line
  }, []);
  return <Redirect to="/" />;
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
      dispatch(usersLogout());
    },
  };
}

export default connect(null, mapDispatchToProps)(Logout);
