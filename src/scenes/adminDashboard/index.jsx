import React from "react";
import Header from "../../components/Header";
import BehaviourBarChart from "../../components/behaviourBarChart";
import styles from "./styles.module.css";

function AdminDashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Welcome to your admin dashboard" />
      <div className={styles.content}>
        <section className={styles.info_boxes}>
          <div className={styles.info_box}>
            <>
              <h2>Users' behaviour</h2>
              <BehaviourBarChart />
            </>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;
