import React from "react";
import {Routes, Route} from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <h1>Attendance Tracker</h1>
      <Routes>
        <Route path="/" exact element={Login()}/>
        <Route path="/profile" element={Profile()}/>
      </Routes>
    </div>
  );
}

export default App;
