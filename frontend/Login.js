import React, { useState } from 'react';
import axios from "axios";

const loginURL = "http://localhost:1234/login";

const initFormValues = {
    email: "",
    password: ""
}

function Login() {

    const [values, setValues] = useState(initFormValues);

    const onChange = evt => {
        const { id, value } = evt.target;
        setValues({...values, [id]: value})
    }

    const onSubmit = evt => {
        evt.preventDefault();

        axios.post(loginURL, {
            email: "eshuster@cfa.com",
            password: "pass"
        })
            .then( res => {
                localStorage.setItem("token", res.data.token);
                console.log("login success");
            })
            .catch(err => console.error(err));
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
            </form>
        </div>
    )
}

export default Login;