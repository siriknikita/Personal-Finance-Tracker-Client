import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { CategoriesPieChart, Header } from "../../components";
import ExpenseChart from "../../components/ExpenseChart";
import { UserContext } from "../../contexts";

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      <div
        className="bg-alice-blue flex justify-start items-center flex-wrap border border-gray-200"
        // style="align-content: flex-start;"
      >
        <section
          className="py-12 pb-8 grid gap-6"
          // style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));"
        >
          <div className="h-40 flex items-center justify-center px-12 rounded">
            {/* <div className="block fill-current text-gray-400"> */}
            <CategoriesPieChart userID={user.userID} />
            {/* </div> */}
          </div>
        </section>
      </div>
      <div className="bg-alice-blue w-[100%] h-[56%] flex justify-start items-center flex-wrap border border-gray-200">
        <div className="w-full border border-gray">
          <ExpenseChart userID={user.userID} />
        </div>
        <div className="flex flex-row gap-4 ml-4 mb-1">
          <div className="flex items-center justify-center border border-gray-200">
            <CategoriesPieChart userID={user.userID} />
          </div>
          <div className="flex items-center justify-center border border-gray-200">
            <CategoriesPieChart userID={user.userID} />
          </div>
          <div className="flex items-center justify-center border border-gray-200">
            <CategoriesPieChart userID={user.userID} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
