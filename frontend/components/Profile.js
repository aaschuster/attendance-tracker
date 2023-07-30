import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Profile( {user} ) {

    if(localStorage.getItem("token")) {
        return (
        <div>
        <h2>Profile</h2>
        <p> 
            Name: {user.firstname} {user.lastname} 
        </p>
        <p>
            Hiredate: {user.hiredate}
        </p>
        <p>
            Points: {user.points} 
        </p>
        <p>
            Role ID: {user.role_id} 
        </p>
        <p>
            User ID: {user.user_id}
        </p>
        </div>
        )
    }
    return( < Navigate to="/" /> );
}

export default Profile;