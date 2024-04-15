import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getMoneySpent } from "../utils/categories";

function CategoriesPieChart({ user }) {
    const userID = user.userID;
    const [moneySpentData, setMoneySpentData] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            const data = await getMoneySpent(userID);
            setMoneySpentData(data);
        }
        fetchData();
    }, [userID]);

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
