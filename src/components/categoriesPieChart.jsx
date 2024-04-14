import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import getMoneySpent from "../utils/categories";

export default async function CategoriesPieChart() {
    const moneySpentData = [
        { name: "Groceries", value: 32 },
        { name: "Utilities", value: 30 },
        { name: "Entertainment", value: 16 },
        { name: "Rent", value: 31 },
        { name: "Healthcare", value: 16 },
    ];

    // const categories = Object.keys(moneySpentData);
    // const values = Object.values(moneySpentData);
    // const data = {
    //     name: categories,
    //     value: values,
    // };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={moneySpentData}
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
