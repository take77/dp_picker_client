import React, { useState, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center'
	},
}));

const ConditionsForm = () => {
	const classes = useStyles();

	const [authInfo, setAuthInfo] = useContext(AuthContext);

	const [conditionState, setConditionState] = useState(
		{
			base: false,
			legend: false,
			onlyDp: false,
			useWeight: false,
			pickedExcept: false,
		});

	const [titleState, setTitleState] = useState(
		{
			title: ''
		})

	let history = useHistory();

	const handleTitleChange = (event) => {
		// FixMe: this cord isn't correct
		setTitleState({ ...titleState, [event.target.name]: event.target.value });
	};

	const handleConditionChange = (event) => {
		setConditionState({ ...conditionState, [event.target.name]: event.target.checked });
	};

	const handleSubmit = () => {
		const params = {
			base: conditionState.base,
			legend: conditionState.legend,
			onlyDp: conditionState.onlyDp,
			useWeight: conditionState.useWeight,
			pickedExcept: conditionState.pickedExcept,
			partyTitle: titleState.title,
			// FixMe: this params might not need
			playerId: authInfo.player.id
		};

		try {
			axios.get('http://localhost:4567/party', {params: params}).then((result) => history.push({
				pathname: '/result',
				state: {party: result.data}
			}));
		  } catch (error) {
			console.error(error);
		  }
	};

	return(
		<div className="form_wrapper">
			<FormControl component="fieldset">
      			<FormLabel component="legend">自分好みの条件を設定しよう</FormLabel>
				<form>
					<FormGroup>
						{authInfo.isLoggedIn == true && <Box height={65} className={classes.root}><TextField id="standard-basic" label="パーティー名" fullWidth name="title" onChange={handleTitleChange} /></Box>}
						<Box height={50} className={classes.root}>
							<FormControlLabel
							control={<Switch checked={conditionState.base} onChange={handleConditionChange} name="base" />}
          					label="進化前のポケモンだけを選ぶ"
							/>
						</Box>
						<Box height={50} className={classes.root}>
							<FormControlLabel
							control={<Switch checked={conditionState.legend} onChange={handleConditionChange} name="legend" />}
          					label="伝説のポケモンも加える"
							/>
						</Box>
						<Box height={50} className={classes.root}>
							<FormControlLabel
							control={<Switch checked={conditionState.onlyDp} onChange={handleConditionChange} name="onlyDp" />}
          					label="シンオウ地方のポケモンだけを選ぶ"
							/>
						</Box>
						{conditionState.onlyDp === false &&
							<Box height={50} className={classes.root}><FormControlLabel
							control={<Switch checked={conditionState.useWeight} onChange={handleConditionChange} name="useWeight" m={4} />}
							label="シンオウ地方のポケモンを出やすくする"
							/></Box>
						}
						{authInfo.isLoggedIn == true &&
							<Box height={50} className={classes.root}><FormControlLabel
							control={<Switch checked={conditionState.pickedExcept} onChange={handleConditionChange} name="pickedExcept" />}
							label="今まで選んだ仲間を外す"
							/></Box>
						}
					</FormGroup>
					<Grid height={100} className={classes.root} container justify="center">
						<Button variant="contained" color="primary" size="large" onClick={handleSubmit}>仲間たちをPick!</Button>
					</Grid>
				</form>
    		</FormControl>
		</div>
	)
}

export default ConditionsForm;
