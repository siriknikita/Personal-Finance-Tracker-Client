import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import React from "react";
import PaymentOutlineIcon from '@mui/icons-material/PaymentOutlined'


// async function fetchData(url, property) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data[property];
// }

function Dashboard() {
    const location = useLocation();
    const user = location.state.user;

    return (
        <div className="app">
            <main className="content">
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
                                    {user.TotalSpent}
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
