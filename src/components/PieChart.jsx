import React from 'react'
import PlotStatistics from './Plot'

async function fetchData(url) {
    const response = await fetch(`/api/${url}`);
    const data = await response.json();

    return data;
}

async function fetchMoneySpent(userID) {
    return fetchData(`get/transactions/moneySpent/${userID}`);
}

async function fetchTransactionCategories(userID) {
    return fetchData(`get/transactions/categories/${userID}`);
}

function PieChart({ userID }) {
    const categories = fetchTransactionCategories(userID);
    const moneySpent = fetchMoneySpent(userID);

    return (
        <div>
            <PlotStatistics categories={categories} moneySpent={moneySpent} />
        </div>
    )
}

export default PieChart
