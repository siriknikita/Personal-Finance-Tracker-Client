import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getMoneySpent, formatMoneySpentData } from "../utils/categories";

const CategoriesPieChart = async ({ userID }) => {
    const moneySpentData = getMoneySpent(userID);
    const data = formatMoneySpentData(moneySpentData);

    return (
        <ResponsiveContainer width="30%" height="30%">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CategoriesPieChart;
