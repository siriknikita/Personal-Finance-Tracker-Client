import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { ColorModeContext, useMode } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import styles from "./styles.module.css";

function Profile() {
    const { user } = useContext(UserContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
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
                        <header className={styles.content_head}>
                            <h1>Profile</h1>
                            <h2>Working in progress...</h2>
                        </header>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Profile;
