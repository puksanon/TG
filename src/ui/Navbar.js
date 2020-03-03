import React          from 'react';

//material
import AppBar         from '@material-ui/core/AppBar';
import Toolbar        from '@material-ui/core/Toolbar';
import Typography     from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navbar: {
    flexGrow  : 1,
    position  : 'fixed',
    top       : 0,
    width     : '100%',
  },
  title: {
    flexGrow    : 1,
    display     : 'none',
    [theme.breakpoints.up('sm')]: {
      display   : 'block',
    },
  },
}));

function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            The Guardian 
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchAppBar;
