import React, { useState, useContext } from 'react';
import axios from "axios";
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { AuthContext } from '../App'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © シンオウポケモンpicker '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    let history = useHistory();

    const [authInfo, setAuthInfo] = useContext(AuthContext);

    const [state, setState] = useState(
        {
            nickname: '',
            password: '',
        });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        const params = new URLSearchParams();
        params.append('nickname', state.nickname);
        params.append('password', state.password);
        try {
            axios.post('http://localhost:4567/sign_up', params, { withCredentials: true }).then((result) => {
                setAuthInfo({
                    loggedInStatus: "LOGGED_IN",
                    isLoggedIn: result.data.logged_in,
                    player: result.data.player
                })
                history.push('/')
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    新規登録
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nickname"
                        label="ニックネーム"
                        name="nickname"
                        autoComplete="nickname"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.submit}
                    >
                        新規登録
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/sign_in">
                                {"アカウントをお持ちの方はログインへ"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
