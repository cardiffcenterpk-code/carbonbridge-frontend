import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

// --- 1. GLOBAL MARKET WIDGET (Data from World Bank Source [7]) ---
const CarbonMarketWidget = () => {
  const stats = { instruments: 113, national: 55, subnational: 44 };
  return (
    <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', marginTop: '30px', borderLeft: '5px solid #0984e3', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 15px 0' }}>🌍 Global Carbon Market Context</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', textAlign: 'center' }}>
        <div><strong>{stats.instruments}</strong><br/><small>Total Instruments</small></div>
        <div><strong>{stats.national}</strong><br/><small>National Nations</small></div>
        <div><strong>{stats.subnational}</strong><br/><small>Subnational</small></div>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#636e72', marginTop: '15px' }}>
        Source: World Bank Carbon Pricing Dashboard. Aligned with <strong>Article 6.2 of the Paris Agreement</strong> [8].
      </p>
    </div>
  );
};

// --- 2. LIVE IMPACT FEED (On-Chain Carbon Ledger [6, 9]) ---
const LiveImpactFeed = () => {
  const entries = [
    { id: '0x3a1b...', type: 'RETIREMENT', amount: '250', project: 'Amazon Reforestation', time: '2 mins ago' },
    { id: '0x9f2e...', type: 'MINT', amount: '1000', project: 'Vault Deposit', time: '15 mins ago' }
  ];
  return (
    <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', marginTop: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ borderBottom: '2px solid #00b894', paddingBottom: '10px' }}>On-Chain Carbon Ledger</h3>
      {entries.map((entry, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr', padding: '12px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#0984e3', fontFamily: 'monospace' }}>{entry.id}</span>
          <span style={{ fontWeight: 'bold', color: entry.type === 'RETIREMENT' ? '#d63031' : '#00b894' }}>{entry.type}</span>
          <span>{entry.project}</span>
          <span style={{ textAlign: 'right', fontWeight: 'bold' }}>{entry.amount} MT</span>
        </div>
      ))}
    </div>
  );
};

// --- 3. MAIN DASHBOARD COMPONENT ---
const ImpactDashboard = () => {
  // Mock Data: 1 CBR = 1 MT CO2 [9, 10]
  const stats = { totalCO2Retired: "12,450", livesImpacted: "1.2M" };
  
  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Metric Tons CO2 Retired',
      data: , // Fixed data array [11]
      borderColor: '#00b894',
      backgroundColor: 'rgba(0, 184, 148, 0.2)',
      fill: true, tension: 0.4
    }]
  };

  const distributionData = {
    labels: ['Reforestation', 'Ocean Cleanup', 'Energy', 'Wetlands'],
    datasets: [{
      data: [12-15],
      backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#16a085']
    }]
  };

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #f0fff4 0%, #e6f7ff 100%)', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2d3436' }}>Public Impact Dashboard</h1>
        <p style={{ color: '#636e72' }}>"Your portfolio grows, while the carbon footprint sinks" [16]</p>
      </header>

      {/* Hero Stats Section */}
      <CarbonMarketWidget />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
          <div style={{ color: '#00b894', fontWeight: 'bold' }}>TOTAL CO2 OFFSET</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.totalCO2Retired} MT</div>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
          <div style={{ color: '#0984e3', fontWeight: 'bold' }}>LIVES IMPACTED</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.livesImpacted}</div>
        </div>
      </div>

      {/* Graphs Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px' }}>
          <h3>Monthly Offset Growth</h3>
          <Line data={growthData} />
        </div>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px' }}>
          <h3>Vault Distribution</h3>
          <Doughnut data={distributionData} />
        </div>
        
      </div>

      {/* Global Widget & Live Feed - MUST BE CALLED HERE */}
      
      <LiveImpactFeed />
    </div>
  );
};

export default ImpactDashboard;