import Box from "@mui/material/Box";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import styles from "./styles.module.css";

async function fetchData(url) {
  const response = await fetch(`/api/${url}`);
  return await response.json();
}

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("categoryID", {
    header: () => "Category Name",
    cell: (info) => <>{info.getValue()}</>,
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: (info) => <>{info.getValue()}</>,
  }),
];

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

  const table = useReactTable({
    data: transactions,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      <Box className={styles.container + "content"}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr key={transaction?.id}>
                <td>{transaction?.id}</td>
                <td>{categories[index]}</td>
                <td>{transaction?.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default TransactionsTable;
