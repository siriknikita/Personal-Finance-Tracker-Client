import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { ColorModeContext, useMode } from "../theme";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

async function fetchData(url) {
    const response = await fetch(`http://localhost:8080/api/${url}`);
    const data = await response.json();

    return data;
}

function GoalTable() {
    const { user } = useContext(UserContext);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        async function fetchGoals() {
            const data = await fetchData(`get/goals/${user.UserID}`);
            setGoals(data.goals);
        }
        fetchGoals();
    }, [user.UserID]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} user={user} />
                    <main className="content">
                        <Topbar
                            isSidebar={isSidebar}
                            setIsSidebar={setIsSidebar}
                        />
                        <table>
                            {/* Table headers */}
                            <thead>
                                <tr>
                                    <th>Goal Description</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody>
                                {/* The key is required for each mapped element in React lists */}
                                {goals?.map((transaction) => (
                                    <tr>
                                        <td>{transaction?.GoalDescription}</td>
                                        <td>{transaction?.Deadline}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default GoalTable
