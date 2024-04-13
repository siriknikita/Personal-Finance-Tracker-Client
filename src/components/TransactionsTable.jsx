import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'

async function fetchData(url) {
    const response = await fetch(`/api/${url}`);
    return await response.json();
}

function TransactionsTable() {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const categories = fetchData(`get/transactions/categrories/${user.userID}`);

    useEffect(() => {
        async function fetchTransactions() {
            const data = await fetchData(`get/transactions/${user.userID}`);
            setTransactions(data.transactions);
        }

        fetchTransactions();
    }, [user.userID]);

    return (
        <table>
            {/* Table headers */}
            <thead>
            <tr>
                <th>TransactionID</th>
                <th>CategoryID</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {transactions?.map((transaction, index) => (
                <tr key={transaction?.id}>
                {" "}
                <td>{transaction?.id}</td>
                <td>{categories[index]}</td>
                <td>{transaction?.amount}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TransactionsTable
