import React, { useState, useEffect } from "react";
import axios from "axios";

function TMList() {

    const [TMs, setTMs] = useState();

    const server = axios.create({
        baseURL: `http://localhost:${process.env.PORT}`
    });

    useEffect(() => {
        server.get("/")
            .then( ({data}) => console.log(data))
            .catch( err => console.error(err));
    });

    return (
        <div>
            why hello there
        </div>
    )

}

export default TMList;