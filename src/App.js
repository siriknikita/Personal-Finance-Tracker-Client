import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import GoalTable from "./components/GoalTable";
import Notification from "./components/Notification";
import TransactionsTable from "./components/TransactionTable/TransactionsTable";
import Dashboard from "./scenes/dashboard";
import GoalForm from "./scenes/forms/goalForm";
import ProfileForm from "./scenes/forms/profileForm";
import TransactionForm from "./scenes/forms/transactionsForm";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Login from "./scenes/login";
import Profile from "./scenes/profile";
import Signup from "./scenes/signup";
import { ColorModeContext, useMode } from "./theme";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, setIsAuthorized }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Notification />
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
              </Routes>
              {isAuthorized && (
                <>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <>
                        <Route
                          path="/dashboard"
                          element={<Dashboard user={user} />}
                        />
                        <Route
                          path="/transactionForm"
                          element={<TransactionForm />}
                        />
                        <Route path="/profileForm" element={<ProfileForm />} />
                        <Route path="/goalForm" element={<GoalForm />} />
                        <Route path="/goals" element={<GoalTable />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                          path="/transactions"
                          element={<TransactionsTable />}
                        />
                      </>
                    </Routes>
                  </main>
                </>
              )}
            </div>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
