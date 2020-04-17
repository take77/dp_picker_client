import React, { useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../App'

import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';


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

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleSignInLink = () => history.push('/sign_in');

	const handleSignOutLink = () => {
		try {
			axios.delete('http://localhost:4567/sign_out', { withCredentials: true }).then((result) => {
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

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHomeLink = () => {
		setAnchorEl(null);
		history.push('/');
	};

	const handleHistoryLink = () => {
		setAnchorEl(null);

		const params = {
			playerId: authInfo.player.id
		};

		try {
			axios.get('http://localhost:4567/logs', { params: params }).then((result) => history.push({
				pathname: '/history',
				state: { logs: result.data }
			}));
		} catch (error) {
			console.error(error);
		};
	};

	return(
		<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleOpen}>
            	<MenuIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleHomeLink}>ホーム</MenuItem>
				<MenuItem onClick={handleClose}>このアプリについて</MenuItem>
						{authInfo.isLoggedIn == true && <MenuItem onClick={handleHistoryLink}>いままで選んだ仲間たち</MenuItem> }
			</Menu>
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
