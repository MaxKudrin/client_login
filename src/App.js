import {useEffect} from "react";
import Login from "./components/auth/Login/Login";
import Users from "./components/auth/Users/Users";
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./components/auth/Main/Main";
import {connect} from "react-redux";
import {autoLogin} from "./redux/Actions/authActions";
import Logout from "./components/auth/Logout/Logout";
import NavBar from "./components/auth/NavBar/NavBar";

const App = (props) => {
  let route = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/Register" component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.authenticated) {
    route = (
      <Switch>
        <Route path="/main" component={Main} />
        <Route path="/users" component={Users} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    );
  }
  useEffect(() => {
    props.autoLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar />
      {route}
    </>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: !!state.auth.token,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => {
      dispatch(autoLogin());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
