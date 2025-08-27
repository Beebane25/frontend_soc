import { useEffect, useState } from "react";

export default function LogsTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("https://web-production-a113d.up.railway.app/api/logs/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched logs:", data);
        setLogs(data);
      })
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Security Logs</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Timestamp</th>
            <th className="border px-4 py-2">Event Type</th>
            <th className="border px-4 py-2">Source IP</th>
            <th className="border px-4 py-2">Severity</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No logs found
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{log.event_type}</td>
                <td className="border px-4 py-2">{log.source_ip}</td>
                <td className="border px-4 py-2">{log.severity}</td>
                <td className="border px-4 py-2">{log.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
