import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import {
  authChangeHandler,
  login,
  register,
} from "../../../redux/Actions/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function createControls(controls, changeHandler) {
  return controls.map((control, index) => {
    return (
      <TextField
        key={index}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={control.name}
        label={control.label}
        name={control.name}
        autoComplete={control.name}
        autoFocus={control.autoFocus}
        error={!control.valid && control.touched}
        helperText={control.errorMessage}
        onChange={(e) => changeHandler(e)}
      />
    );
  });
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in / Register
        </Typography>
        <form className={classes.form} noValidate>
          {createControls(props.controls, props.changeHandler)}

          <Grid container>
            <Grid item xs>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={props.onRegister}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={props.onLogin}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function mapStateToProps(state) {
  return {controls: state.auth.controls};
}
function mapDispatchToProps(dispatch) {
  return {
    onRegister: async (e) => {
      await dispatch(register());
      await dispatch(login());
    },
    onLogin: (e) => {
      dispatch(login());
    },
    changeHandler: (e) => {
      dispatch(authChangeHandler(e));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
