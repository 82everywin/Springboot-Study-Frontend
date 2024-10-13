import './App.css';
import React from "react";
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
