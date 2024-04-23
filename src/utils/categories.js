async function fetchData(url) {
    const response = await fetch(
        `https://personal-finance-tracker-server.azurewebsites.net/api/${url}`
    );
    return response.json();
}
export function formatMoneySpentData(data) {
    const categories = Object.keys(data);
    const values = Object.values(data);
    const formattedData = categories.map((category, index) => ({
        name: category,
        value: values[index],
    }));
    return formattedData;
}

export async function getMoneySpent(userID) {
    return await fetchData(
        `get/transactions/moneySpentOnEachCategory/${userID}`
    );
}
