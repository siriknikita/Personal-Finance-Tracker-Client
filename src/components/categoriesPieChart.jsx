import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getMoneySpent } from "../utils/categories";

function CategoriesPieChart({ userID }) {
    const [moneySpentData, setMoneySpentData] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            const data = await getMoneySpent(userID);
            setMoneySpentData(data.data);
        }
        fetchData();
    }, [userID]);

    const categoriesNames = Object.keys(moneySpentData);
    const moneySpentOnCategories = Object.values(moneySpentData);
    
    const data = {
        series: moneySpentOnCategories,
        options: {
            chart: {
                width: 380,
                type: "pie",
            },
            labels: categoriesNames,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };
    
    return (
        <>
            {console.log(moneySpentData)}
            {console.log(categoriesNames)}
            <Chart options={data.options} series={data.series} type="pie" height="100%" width="30%" />
        </>
    )
};

export default CategoriesPieChart;
