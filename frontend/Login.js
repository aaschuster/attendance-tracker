import React, { useState } from 'react';

const initFormValues = {
    email: "",
    password: ""
}

function Login() {

    const [values, setValues] = useState(initFormValues);

    const onChange = evt => {
        const { id, value } = evt.target;
        setValues({...values, [id]: value})
        console.log(value);
    }

    const onSubmit = evt => {
        evt.preventDefault();
        //add code here to send data to API
        console.log("submit");
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