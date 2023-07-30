import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewUser( {goToFreshList} ) {

    let today = new Date().toJSON();
    today = today.slice(0, 10);

    const initForm = {
        firstname: "",
        lastname: "",
        points: 3,
        hiredate: today,
        role_id: 1,
        email: ""
    }

    const navigate = useNavigate();

    const [form, setForm] = useState(initForm);
    const [err, setErr] = useState("");

    const server = axios.create({
        baseURL: `http://localhost:${process.env.PORT}`
    });

    function onSubmit(evt) {
        evt.preventDefault();
        if(form.email == "")
            form.email = null;
                    
        server.post("/", form)
            .then( res => goToFreshList())
            .catch( err => setErr("Failed to add team member."));
    }

    function onChange(evt) {
        const {target} = evt;
        setForm({...form, [target.id]: target.value});
    }

    return (
        <div className="userform">
            <form onSubmit={onSubmit}>
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
                    <button type="submit">Submit</button>
                    <button onClick={() => navigate("/tmlist")}>Cancel</button>
                </div>
            </form>
            <p>{err}</p>
        </div>
    )
}

export default NewUser;