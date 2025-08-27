import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://web-production-a113d.up.railway.app/api/logs/")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  // filter logs berdasarkan keyword
  const filteredLogs = logs.filter((log) =>
    [log.event_type, log.source_ip, log.description]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // warna badge severity
  const severityColor = (sev) => {
    switch (sev) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔒 Security Logs Dashboard</h1>

      {/* Search */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search logs (event, IP, description)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabel dalam card */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Event Type</th>
                  <th className="px-4 py-3">Source IP</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No logs found 🚫
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {log.event_type}
                      </td>
                      <td className="px-4 py-3">{log.source_ip}</td>
                      <td className="px-4 py-3">
                        <Badge className={severityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{log.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
