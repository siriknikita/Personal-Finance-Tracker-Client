import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../../theme";
import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import styles from "./styles.module.css";

function TransactionForm() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { user } = useContext(UserContext);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [currentCategoryID, setCurrentCategoryID] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:8080/api/add/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: user.UserID,
                    amount: currentAmount,
                    categoryID: currentCategoryID,
                }),
            });
            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            e.target.reset();
            alert("Transaction added successfully!");
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }

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
                        <h3>Add a new transaction!</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Enter amount of money */}
                            <label>
                                Enter amount of money ($):
                                <input 
                                    type="number"
                                    className={styles.input}
                                    placeholder="Amount"
                                    value={currentAmount}
                                    onChange={(e) => setCurrentAmount(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            {/* Choose a category */}
                            <label>
                                Choose a category:
                                <select 
                                    value={currentCategoryID}
                                    onChange={(e) => setCurrentCategoryID(e.target.value)}
                                >
                                    <option value="1">Groceries</option>
                                    <option value="2">Utilities</option>
                                    <option value="3">Rent</option>
                                    <option value="4">Entertainment</option>
                                    <option value="5">Healthcare</option>
                                    <option value="6">Transportation</option>
                                    <option value="7">Other</option>
                                </select>
                            </label>
                            <br />
                            <br />
                            <button className={styles.btn}>Submit</button>
                        </form>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default TransactionForm