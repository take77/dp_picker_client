import React, {useState} from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		height: 240,
	  },
  }));

const PickedPokemonList = () => {
	const classes = useStyles();

	const location = useLocation();

	const [state, setState] = useState(
		{
			party: location.state.party
		});


	return(
		<Grid item xs={12}>
        	<Grid container justify="center" spacing={3}>
          		{state.party.map((pokemon) => (
						<Grid item xs={12} sm={6} key={pokemon.id}>
							<Paper className={classes.paper} elevation={3}>
							{pokemon.name}
						  </Paper>
            		</Grid>
          		))}
        	</Grid>
      	</Grid>
	)
}

export default PickedPokemonList;
