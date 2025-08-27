import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function App() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("/api/logs/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched logs:", data);
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching logs:", err);
        setLoading(false);
      });
  }, []);

  const pieData = [
    { name: "Login Fail", value: stats.login_fail || 0 },
    { name: "Brute Force", value: stats.brute_force || 0 },
    { name: "Port Scan", value: stats.port_scan || 0 },
    { name: "Malware", value: stats.malware || 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Mini SOC Dashboard</h1>

      {/* Chart Section */}
      <div className="mb-6 flex justify-center">
        <PieChart width={350} height={350}>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={["#8884d8", "#82ca9d", "#ffc658", "#ff4d4f"][index]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Table Section */}
      <h2 className="text-xl font-semibold mb-2">Logs</h2>
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2">Time</th>
            <th className="border px-2">Event</th>
            <th className="border px-2">IP</th>
            <th className="border px-2">Severity</th>
            <th className="border px-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td className="border px-2">{log.timestamp}</td>
              <td className="border px-2">{log.event_type}</td>
              <td className="border px-2">{log.source_ip}</td>
              <td className="border px-2">{log.severity}</td>
              <td className="border px-2">{log.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
