import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'

async function fetchData(url) {
    const response = await fetch(`http://localhost:8080/api/${url}`);
    const data = await response.json();

    return data;
}

function TransactionsTable() {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            const data = await fetchData(`get/transactions/${user.UserID}`);
            setTransactions(data.transactions);
        }

        fetchTransactions();
    }, [user.UserID]);

    return (
        <table>
            {/* Table headers */}
            <thead>
                <tr>
                    <th>TransactionID</th>
                    <th>Amount</th>
                    <th>CategoryID</th>
                    <th>TransactionDate</th>
                </tr>
            </thead>
            {/* Table body */}
            <tbody>
                {/* The key is required for each mapped element in React lists */}
                {transactions?.map((transaction) => (
                    <tr key={transaction?.TransactionID}> {/* Use TransactionID as the unique key */}
                        <td>{transaction?.TransactionID}</td>
                        <td>{transaction?.Amount}</td>
                        <td>{transaction?.CategoryID}</td>
                        <td>{transaction?.TransactionDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactionsTable
