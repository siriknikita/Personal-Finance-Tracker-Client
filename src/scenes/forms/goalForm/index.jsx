import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { ColorModeContext, useMode } from "../../../theme";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

function GoalForm() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { user } = useContext(UserContext);
    const [goalDescripiton, setGoalDescription] = useState("");
    const [deadline, setDeadline] = useState(undefined);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/set/goal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: user.userID,
                    goal: goalDescripiton,
                    deadline: deadline,
                }),
            });
            navigate("/goals");
        } catch (error) {
            console.error(error);
        }
    };

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
                        <h3>Set your goals!</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Goal:</label>
                            <br />
                            <input
                                type="text"
                                value={goalDescripiton}
                                placeholder="Your goal description"
                                onChange={(e) =>
                                    setGoalDescription(e.target.value)
                                }
                            />
                            <br />
                            <label>Deadline:</label>
                            <br />
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <br />
                            <button>Submit</button>
                        </form>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default GoalForm;
