import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from '../App'

function PrivateRoute(props) {
    const [authInfo, setAuthInfo] = useContext(AuthContext);

    return authInfo.isLoggedIn ? <Route {...props} /> : <Redirect to="/sign_in" />;
}

export default PrivateRoute;
