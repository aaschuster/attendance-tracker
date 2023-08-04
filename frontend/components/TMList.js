import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TM from "./TM";

function TMList( {TMs, setUserToViewIdx, currentUserIdx} ) {

    const navigate = useNavigate();
    const [otherTMs, setOtherTMs] = useState([]);
    
    function onClick(tmIdx) {
        setUserToViewIdx(tmIdx);
        navigate("/tmdetail");
    }

    useEffect(() => {

        const otherTMsArr = [];

        TMs.forEach( (tm, idx) => {
            if(currentUserIdx !== idx)
                otherTMsArr.push(idx);
        })
        
        setOtherTMs(otherTMsArr);

    }, [TMs, currentUserIdx])

    return (
        <div>
            <div className="newuserbutton">
                <button onClick={() => navigate("/newuser")}>Add new team member</button>
            </div>
            <div className="labels">
                <div className="name">Name</div>
                <div className="hiredate">Hire Date</div>
                <div className="points">Current points</div>
                <div className="email">Email</div>
            </div>
            
            <TM isCurrentUser={true} tm={TMs[currentUserIdx]} onClick={() => onClick(currentUserIdx)}/>
            
            { 
                otherTMs.map( tm => {
                    return <TM isCurrentUser={false} tm={TMs[tm]} onClick={() => onClick(tm)} key={tm}/>;
                })
            }
        </div>
    )

}

export default TMList;