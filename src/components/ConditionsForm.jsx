import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const ConditionsForm = () => {
	const [state, setState] = useState(
		{
			base: false,
			legend: false,
			onlyDp: false,
			useWeight: false,
		});

	let history = useHistory();

	const handleChange = (event) => {
		setState({...state, [event.target.name]: event.target.checked});
	};

	const handleSubmit = () => {
		const params = {
			base: state.base,
			legend: state.legend,
			onlyDp: state.onlyDp,
			useWeight: state.useWeight
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
        			<FormControlLabel
          			control={<Switch checked={state.base} onChange={handleChange} name="base" />}
          			label="進化前のポケモンだけを選ぶ"
        			/>
        			<FormControlLabel
          			control={<Switch checked={state.legend} onChange={handleChange} name="legend" />}
          			label="伝説のポケモンも加える"
        			/>
        			<FormControlLabel
          			control={<Switch checked={state.onlyDp} onChange={handleChange} name="onlyDp" />}
          			label="シンオウ地方のポケモンだけを選ぶ"
        			/>
					{state.onlyDp === false &&
						<FormControlLabel
						control={<Switch checked={state.useWeight} onChange={handleChange} name="useWeight" />}
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
