import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import CameraInput from "./CameraInput";
import { Link, Redirect } from "react-router-dom";
// import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SwipeableTextMobileStepper from "./Carousel";

// import classNames from 'classnames';
const UserHome = (props) => {
  return (
    <div>
      <Typography variant="h3" component="h3" align="center">
        Welcome {props.userName}!
      </Typography>
      <div>
        <br />
        <Link to="/cabinet">Recently made drinks</Link>
        {/* <Link
          href=  " /cabinet" 
          component="button"
          variant="body2"
          underline="hover"
         
        >
          Recently made drinks
        </Link> */}
      </div>
      <SwipeableTextMobileStepper />
      <Button variant="contained" href="/scan" align="center">
        Scan items
      </Button>
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
