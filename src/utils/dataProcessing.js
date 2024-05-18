// TODO: Move fetching outside of utils in service or requests folder

export async function fetchData(url, key) {
    const response = await fetch(
        `https://personal-finance-tracker-server.azurewebsites.net/api/${url}`
    );
    const data = await response.json();
    return data[key];
}
