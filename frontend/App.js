import React, { useState, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";

import cfalogo from "./cfalogo.png"

import Login from "./Login";
import Profile from "./Profile";
import TMList from "./TMList";
import TMDetail from "./TMDetail";
import NewUser from "./NewUser";

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

  const [TMs, setTMs] = useState([]);

  const [currentUser, setCurrentUser] = useState(initUserValues);
  const [userToView, setUserToView] = useState();

  const navigate = useNavigate();

  const getCurrentUser = email => {
    server.post("/getbyemail", {email: email})
      .then( res =>  setCurrentUser(res.data[0]))
      .catch( err => console.log(err))
  }

  const goToFreshList = () => {
    server.get("/")
      .then( ({data}) => setTMs(data))
      .catch( err => console.error(err));
    navigate("/tmlist");
  }

  useEffect(() => {
    const email = localStorage.getItem("user");
    if(email) getCurrentUser(email);
  }, [])

  return (
    <div className="main">
      <h1>Attendance Tracker</h1>
      <div className="wordmark">
        <img className="logo" src={cfalogo} alt="Chick-Fil-A logo"/>
        <h2>Chick-Fil-A Strongsville</h2>
      </div>
      <Routes>
        <Route path="/" exact element={<Login getCurrentUser={getCurrentUser} goToFreshList={goToFreshList}/>}/>
        <Route path="/profile" element={<Profile currentUuser={currentUser}/>}/>
        <Route path="/tmlist" element={<TMList TMs={TMs} setUserToView={setUserToView}/>}/>
        <Route path="/newuser" element={<NewUser goToFreshList={goToFreshList}/>}/>
        <Route path="/tmdetail" element={<TMDetail tm={TMs[userToView]} goToFreshList={goToFreshList}/>}/>
      </Routes>
    </div>
  );
}

export default App;
