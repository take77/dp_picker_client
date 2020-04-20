import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

import PickedPokemonList from '../components/PickedPokemonList'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const Party = () => {
    const location = useLocation();

    const [state, setState] = useState(
        {
            log: location.state.log
        });

    return (
        <Grid container justify="center">
            <h1>{state.log.title}</h1>
            <PickedPokemonList />
        </Grid>
    )
}

export default Party;
