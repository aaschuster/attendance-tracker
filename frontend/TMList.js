import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TM( {isCurrentUser, tm, onClick} ) {
    const classes = `tm${ isCurrentUser ? " currentuser" : ""}`;

    if(tm)
        return (
            <div key={tm.user_id} className={classes} onClick={onClick}>
                <div className="name">{tm.firstname } {tm.lastname} </div>
                <div className="hiredate">{tm.hiredate} </div>
                <div className="points">{tm.points} </div> 
                <div className="email">{tm.email || <>NA</>}</div>
            </div>
        )
    else
        return <></>;
}

function TMList( {TMs, setUserToView, currentUserID} ) {

    const navigate = useNavigate();

    const [currentUserIdx, setCurrentUserIdx] = useState();
    const [otherTMs, setOtherTMs] = useState([]);
    
    function onClick(tmIdx) {
        setUserToView(tmIdx);
        navigate("/tmdetail");
    }

    useEffect(() => {

        const otherTMsArr = [];

        TMs.forEach( (tm, idx) => {
            if(currentUserID === tm.user_id)
                setCurrentUserIdx(idx);
            else 
                otherTMsArr.push(idx);
        })
        
        setOtherTMs(otherTMsArr);

    }, [TMs])

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