import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CategoryChart({
  categoryDistribution,
}) {
  const data = Object.entries(
    categoryDistribution
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryChart;