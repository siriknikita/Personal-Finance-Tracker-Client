async function fetchData(url) {
    const response = await fetch(`/api/${url}`);
    return response.json();
}

export default async function getMoneySpent(userID) {
    return await fetchData(`get/transactions/moneySpentOnEachCategory/${userID}`);
}
