import React, { useState, useContext } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const ConditionsForm = () => {
	const [authInfo, setAuthInfo] = useContext(AuthContext);

	const [conditionState, setConditionState] = useState(
		{
			base: false,
			legend: false,
			onlyDp: false,
			useWeight: false,
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
						{authInfo.isLoggedIn == true && <TextField id="standard-basic" label="パーティー名" name="title" onChange={handleTitleChange} />}
        			<FormControlLabel
							control={<Switch checked={conditionState.base} onChange={handleConditionChange} name="base" />}
          			label="進化前のポケモンだけを選ぶ"
        			/>
        			<FormControlLabel
							control={<Switch checked={conditionState.legend} onChange={handleConditionChange} name="legend" />}
          			label="伝説のポケモンも加える"
        			/>
        			<FormControlLabel
							control={<Switch checked={conditionState.onlyDp} onChange={handleConditionChange} name="onlyDp" />}
          			label="シンオウ地方のポケモンだけを選ぶ"
        			/>
						{conditionState.onlyDp === false &&
						<FormControlLabel
							control={<Switch checked={conditionState.useWeight} onChange={handleConditionChange} name="useWeight" />}
						label="シンオウ地方のポケモンを出やすくする"
					  />
					}
      			</FormGroup>
				<Button variant="contained" color="primary" onClick={handleSubmit}>仲間たちをPick!</Button>
				</form>
    		</FormControl>
		</div>
	)
}

export default ConditionsForm;
