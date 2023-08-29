import React, { useState, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";

import cfalogo from "../cfalogo.png"

import Login from "./Login";
import TMList from "./TMList";
import TMDetail from "./TMDetail";
import NewUser from "./NewUser";

import "../styles/app.css";

import {serverURL} from "../consts"

const server = axios.create({
  baseURL: serverURL
});

function App() {

  const [TMs, setTMs] = useState([]);

  const [currentUserIdx, setCurrentUserIdx] = useState(null);
  const [userToViewIdx, setUserToViewIdx] = useState(null);

  const navigate = useNavigate();

  const goToFreshList = () => {
    server.get("/", 
      {headers: {
        authorization: localStorage.getItem("token")}
      })
      .then( ({data}) => setTMs(data))
      .catch( err => console.error(err));
    navigate("/tmlist");
  }

  const getCurrentUserIdx = () => {
    const email = localStorage.getItem("user");
    if(email && TMs) {
      TMs.forEach( (tm, idx) => {
        if(tm.email === email)
          setCurrentUserIdx(idx);
      })
    }
  }

  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    navigate("/");
  }

  useEffect(() => {    
    getCurrentUserIdx();          
  }, [TMs])

  return (
    <div className="main">
      <h1>Attendance Tracker</h1>
      <button className="logoutbutton" onClick={logout}>Logout</button>
      <div className="wordmark">
        <img className="logo" src={cfalogo} alt="Chick-Fil-A logo"/>
        <h2>Chick-Fil-A Strongsville</h2>
      </div>
      <Routes>

        <Route path="/" exact element={
          <Login 
            TMs={TMs}
            goToFreshList={goToFreshList}
          />}
        />

        <Route path="/tmlist" element={
          <TMList
            TMs={TMs}
            setUserToViewIdx={setUserToViewIdx} 
            currentUserIdx={currentUserIdx}
          />}
        />

        <Route path="/newuser" element={
          <NewUser goToFreshList={goToFreshList}/>}
        />
        <Route path="/tmdetail" element={
          <TMDetail 
            tm={TMs[userToViewIdx]} 
            goToFreshList={goToFreshList} 
            isCurrent={userToViewIdx===currentUserIdx}
            logout={logout}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
