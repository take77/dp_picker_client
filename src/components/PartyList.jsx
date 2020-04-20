import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        height: 60
    },
}));

const PartyList = () => {
    const classes = useStyles();

    const location = useLocation();

    const [authInfo, setAuthInfo] = useContext(AuthContext);

    const [state, setState] = useState({
        logs: location.state.logs
    });

    let history = useHistory();

    const handlePartyLink = (event) => {
        const params = {
            logId: event.currentTarget.getAttribute('data-index')
        };

        try {
            axios.get('http://localhost:4567/log', { params: params }).then((result) => history.push({
                pathname: '/party',
                state: {
                    party: result.data.party,
                    log: result.data.log
                }
            }));
        } catch (error) {
            console.error(error);
        };
    }

    const handlePartyDeleteLink = (event) => {
        const params = {
            logId: event.currentTarget.getAttribute('data-index'),
            playerId: authInfo.player.id
        };

        try {
            axios.delete('http://localhost:4567/log', { params: params }).then((result) => setState({logs: result.data}));
        } catch (error) {
            console.error(error);
        };
    }

    return (
        <Grid item xs={12}>
            {state.logs.map((log) => (
                <Grid container alignItems="center" justify="center" key={log.id} spacing={3}>
                    <Grid item xs={9}>
                        <Card className={classes.root} onClick={handlePartyLink} data-index={log.id}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {log.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="outlined" color="secondary" onClick={handlePartyDeleteLink} data-index={log.id}>
                            削除
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default PartyList;
