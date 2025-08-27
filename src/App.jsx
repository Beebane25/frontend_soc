import React, { useEffect, useState } from "react";

export default function LogsTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("https://web-production-a113d.up.railway.app/api/logs/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Logs dari backend:", data);
        setLogs(data); // langsung array dari backend
      })
      .catch((err) => console.error("Error fetch logs:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Security Logs</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Timestamp</th>
              <th className="px-4 py-2 border">Event Type</th>
              <th className="px-4 py-2 border">Source IP</th>
              <th className="px-4 py-2 border">Severity</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{log.id}</td>
                  <td className="px-4 py-2 border">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{log.event_type}</td>
                  <td className="px-4 py-2 border">{log.source_ip}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      log.severity === "HIGH"
                        ? "text-red-600"
                        : log.severity === "MEDIUM"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {log.severity}
                  </td>
                  <td className="px-4 py-2 border">{log.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-3 text-center text-gray-500 italic"
                >
                  No logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
