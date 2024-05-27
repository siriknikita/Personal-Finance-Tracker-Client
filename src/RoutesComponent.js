import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import TransactionsTable from "./components/TransactionTable/TransactionsTable";
import AdminDashboard from "./scenes/adminDashboard";
import Dashboard from "./scenes/dashboard";
import GoalForm from "./scenes/forms/goalForm";
import ProfileForm from "./scenes/forms/profileForm";
import TransactionForm from "./scenes/forms/transactionsForm";
import Login from "./scenes/login";
import Profile from "./scenes/profile";
import Signup from "./scenes/signup";
import { UserContext } from "./App";

const RoutesComponent = () => {
  const { user } = useContext(UserContext);
  const isAuthorized = useContext(UserContext).isAuthorized || localStorage.getItem("isAuthorized") === "true";
  console.log(isAuthorized);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthorized ? "/dashboard" : "/login"} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {isAuthorized && (
        <>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/transactionForm" element={<TransactionForm />} />
          <Route path="/profileForm" element={<ProfileForm />} />
          <Route path="/goalForm" element={<GoalForm />} />
          <Route
            path="/goals"
            element={
              <Table
                fetchUrl={`goals/get/${user.userID}`}
                dataKey={"goals"}
                columnsAccessors={["description", "deadline"]}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<TransactionsTable />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;
