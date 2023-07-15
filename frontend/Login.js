import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const loginURL = "http://localhost:1234/login";

const initFormValues = {
    email: "",
    password: ""
}

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState(initFormValues);
    const [err, setErr] = useState("");

    const onChange = evt => {
        setErr("");
        const { id, value } = evt.target;
        setValues({...values, [id]: value})
    }

    const onSubmit = evt => {
        evt.preventDefault();

        axios.post(loginURL, {
            email: values.email,
            password: values.password
        })
            .then( res => {
                localStorage.setItem("token", res.data.token);
                console.log("login success");
                navigate("/profile");
            })
            .catch(err => {
                setErr("Login failed");
            });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
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
                <button type="submit">Submit</button>
                <p>{err}</p>
            </form>
        </div>
    )
}

export default Login;