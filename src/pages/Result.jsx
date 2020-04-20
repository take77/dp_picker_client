import React from 'react'

import PickedPokemonList from '../components/PickedPokemonList'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
  }));

const Result = () => {
	return(
		<Grid container justify="center">
			<h1>今回一緒に旅するメンバーはこちら！</h1>
			<PickedPokemonList />
		</Grid>
	)
}

export default Result;
