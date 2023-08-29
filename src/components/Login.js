import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serverURL } from "../../consts";

const initFormValues = {
    email: "",
    password: ""
}

function Login( {TMs, goToFreshList} ) {

    const [values, setValues] = useState(initFormValues);
    const [err, setErr] = useState("");

    const onChange = evt => {
        setErr("");
        const { id, value } = evt.target;
        setValues({...values, [id]: value})
    }

    const login = evt => {
        evt.preventDefault();

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
                setErr("Login failed");
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
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password..."
                    value={values.password}
                    onChange={onChange}
                />
                <button type="submit">Login</button>
                <p>{err}</p>
            </form>
        </div>
    )
}

export default Login;