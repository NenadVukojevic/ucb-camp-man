import React from 'react'
import { useHistory } from 'react-router';

function Logout() {
    const history = useHistory();
    localStorage.clear("jwt");
    localStorage.setItem("loggedIn", false);
    history.push("/login");
    return null;
}

export default Logout

