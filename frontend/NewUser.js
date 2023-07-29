import React from "react";
import axios from "axios";

import "./styles/newuser.css";

function NewUser() {

    function onSubmit(evt) {
        evt.preventDefault();
        console.log("form submitted");
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                First name <input type="text" id="firstname"/>
            </label>
            <label>
                Last name <input type="text" id="lastname"/>
            </label>
            <label>
                Initial points (will be set to default if empty) <input type="text" id="points"/>
            </label>
            <label>
                Email <input type="email" id="email"/>
            </label>
            <label>
                Hire date (will default to today if empty) <input type="text" id="hiredate"/>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewUser;