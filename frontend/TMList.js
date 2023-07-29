import React from "react";
import { useNavigate } from "react-router-dom";

function TMList( {TMs, setUserToView} ) {

    const navigate = useNavigate();
    
    function onClick(tmIdx) {
        setUserToView(tmIdx);
        navigate("/tmdetail");
    }

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
            { 
                TMs.map((tm, idx) => {
                    return (
                        <div key={tm.user_id} className="tm" onClick={() => onClick(idx)}>
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