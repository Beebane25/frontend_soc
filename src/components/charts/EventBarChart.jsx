import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function EventBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="event_type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
