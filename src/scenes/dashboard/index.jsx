import PaymentOutlineIcon from '@mui/icons-material/PaymentOutlined';
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { ColorModeContext, useMode } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import CategoriesPieChart from '../../components/categoriesPieChart';
import styles from "./styles.module.css";

function Dashboard() {
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
                        {/* Dashboard header */}
                        <header className={styles.content_head}>
                            <h1>Dashboard</h1>
                        </header>
                        {/* Main sections */}
                        <div className={styles.content}>
                            {/* Section about money data */}
                            <section className={styles.info_boxes}>
                                <div className={styles.info_box}>
                                    {/* Payment icon */}
                                    <div className={styles.box_icon}>
                                        <PaymentOutlineIcon />
                                    </div>
                                    <div className={styles.box_content}>
                                        <span className={styles.big}>
                                            {user.totalSpent}
                                        </span>
                                    </div>
                                </div>
                            </section>
                            <section>
                                {/* <div className={styles.info_box}>
                                    <div>
                                    </div>
                                </div> */}
                                <CategoriesPieChart />
                            </section>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Dashboard;
