import Plotly from "plotly.js-dist";
import React, { useEffect, useState } from "react";

function plotExpenseStat(divID, categories, moneySpent) {
    const layout = { title: "Money spent on each category" };
    const data = [{ labels: categories, values: moneySpent, type: "pie" }];
    Plotly.newPlot(divID, data, layout);
}

function PlotStatistics({ categories, moneySpent }) {
    const [passedCategories, setPassedCategories] = useState([]);
    const [passedMoneySpent, setPassedMoneySpent] = useState([]);

    useEffect(() => {
        categories.then(categories => setPassedCategories(categories.categories));
        moneySpent.then(moneySpent => setPassedMoneySpent(moneySpent.moneySpent));
        console.log(passedCategories);
        console.log(passedMoneySpent);
        plotExpenseStat("chartDiv", passedCategories, passedMoneySpent);
    }, [categories, passedCategories, moneySpent, passedMoneySpent]);

    return <div id='chartDiv'></div>;
}

export default PlotStatistics;
