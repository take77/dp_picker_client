import React, { useContext } from 'react'

import PartyList from '../components/PartyList'

import { AuthContext } from '../App'

import Grid from '@material-ui/core/Grid';

const PickedHistory = () => {
    const [authInfo, setAuthInfo] = useContext(AuthContext);

    return (
        <Grid container justify="center">
            <h1>{authInfo.player.nickname} の仲間たち</h1>
            <PartyList />
        </Grid>
    )
}

export default PickedHistory;
