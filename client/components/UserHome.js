import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import CameraInput from "./CameraInput";
import {Link, Redirect} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// import Link from "@material-ui/core/Link";

// import classNames from 'classnames';
const UserHome = (props) => {
  // const classes = useStyles();
  const   handleClick = () => {
    // <Redirect from ="/welcome" to="/scan" />
    <CameraInput/>
  }
  return (
    <div>
      <Typography variant="h2" component="h2" align="center">
        Welcome {props.userName}!
      </Typography>
      {/* button is not working */}
      <div>
        <Link to="/cabinet" >
          Recently made drinks
        </Link>
      </div>
      <img src="https://www.theflavorbender.com/wp-content/uploads/2015/10/Witch-Heart-Halloween-Cocktail-The-Flavor-Bender-Featured-Image-SQ-3-500x375.jpg"></img>
      <button type ="submit" onClick={handleClick}>Scan Items</button>
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          console.log('I am clicked');
        <Redirect from ="/welcome" to="/scan" />
        }}
      >
        Scan items */}
      {/* </Button> */}
    </div>
  );
};

const mapState = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapState, null)(UserHome);
// export default connect(mapState, null)(withStyles(styles)(UserHome))
/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
