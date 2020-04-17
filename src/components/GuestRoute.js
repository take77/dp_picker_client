import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from '../App'

function GuestRoute(props) {
    const [authInfo, setAuthInfo] = useContext(AuthContext);

    return authInfo.isLoggedIn ? <Redirect to="/" /> : <Route {...props} />;
}

export default GuestRoute;
