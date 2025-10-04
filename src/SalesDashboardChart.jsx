// local-sme-tracker-app/src/SalesDashboardChart.jsx

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Mock Data: Inventory, Sales, and Profit ---
const mockSalesData = [
  { month: "Jan", sales: 4000, profit: 2400, items_sold: 120 },
  { month: "Feb", sales: 3000, profit: 1398, items_sold: 80 },
  { month: "Mar", sales: 5000, profit: 2800, items_sold: 150 },
  { month: "Apr", sales: 4500, profit: 3908, items_sold: 135 },
  { month: "May", sales: 6000, profit: 4800, items_sold: 180 },
  { month: "Jun", sales: 7000, profit: 5300, items_sold: 210 },
];

const SalesDashboardChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulating an API data fetch
  useEffect(() => {
    setTimeout(() => {
      try {
        setData(mockSalesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load sales data.");
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Loading monthly data...
      </div>
    );
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error: {error}
      </div>
    );
  if (data.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        No sales data available.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          color: "#333",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        Local SME Monthly Performance
      </h2>

      {/* Container for the chart */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis
              yAxisId="left"
              stroke="#8884d8"
              tickFormatter={(value) => `$${value / 1000}k`}
              label={{
                value: "Sales/Profit (USD)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ff7300"
              label={{
                value: "Items Sold",
                angle: 90,
                position: "insideRight",
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Items Sold")
                  return [`${value.toLocaleString()} items`, name];
                return [`$${value.toLocaleString()}`, name];
              }}
            />
            <Legend verticalAlign="top" height={36} />

            {/* Total Sales Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Total Sales"
              strokeWidth={2}
            />

            {/* Total Profit Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke="#82ca9d"
              name="Total Profit"
              strokeWidth={2}
            />

            {/* Items Sold Line (uses the right Y-axis) */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="items_sold"
              stroke="#ff7300"
              name="Items Sold"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesDashboardChart;
