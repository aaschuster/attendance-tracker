import React, { useState } from 'react';
import axios from "axios";

import { serverURL } from "../consts";

const initFormValues = {
    email: "",
    password: ""
}

function Login( {TMs, goToFreshList} ) {

    const [values, setValues] = useState(initFormValues);
    const [message, setMessage] = useState("");
    const [formDisabled, setFormDisabled] = useState(false);

    const onChange = evt => {
        setMessage("");
        const { id, value } = evt.target;
        setValues({...values, [id]: value})
    }

    const login = evt => {
        evt.preventDefault();
        setMessage("This may take a minute, thanks for your patience...");
        setFormDisabled(true);

        axios.post(`${serverURL}/login`, {
            email: values.email,
            password: values.password
        })
            .then( res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", values.email);
                goToFreshList();
            })
            .catch(err => {
                console.error(err);
                setMessage("Login failed");
                setFormDisabled(false);
            });
    }

    return (
        <div className="login">
            <form onSubmit={login} className="userform">
                <input 
                    type="email"
                    id="email"      
                    placeholder="Email..."
                    value={values.email}
                    onChange={onChange}
                    disabled={formDisabled}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password..."
                    value={values.password}
                    onChange={onChange}
                    disabled={formDisabled}
                />
                {formDisabled ? 
                    <button onClick={() => window.location.reload()}>Cancel</button> :
                    <button type="submit">Login</button> 
                }
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Login;