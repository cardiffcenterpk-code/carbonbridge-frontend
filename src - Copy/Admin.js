// src/Admin.js
import React, { useEffect, useState } from 'react';

function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetching from our local Node.js server
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <h2 style={{ color: '#2d5a27' }}>Admin Dashboard: Net Zero Ledger</h2>
      <p>Real-time tracking of carbon credit generation and retirement [3].</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#2d5a27', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Amount (CBR)</th>
            <th>Project</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{log.id}</td>
              <td>{log.user}</td>
              <td><span style={{color: log.type === 'RETIRE' ? 'red' : 'green', fontWeight: 'bold'}}>{log.type}</span></td>
              <td>{log.amount} MT</td>
              <td>{log.project}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;