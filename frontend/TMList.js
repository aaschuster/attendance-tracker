import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./styles/tmlist.css";

function TMList() {

    const [TMs, setTMs] = useState([]);

    const server = axios.create({
        baseURL: `http://localhost:${process.env.PORT}`
    });

    useEffect(() => {
        server.get("/")
            .then( ({data}) => setTMs(data))
            .catch( err => console.error(err));
    }, []);

    

    return (
        <div>
            <NavLink to="/newuser">Add new teammember</NavLink>
            <div className="labels">
                <div className="name">Name</div>
                <div className="hiredate">Hire Date</div>
                <div className="points">Current points</div>
                <div className="email">Email</div>
            </div>
            { 
                TMs.map(tm => {
                    return (
                        <div key={tm.user_id} className="tm">
                            <div className="name">{tm.firstname } {tm.lastname} </div>
                            <div className="hiredate">{tm.hiredate} </div>
                            <div className="points">{tm.points} </div> 
                            <div className="email">{tm.email || <>NA</>}</div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default TMList;