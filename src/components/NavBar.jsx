import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Axios from 'axios';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}),
);

const NavBar = () => {
	const classes = useStyles();

	let history = useHistory();

	const [authInfo, setAuthInfo] = useContext(AuthContext);

	const handleSignInLink = () => history.push('/sign_in');

	const handleSignOutLink = () => {
		try {
			Axios.delete('http://localhost:4567/sign_out', { withCredentials: true }).then((result) => {
				setAuthInfo({
					loggedInStatus: "NOT_LOGGED_IN",
					isLoggedIn: result.data.logged_in,
					player: {}
				});
				history.push('/')
			})
		} catch (error) {
			console.error(error);
		}
	}

	return(
		<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
						シンオウポケモンPicker
          </Typography>
					{authInfo.isLoggedIn ? <Button color="inherit" onClick={handleSignOutLink}>ログアウト</Button> : <Button color="inherit" onClick={handleSignInLink}>ログイン</Button>}
        </Toolbar>
      </AppBar>
    </div>
	);
};

export default NavBar;
