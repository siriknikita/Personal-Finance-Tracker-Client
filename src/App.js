import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import ProfileForm from './scenes/forms/profileForm';
import TransactionForm from "./scenes/forms/transactionsForm";
import GoalForm from "./scenes/forms/goalForm";

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null);
    const [theme, colorMode] = useMode();

    return (
        <UserContext.Provider value={{user, setUser}}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
                                    <Route
                                        path="/transactionForm"
                                        element={<TransactionForm />}
                                    />
                                    <Route
                                        path="/profileForm"
                                        element={<ProfileForm />}
                                    />
                                    <Route
                                        path="/goalForm"
                                        element={<GoalForm />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </Router>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </UserContext.Provider>
    )
}

export default App
