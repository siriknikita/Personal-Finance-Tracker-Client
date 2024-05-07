import React from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import UserBehavior from "../../components/UserBehavior/userBehavior";
import styles from "./styles.module.css";

function AdminDashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      <div className={styles.content}>
        <section className={styles.info_boxes}>
          <div className={styles.info_box}>
            <>
              <h2>General Users' Spending Behaviour</h2>
              <UserBehavior />
              <Table />
            </>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;
