import React, { useContext, useLayoutEffect, useState } from "react";
import Chart from "react-apexcharts";
import { LoadingContet } from "../scenes/dashboard";
import { getMoneySpent } from "../utils/categories";

function CategoriesPieChart({ userID }) {
    const [moneySpentData, setMoneySpentData] = useState({});
    const { setShowPieChart } = useContext(LoadingContet);

    useLayoutEffect(() => {
        async function fetchData() {
            const data = await getMoneySpent(userID);
            setMoneySpentData(data.data);
            setShowPieChart(true);
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
            <Chart
                options={data.options}
                series={data.series}
                type="pie"
                height="100%"
                width="30%"
            />
        </>
    );
}

export default CategoriesPieChart;
