import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function ButtonAppBar(props) {
  const classes = useStyles();
  const {toggleDrawer} = props
  const {isLoggedIn} = props
  return (
    <div className={classes.root}>
      <AppBar color='primary' position='sticky' id='app-bar'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          {!isLoggedIn && (
            <div>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/signup">Signup</Button>
            </div>
          )}
          <Button color="inherit" href="/">Main</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.userName,
  };
}

export default connect(mapState)(ButtonAppBar)