import React, { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import cfalogo from "./cfalogo.png"

import Login from "./Login";
import Profile from "./Profile";

import "./styles/app.css";

const initUserValues = {
  email: "",
  firstname: "",
  lastname: "",
  hiredate: "",
  points: null,
  role_id: null,
  user_id: null
}

const server = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`
});

function App() {

  const [user, setUser] = useState(initUserValues);

  const getUser = email => {
    server.post("/getbyemail", {email: email})
      .then( res =>  setUser(res.data[0]))
      .catch( err => console.log(err))
  }

  useEffect(() => {
    const email = localStorage.getItem("user");
    if(email) getUser(email);
  }, [])

  return (
    <div className="main">
      <h1>Attendance Tracker</h1>
      <div className="wordmark">
        <img className="logo" src={cfalogo} alt="Chick-Fil-A logo"/>
        <h2>Chick-Fil-A Strongsville</h2>
      </div>
      <Routes>
        <Route path="/" exact element={<Login getUser={getUser}/>}/>
        <Route path="/profile" element={<Profile user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
