import React, { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import {serverUrl} from "../consts";

import Login from "./Login";
import Profile from "./Profile";

function App() {

  const onLogin = (email) => {

    axios.post(`${serverUrl}/getbyemail`, {
      email: email
    })
      .then( res => {
        console.log(res);
      })
      .catch(err => console.log(err));

  }

  return (
    <div>
      <h1>Attendance Tracker</h1>
      <Routes>
        <Route path="/" exact element={<Login onLogin={onLogin}/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
