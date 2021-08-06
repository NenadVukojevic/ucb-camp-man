import React, { useState } from 'react'
import { useHistory } from 'react-router';
import AuthService from '../../services/AuthService';

function Login() {
    const [credentials, setCredentials] =
        useState({
            username: ''
            , password: ''
        });
    const history = useHistory();
    const handleChange = (ev) => {
        setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    }

    const login = (ev) => {
        console.log(credentials);
        AuthService.login(credentials).then((res) => {
            console.log(res.headers['authorization']);
            localStorage.setItem("jwt", res.headers['authorization']);
            localStorage.setItem("loggedIn", true);
            
            history.push(`/campaigns`);

        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="form-group w-25">
                    <div className="row mt-3">
                        <input type="text"
                            className="form-control"
                            placeholder="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange} />
                    </div>
                    <div className="row mt-3">
                        <input type="password"
                            className="form-control"
                            placeholder="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange} />
                    </div>
                    <div className="row mt-3">
                        <button className="btn btn-primary"
                            onClick={login}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
