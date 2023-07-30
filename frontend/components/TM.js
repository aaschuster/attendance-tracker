import React from "react";
import { useNavigate } from "react-router-dom";

function TM( {isCurrentUser, tm, onClick} ) {

    const navigate = useNavigate();

    const classes = `tm${ isCurrentUser ? " currentuser" : ""}`;

    if(tm)
        return (
            <div key={tm.user_id} className={classes} onClick={onClick}>
                <div className="name">{tm.firstname } {tm.lastname} </div>
                <div className="hiredate">{tm.hiredate} </div>
                <div className="points">{tm.points} </div> 
                <div className="email"> {tm.email || <>NA</>}</div>
            </div>
        )
    else
        return <></>;
}

export default TM;