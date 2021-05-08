import * as React from "react";
import {DataGrid} from "@material-ui/data-grid";
import {connect} from "react-redux";
import {getUsers} from "../../../redux/Actions/usersActions";

const columns = [
  {field: "id", headerName: "ID", width: 130},
  {field: "username", headerName: "Username", width: 150},
  {field: "password", headerName: "Password", width: 200},
];

function Users(props) {
  React.useEffect(() => {
    props.getUsers();
    // eslint-disable-next-line
  }, []);
  if (props.authorized === "not authorized") {
    return (
      <pre>
        <h1>You are not authorized, please login as admin</h1>
        <p>username: admin</p>
        <p>password: admin</p>
      </pre>
    );
  }
  return props.users ? (
    <div style={{height: 400, width: "100%"}}>
      <DataGrid
        rows={props.users}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  ) : null;
}

function mapStateToProps(state) {
  return {
    users: state.users.usersList,
    authorized: state.users.authorized,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
