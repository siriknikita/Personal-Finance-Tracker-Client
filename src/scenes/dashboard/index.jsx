import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../../App";
import PieChartSkeleton from "../../components/PieChartSkeleton";
import CategoriesPieChart from "../../components/categoriesPieChart";
import { ColorModeContext, useMode } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import styles from "./styles.module.css";

export const LoadingContet = createContext(null);

function Dashboard() {
    const { user } = useContext(UserContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [showPieChart, setShowPieChart] = useState(false);

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
                        {/* Dashboard header */}
                        <header className={styles.content_head}>
                            <h1>Dashboard</h1>
                        </header>
                        {/* Main sections */}
                        <div className={styles.content}>
                            {/* Section about money data */}
                            <section className={styles.info_boxes}>
                                <div className={styles.info_box}>
                                    <LoadingContet.Provider
                                        value={{ setShowPieChart }}
                                    >
                                        {!showPieChart && <PieChartSkeleton />}
                                        <CategoriesPieChart
                                            userID={user.userID}
                                        />
                                    </LoadingContet.Provider>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Dashboard;
