import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import PageLayout from "../../../components/PageLayout/PageLayout";

function GoalForm() {
  const { user } = useContext(UserContext);
  const [goalDescripiton, setGoalDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/set/goal`, {
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
      toast.success("Goal added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add goal!");
    }
  };

  return (
    <PageLayout>
      <h3>Set your goals!</h3>
      <form onSubmit={handleSubmit}>
        <label>Goal:</label>
        <br />
        <input
          type="text"
          value={goalDescripiton}
          placeholder="Your goal description"
          onChange={(e) => setGoalDescription(e.target.value)}
        />
        <br />
        <label>Deadline:</label>
        <br />
        <input
          type="date"
          value={deadline}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
    </PageLayout>
  );
}

export default GoalForm;
