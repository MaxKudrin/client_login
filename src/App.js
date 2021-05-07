import {useEffect} from "react";
import Login from "./components/auth/Login/Login";
import Users from "./components/auth/Users/Users";
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./components/auth/Main/Main";
import {connect} from "react-redux";
import {autoLogin} from "./redux/Actions/authActions";

const App = (props) => {
  let route = (
    <Switch>
      <Route path="/auth" component={Login} />
      <Route path="/users" component={Users} />
      <Route path="/" exact component={Main} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.authenticated) {
    route = (
      <Switch>
        <Route path="/users" component={Users} />
        <Redirect to="/users" />
      </Switch>
    );
  }
  useEffect(() => {
    console.log("Hello from useEffect");
    props.autoLogin();
    // eslint-disable-next-line
  }, []);
  return route;
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
