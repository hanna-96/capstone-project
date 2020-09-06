import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from './AppBar'
// import { Link } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom'

import {logout} from '../redux/user'
import {connect} from 'react-redux'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 function NewDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = 'left'

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
 
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        {props.isLoggedIn ? 
        <React.Fragment>
      <List>
        <Link href='/welcome'>
          <ListItem button key='home'>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link href={`/users/${props.user.userName}/cabinet`}>
          <ListItem button key='cabinet'>
            <ListItemText primary='Your Cabinet' />
          </ListItem>
        </Link>
          <Link href='/scan'>
          <ListItem button key='scan'>
            <ListItemText primary='Scan Items' />
          </ListItem>
        </Link>
      </List>
      <Divider />
          <Link href='/login'>
          <ListItem button key="logout" onClick={props.handleClick} >
            {/* <Redirect to='/login' /> */}
            <ListItemText primary="Logout" />
          </ListItem>
          </Link>
      </React.Fragment>
       : 
              <List>
              <Link href='/login'>
                <ListItem button key='login'>
                  <ListItemText primary='Login' />
                </ListItem>
              </Link>
              <Link href='/signup'>
                <ListItem button key='signup'>
                  <ListItemText primary='Signup' />
                </ListItem>
              </Link>
            </List>
      }
    </div>
  );
  console.log('is it logged in?', props.isLoggedIn)
  return (
    <div>
        <React.Fragment key={anchor}>
          <AppBar toggleDrawer={toggleDrawer('left', close)} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.userName,
    user: state.user
  };
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NewDrawer)