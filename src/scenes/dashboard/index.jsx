import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../../App";
import Header from "../../components/Header";
import PieChartSkeleton from "../../components/PieChartSkeleton";
import UserBehavior from "../../components/UserBehavior/userBehavior";
import CategoriesPieChart from "../../components/categoriesPieChart";
import styles from "./styles.module.css";

export const LoadingContet = createContext(null);

function Dashboard() {
  const { user } = useContext(UserContext);
  const [showPieChart, setShowPieChart] = useState(false);

  return (
    <>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      <div className={styles.content}>
        <section className={styles.info_boxes}>
          <div className={styles.info_box}>
            <LoadingContet.Provider value={{ setShowPieChart }}>
              {!showPieChart && <PieChartSkeleton />}
              {user.isAdmin === "false" ? (
                <CategoriesPieChart userID={user.userID} />
              ) : (
                <>
                  <h2>Users Behavior</h2>
                  <UserBehavior />
                </>
              )}
            </LoadingContet.Provider>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
