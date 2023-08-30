import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import bcrypt from "react-native-bcrypt";

import { serverURL } from "../consts"

function TMDetail( {tm, goToFreshList, isCurrent, logout} ) {

    const navigate = useNavigate();

    for(let el in tm) {
        if(!tm[el])
            tm[el]="";
    }

    tm.newpassword = "";
    tm.currentpassword = "";
    tm.confirmpassword = "";

    const server = axios.create({
        baseURL: serverURL,
        headers: {authorization: localStorage.getItem("token")}
    });

    const [form, setForm] = useState(tm);
    const [err, setErr] = useState("");

    function onChange(evt) {
        setErr("");
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    function deleteTM() {
        if(window.confirm(isCurrent ? "Are you sure you wish to delete your account? You will be logged out." : "Delete this team member?")) {
            server.delete(`${tm.user_id}`)
                .then( () => {
                    if(isCurrent) logout();
                    else goToFreshList()
                })
                .catch( err => {
                    console.error(err);
                    setErr(err.message);
                })
        }
        
    }

    function updateTM(updatedTM) {
        server.put(`${updatedTM.user_id}`, updatedTM)
            .then( () => goToFreshList())
            .catch( err => {
                console.error(err);
                setErr(err.message);
            })
    }

    function onSubmit(evt) {

        evt.preventDefault();

        const updatedTM = {
            firstname: form.firstname,
            lastname: form.lastname,
            points: form.points,
            email: form.email,
            hiredate: form.hiredate,
            role_id: form.role_id,
            password: form.password,
            user_id: form.user_id
        }

        let passwordErr = "";

        if(form.newpassword !== form.confirmpassword)
            passwordErr = "Passwords do not match.";

        if(
            form.currentpassword && 
            form.newpassword && 
            form.confirmpassword &&
            !passwordErr
        ) {
            if(bcrypt.compareSync( form.currentpassword, tm.password )) {
                updatedTM.password = bcrypt.hashSync(form.newpassword, 8);
                updateTM(updatedTM);
                return;
            } else passwordErr = "Password incorrect.";
        } 
        
        if(!passwordErr && (form.currentpassword || form.newpassword || form.confirmpassword)) {
            passwordErr = "Please fill out all 3 password fields to change password.";
        }

        if(passwordErr) {
            setForm({...form, currentpassword: "", newpassword: "", confirmpassword: ""});
            setErr(passwordErr);
        } else updateTM(updatedTM);
    }

    return (
        <div>
            <form className="userform" onSubmit={onSubmit}>
                <label>
                    First name <input type="text" id="firstname" value={form.firstname} onChange={onChange}/>
                </label>
                <label>
                    Last name <input type="text" id="lastname" value={form.lastname} onChange={onChange}/>
                </label>
                <label>
                    Initial points <input type="number" id="points" value={form.points} onChange={onChange}/>
                </label>
                <label>
                    Email <input type="email" id="email" value={form.email} onChange={onChange}/>
                </label>
                <label>
                    Hire date <input type="date" id="hiredate" value={form.hiredate} onChange={onChange}/>
                </label>
                <label>
                    Role <select id="role_id" onChange={onChange} value={form.role}>
                        <option value={1}>Team Member</option>
                        <option value={2}>Manager</option>
                        <option value={3}>Owner</option>
                    </select>
                </label>
                {
                    isCurrent ?
                        <div className="userform">
                            <label>
                                Current password: <input type="password" id="currentpassword" value={form.currentpassword} onChange={onChange}/>
                            </label>
                            <label>
                                New password: <input type="password" id="newpassword" value={form.newpassword} onChange={onChange}/>
                            </label>
                            <label>
                                Confirm password: <input type="password" id="confirmpassword" value={form.confirmpassword} onChange={onChange}/>
                            </label>
                        </div>
                    : <></>
                }

                <div className="userformbuttons">
                    <button onClick={() => navigate("/tmlist")}>Cancel changes</button>
                    <button type="submit">Save changes</button>
                </div>
                <button type="button" className="userformbuttons" onClick={deleteTM}>{isCurrent ? "Delete account" : "Delete team member"}</button>
                
            </form>
            <p>{err}</p>
        </div>
    )
}

export default TMDetail;