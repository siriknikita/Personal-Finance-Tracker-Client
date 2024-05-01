import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import Header from "../../../components/Header";

function TransactionForm() {
  const { user } = useContext(UserContext);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentCategoryID, setCurrentCategoryID] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/add/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.userID,
            amount: currentAmount,
            categoryID: currentCategoryID,
          }),
        }
      );
      if (!response.ok) {
        console.log(response);
        toast.error("Failed to add transaction!");
      }
      navigate("/dashboard");
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction!");
    }
  };

  return (
    <>
      <Header
        title="Add a transaction"
        subtitle="Enter your transaction details"
      />
      <form onSubmit={handleSubmit}>
        {/* Enter amount of money */}
        <label>
          Enter amount of money ($):
          <input
            type="number"
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
        <button>Submit</button>
      </form>
    </>
  );
}

export default TransactionForm;
