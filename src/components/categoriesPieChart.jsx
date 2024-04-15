import React from "react";
// import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Chart from "react-apexcharts";
import { getMoneySpent } from "../utils/categories";

const CategoriesPieChart = async ({ user }) => {
    const userID = user.userID;
    const moneySpentData = getMoneySpent(userID);
    const categoriesNames = Object.keys(moneySpentData);
    const moneySpentOnCategories = Object.values(moneySpentData);
    
    return React.createElement(Chart, {
        type: "pie",
        series: moneySpentOnCategories,
        labels: {
            show: false,
            name: {
                show: true,
            },
        },
        options: {
            lables: categoriesNames,
            legend: {
                show: true,
                position: "bottom",
            },
            // colors: ["#00AB55", "#2D99FF", "#FFE700", "#826AF9"],
        },
    });
};

export default CategoriesPieChart;
