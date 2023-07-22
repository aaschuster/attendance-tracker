import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const initFormValues = {
    email: "",
    password: ""
}

function Login( {getUser} ) {
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

        axios.post(`http://localhost:${process.env.PORT}/login`, {
            email: values.email,
            password: values.password
        })
            .then( res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", values.email);
                getUser(values.email);
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
                <button type="submit">Login</button>
                <p>{err}</p>
            </form>
        </div>
    )
}

export default Login;