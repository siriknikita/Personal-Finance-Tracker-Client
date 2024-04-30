import React, { useContext } from "react";
import { UserContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./styles.module.css";

function Profile() {
  const { user } = useContext(UserContext);
  return (
    <PageLayout>
      <header className={styles.content_head}>
        <h1>Profile for {user.username}</h1>
        <h2>Working in progress...</h2>
      </header>
    </PageLayout>
  );
}

export default Profile;
