import React from "react";
import { authLogin } from "../redux/user";
// import { withStyles } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleSubmit(event) {
    event.preventDefault();
    this.props.getUser(this.state.userName, this.state.password);
    this.setState({
      userName: "",
      password: "",
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  render() {
    const {classes} = this.props
    return (
       <Container component="main" maxWidth="xs">
       <CssBaseline />
       <div className={classes.paper}>
       <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Sign in
        </Typography>
       <form onSubmit={this.handleSubmit} className={classes.form}>
         {/* <label>User name</label> */}
         <TextField
         variant="outlined"
         margin="normal"
         fullWidth
           name="userName"
           type="text"
           required
           label="Username"
           onChange={this.handleChange}
           value={this.state.userName}
         />
           <TextField
           variant="outlined"
           margin="normal"
           fullWidth
             name="password"
             type="text"
             required
             label="Password"
             onChange={this.handleChange}
             value={this.state.password}
           />
         {/* </p> */}
         <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
           Sign In
         </Button> 
         </form>
         </div>
         </Container>
    );
  }
  }


  Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapDispatch = (dispatch,ownProps) => {
    return {
      getUser: (userName, password) => dispatch(authLogin(userName, password,ownProps.history)),
    };
  };
  
  export default connect(null, mapDispatch)(withStyles(styles)(Login))
  // (withStyles(styles)

           {/* <button type="submit">
           {/* <Link to="/welcome">Log In</Link> */}
         {/* </button> */} 
       {/* </form>
     </div> */}
      {/* // <Container component="main" maxWidth="xs">
      //   <CssBaseline />
      //   <div >
      //     <Avatar >
      //       <LockOutlinedIcon />
      //     </Avatar>
      //     <Typography component="h1" variant="h5">
      //       Sign in
      //     </Typography>
      //     <form  noValidate onSubmit={this.handleSubmit}>
      //       <TextField */}
      {/* //         variant="outlined"
      //         margin="normal"
      //         required
      //         fullWidth
      //         id="userName"
      //         label="Username"
      //         name="userName"
      //         autoComplete="userName"
      //         onChange={this.handleChange}
      //         value={this.state.userName}
      //         autoFocus
      //       />
      //       <TextField */}
      {/* //         variant="outlined"
      //         margin="normal"
      //         required
      //         fullWidth
      //         name="password"
      //         label="Password"
      //         type="text"
      //         id="password"
      //         onChange={this.handleChange}
      //         value={this.state.password}
      //         // autoComplete="current-password"
      //       />
      //       <FormControlLabel */}
      {/* //         control={<Checkbox value="remember" color="primary" />}
      //         label="Remember me"
      //       />
      //       <Button */}
      {/* //         type="submit"
      //         fullWidth
      //         variant="contained"
      //         color="primary"
      //         // className={classes.submit}
      //       >
      //         Sign In
      //       </Button> */}
      {/* //     </form> */}
      {/* //   </div> */}
      //   {/* <Box mt={8}>
      //     <Copyright />
      //   </Box> */}
      {/* // </Container> */}