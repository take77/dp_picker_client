import React from 'react';

import ConditionsForm from '../components/ConditionsForm'

import Grid from '@material-ui/core/Grid';

const Home = () => {
	return(
		<Grid container justify="center">
			<h1>シンオウポケモンPicker</h1>
			<ConditionsForm />
		</Grid>
	)
}

export default Home;
