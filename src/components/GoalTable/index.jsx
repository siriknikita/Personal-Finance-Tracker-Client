import { CssBaseline, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import styles from "./styles.module.css";

async function fetchData(url) {
  const response = await fetch(`/api/${url}`);
  const data = await response.json();

  return data;
}

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("userID", {
    header: () => "User ID",
    cell: (info) => <>{info.getValue()}</>,
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) => <>{info.getValue()}</>,
  }),
  columnHelper.accessor("deadline", {
    header: () => "Deadline",
    cell: (info) => <>{info.getValue()}</>,
  }),
];

function GoalTable() {
  const { user } = useContext(UserContext);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [goals, setGoals] = useState([]);

  const table = useReactTable({
    data: goals,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    async function fetchGoals() {
      const data = await fetchData(`get/goals/${user.userID}`);
      setGoals(data.goals);
    }
    fetchGoals();
  }, [user.userID]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} user={user} />
          <main className="content">
            <Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
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
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default GoalTable;
