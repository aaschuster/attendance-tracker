import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TMDetail( {tm} ) {

    const navigate = useNavigate();

    for(let el in tm) {
        if(!tm[el])
            tm[el]="";
    }

    const [form, setForm] = useState(tm);
    const [err, setErr] = useState("");

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    return (
        <div className="userform">
            <form>
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
                    Email <input type="email" id="email"  value={form.email} onChange={onChange}/>
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
                <div className="userformbuttons">
                    <button onClick={() => navigate("/tmlist")}>Back to list</button>
                </div>
            </form>
        </div>
    )
}

export default TMDetail;