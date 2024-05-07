import React from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import styles from "./styles.module.css";

function AdminDashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      <div className={styles.content}>
        <section className={styles.info_boxes}>
          <div className={styles.info_box}>
            <>
              <h2>Table of users</h2>
              <Table
                fetchUrl={"get/users"}
                dataKey={"users"}
                columnsAccessors={["username", "email", "registrationDate"]}
              />
            </>
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminDashboard;
