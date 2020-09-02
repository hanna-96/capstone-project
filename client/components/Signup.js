import React from "react";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = await axios.post("/api/users/signup", this.state);
    // this.props.history.push('/')
    this.setState({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  render() {
    const {classes} = this.props
    return (
      // <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
          <TextField
            name="userName"
            variant="outlined"
            type="text"
            fullWidth
            required
            label="User Name"
            onChange={this.handleChange}
            value={this.state.userName}
          />
           </Grid>
            <Grid item xs={12} sm={6}>
        <TextField
          name="firstName"
          variant="outlined"
          type="text"
          fullWidth
          required
          label="First Name"
          onChange={this.handleChange}
          value={this.state.firstName}
        />
           </Grid>
            <Grid item xs={12}>
        <TextField
        variant="outlined"
        fullWidth
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          label="Last Name"
          onChange={this.handleChange}
          value={this.state.lastName}
        />
        </Grid>
            <Grid item xs={12}>
        <TextField
        variant="outlined"
        fullWidth
          name="email"
          type="text"
          required
          label="Email Address"
          onChange={this.handleChange}
          value={this.state.email}
        />
        </Grid>
            <Grid item xs={12}>
          <TextField
          variant="outlined"
          fullWidth
            name="password"
            type="text"
            label="Password"
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
          </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* </Grid> */}
          </Grid>
      </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup)
