import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import {logout} from '../redux/user'
import {connect} from 'react-redux'

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
  return (
    <div className={classes.root}>
      <AppBar color='primary' position='sticky' id='app-bar'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <button onClick={props.handleClick}>Logout</button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatch)(ButtonAppBar)