import React from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import CameraInput from './CameraInput'
import {Link} from 'react-router-dom'
const UserHome = (props) => {
  return (
    <div>
      <h3>Welcome {props.userName}!</h3>
      {/* button is not working */}
      <div>
          <Link to="/cabinet">Recently made drinks</Link>
      </div>
      <img src="https://www.theflavorbender.com/wp-content/uploads/2015/10/Witch-Heart-Halloween-Cocktail-The-Flavor-Bender-Featured-Image-SQ-3-500x375.jpg"></img>
      <button type ="submit" onSubmit={<CameraInput/>}>Scan Items</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapState, null)(UserHome);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   userName: PropTypes.string
// }
