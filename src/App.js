import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Signup from "./scenes/signup";

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="app">
                <div className="app__container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/login" />}
                        />
                        <Route
                            path="/signup"
                            element={<Signup />}
                        />
                        <Route
                            path="/login"
                            element={<Login setUser={setUser} />} 
                        />
                        <Route
                            path="/dashboard"
                            element={<Dashboard user={user} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
