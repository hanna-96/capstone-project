import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Link} from "react-router-dom";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableTextMobileStepper from "./Carousel";

// import classNames from 'classnames';
const UserHome = (props) => {
  return (
    <React.Fragment>
      <div align="center"> 
        <Typography variant="h3" component="h3" >
          Welcome {props.user.userName}!
        </Typography>
        <div>
          <br />
          <Link to={`/users/${props.user.userName}/cabinet`}>Recently made drinks</Link>

        </div>
        <SwipeableTextMobileStepper />
        <Button variant="contained" href="/scan" align="center">
          Scan items
        </Button>
      </div>
      <div id='favorites-bar'>
        {
          props.user.favorites.slice(0, 3).map(drink =>
            <div className='drink'>
             favorite!!
            </div>
          )
        }
      </div>
    </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
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
