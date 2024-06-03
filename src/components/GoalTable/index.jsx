import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts";
import { fetchData } from "../../services/dataProcessing";
import { formTableColumns } from "../../utils/tables";

function GoalTable() {
  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const columns = formTableColumns(["userID", "description", "deadline"]);

  const table = useReactTable({
    data: goals,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchGoals() {
      const data = await fetchData(`goals/get/${user.userID}`);
      setGoals(data.goals);
    }
    fetchGoals();
  }, [user.userID]);

  return (
    <div>
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GoalTable;
