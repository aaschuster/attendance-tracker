import React, { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";

import {serverUrl} from "../consts";

import Login from "./Login";
import Profile from "./Profile";

const initUserValues = {
  email: "",
  firstname: "",
  lastname: "",
  hiredate: "",
  points: null,
  role_id: null,
  user_id: null
}

function App() {

  const [user, setUser] = useState(initUserValues);

  const getUser = email => {
    axios.post(`${serverUrl}/getbyemail`, {email: email})
      .then( res =>  setUser(res.data[0]))
      .catch( err => console.log(err))
  }

  useEffect(() => {
    const email = localStorage.getItem("user");
    if(email) getUser(email);
  }, [])

  return (
    <div>
      <h1>Attendance Tracker</h1>
      <Routes>
        <Route path="/" exact element={<Login getUser={getUser}/>}/>
        <Route path="/profile" element={<Profile user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
