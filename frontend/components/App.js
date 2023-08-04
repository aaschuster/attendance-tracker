import React, { useState, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";

import cfalogo from "../cfalogo.png"

import Login from "./Login";
import Profile from "./Profile";
import TMList from "./TMList";
import TMDetail from "./TMDetail";
import NewUser from "./NewUser";

import "../styles/app.css";

const server = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`
});

function App() {

  const [TMs, setTMs] = useState([]);

  const [currentUserIdx, setCurrentUserIdx] = useState(null);
  const [userToViewIdx, setUserToViewIdx] = useState(null);

  const navigate = useNavigate();

  const getTMs = () => {
    server.get("/")
      .then( ({data}) => setTMs(data))
      .catch( err => console.error(err));
  }

  const getCurrentUserIdx = email => {    
    if(email) {
      TMs.forEach( (tm, idx) => {
        if(tm.email === email)
          setCurrentUserIdx(idx);
      })
    }
  }

  const goToFreshList = () => {
    getTMs();
    navigate("/tmlist");
  }

  useEffect(() => {
    getTMs();
  }, [])

  useEffect(() => {
    console.log(TMs);
    getCurrentUserIdx(localStorage.getItem("user"));
  }, [TMs])

  return (
    <div className="main">
      <h1>Attendance Tracker</h1>
      <div className="wordmark">
        <img className="logo" src={cfalogo} alt="Chick-Fil-A logo"/>
        <h2>Chick-Fil-A Strongsville</h2>
      </div>
      <Routes>

        <Route path="/" exact element={
          <Login 
            getCurrentUserIdx={getCurrentUserIdx}
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
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
