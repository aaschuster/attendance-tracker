import React, { useState } from 'react';
import axios from "axios";
import bcrypt from "react-native-bcrypt";
import { buildToken } from "../buildtoken";

const example = process.env.EXAMPLE === "true" ? true : false;

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

    const JSONLogin = evt => {
        evt.preventDefault();

        const [user] = TMs.filter(TM => TM.email === values.email);

        if(user && bcrypt.compareSync(values.password, user.password)) {

            localStorage.setItem("token", buildToken(user.email));
            localStorage.setItem("user", values.email);
            goToFreshList();

        } else {
            setErr("Login failed");
        }
    }

    const APILogin = evt => {
        evt.preventDefault();

        axios.post(`http://localhost:${process.env.PORT}/login`, {
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
            <form onSubmit={example ? JSONLogin : APILogin} className="userform">
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