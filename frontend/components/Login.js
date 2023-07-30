import React, { useState } from 'react';
import axios from "axios";

const initFormValues = {
    email: "",
    password: ""
}

function Login( {getCurrentUserIdx, goToFreshList} ) {

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
                getCurrentUserIdx(values.email);
                goToFreshList();
            })
            .catch(err => {
                console.error(err);
                setErr("Login failed");
            });
    }

    return (
        <div className="login">
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