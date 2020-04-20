import React, {useState} from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme, pokemon) => ({
	root: {
		height: 240,
	},
	media: {
		height: 180,
	},
  }));

const PickedPokemonList = () => {
	const classes = useStyles();

	const location = useLocation();

	const [state, setState] = useState(
		{
			party: location.state.party
		});
	console.log(state)
	console.log(state.party)

	return(
		<Grid item xs={12}>
        	<Grid container justify="center" spacing={3}>
          		{state.party.map((pokemon) => (
					<Grid item xs={12} sm={6} key={pokemon.id}>
						<Card className={classes.root}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
										image={"http://localhost:4567" + pokemon.image.url}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{pokemon.name}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
            		</Grid>
          		))}
        	</Grid>
      	</Grid>
	)
}

export default PickedPokemonList;
