import React, { useState, useEffect } from "react";
import axios from "axios";

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
            { 
                TMs.map(tm => {
                    console.log(tm);
                    return (
                        <p>{tm.firstname} {tm.lastname} {tm.hiredate} {tm.points} {tm.email} </p>
                    )
                })
            }
        </div>
    )

}

export default TMList;