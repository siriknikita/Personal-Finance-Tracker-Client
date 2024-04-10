import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../../App";
import styles from "./styles.module.css";

function ProfileForm() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { user } = useContext(UserContext);
    const [currentOption, setCurrentOption] = useState("username");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentOption === "username") {
                const response = await fetch("/api/update/username", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.Email,
                        currentUsername: currentUsername,
                        newUsername: newUsername
                    })
                });
                const data = await response.json();
                const message = data.message;
                alert(message);
            } else if (currentOption === "email") {
                const response = await fetch("/api/update/email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.Email,
                        newEmail: newEmail
                    })
                });
                const data = await response.json();
                const message = data.message;
                alert(message);
            } else if (currentOption === "password") {
                const response = await fetch("/api/update/password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.Email,
                        newPasswordHash: newPassword
                    })
                });
                const data = await response.json();
                const message = data.message;
                alert(message);
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} user={user} />
                    <main className="content">
                        <Topbar
                            isSidebar={isSidebar}
                            setIsSidebar={setIsSidebar}
                        />
                        <h3>Change the data!</h3>
                        <label>
                            Choose a data:
                            <select 
                                value={currentOption}
                                onChange={(e) => setCurrentOption(e.target.value)}
                            >
                                <option value="username">username</option>
                                <option value="email">email</option>
                                <option value="password">password</option>
                            </select>
                        </label>
                        
                        <form onSubmit={handleSubmit}>
                            {currentOption === "username" && (
                                <>
                                    <input 
                                        type="text"
                                        className={styles.input}
                                        placeholder="Current Username"
                                        value={currentUsername}
                                        onChange={(e) => setCurrentUsername(e.target.value)}
                                        required
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="New Username"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        required
                                    />
                                </>
                            )}
                            {currentOption === "password" && (
                                <>
                                    <input 
                                        type="password"
                                        className={styles.input}
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <br />
                                    <input
                                        type="password"
                                        className={styles.input}
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </>
                            )}
                            {currentOption === "email" && (
                                <>
                                    <input 
                                        type="email"
                                        className={styles.input}
                                        placeholder="Current Email"
                                        value={currentEmail}
                                        onChange={(e) => setCurrentEmail(e.target.value)}
                                        required
                                    />
                                    <br />
                                    <input
                                        type="email"
                                        className={styles.input}
                                        placeholder="New Email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                </>
                            )}
                            <br />
                            <br />
                            <button className={styles.btn}>Submit</button>
                        </form>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ProfileForm