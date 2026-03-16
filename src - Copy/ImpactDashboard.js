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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ImpactDashboard = () => {
  // ==========================================
  // MOCK DATA SECTION (Replace with API calls later)
  // ==========================================
  
  // Mock Stats for the Top Highlights [4, 5]
  const stats = {
    totalCO2Retired: "12,450", // 1 CBR = 1 MT CO2 [6]
    projectsFunded: 24,
    livesImpacted: "1.2M", // Based on social impact goals [7]
    totalVolumeCBR: "500,000"
  };

  // Mock Data for "Monthly Offset Growth" Graph [3]
  const offsetGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Metric Tons CO2 Retired',
        data: , // MOCK VALUES
        borderColor: '#00b894', // Green leaf color [2]
        backgroundColor: 'rgba(0, 184, 148, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Mock Data for "Credit Vault Distribution" [6, 8]
  const vaultDistributionData = {
    labels: ['Reforestation', 'Ocean Cleanup', 'Renewable Energy', 'Wetlands'],
    datasets: [
      {
        data: [9-12], // MOCK PERCENTAGES
        backgroundColor: [
          '#2ecc71', // Reforestation Green
          '#3498db', // Ocean Blue [2]
          '#f1c40f', // Energy Yellow
          '#16a085', // Wetlands Dark Green
        ],
        hoverOffset: 4,
      },
    ],
  };

  // ==========================================
  // END MOCK DATA SECTION
  // ==========================================

  const containerStyle = {
    padding: '40px',
    background: 'linear-gradient(135deg, #f0fff4 0%, #e6f7ff 100%)', // Light Green to Blue Gradient [2]
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  };

  const heroStatStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2d3436',
    margin: '10px 0'
  };

  return (
    <div style={containerStyle}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#2d3436' }}>Public Impact Dashboard</h1>
        <p style={{ color: '#636e72' }}>Real-time tracking of the On-Chain Carbon Ledger [5]</p>
      </header>

      {/* Hero Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <span style={{ color: '#00b894', fontWeight: 'bold' }}>🍃 TOTAL CO2 OFFSET</span>
          <div style={heroStatStyle}>{stats.totalCO2Retired} MT</div>
          <small>Verified by Verra/Gold Standard [13]</small>
        </div>
        <div style={cardStyle}>
          <span style={{ color: '#0984e3', fontWeight: 'bold' }}>🌉 PROJECTS FUNDED</span>
          <div style={heroStatStyle}>{stats.projectsFunded}</div>
          <small>Nature-Based Solutions [2]</small>
        </div>
        <div style={cardStyle}>
          <span style={{ color: '#6c5ce7', fontWeight: 'bold' }}>👥 LIVES IMPROVED</span>
          <div style={heroStatStyle}>{stats.livesImpacted}</div>
          <small>At the base of social pyramid [7]</small>
        </div>
      </div>

      {/* Graphs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={cardStyle}>
          <h3>Cumulative Carbon Retirement Growth</h3>
          <Line data={offsetGrowthData} options={{ responsive: true }} />
        </div>
        <div style={cardStyle}>
          <h3>Credit Vault Distribution</h3>
          <Doughnut data={vaultDistributionData} />
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#636e72' }}>
            Each token is 1:1 backed by verified credits [6, 8].
          </p>
        </div>
      </div>


      {/* ========================================== */}
    {/* INSERT THE NEW WIDGET HERE */}
    {/* This anchors your 1:1 CBR backing within the $50B global market [2, 3] */}
    <CarbonMarketWidget />
    {/* ========================================== */}

      <footer style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <p><strong>CarbonBRIDGE:</strong> Bridging Profit and Planet [14]</p>
        <small>Transparent • Traceable • Verifiable [4]</small>
      </footer>
    </div>
  );
};


// ==========================================
// MOCK LIVE FEED DATA (Replace with API calls to the Ledger later)
// ==========================================
const mockLedgerEntries = [
  { id: '0x3a1b...', type: 'RETIREMENT', amount: '250', project: 'Amazon Rainforest Reforestation', time: '2 mins ago' },
  { id: '0x9f2e...', type: 'MINT', amount: '1000', project: 'N/A (Credit Vault Deposit)', time: '15 mins ago' },
  { id: '0x1c4d...', type: 'RETIREMENT', amount: '15', project: 'Ocean Plastic Cleanup - Indonesia', time: '1 hour ago' },
  { id: '0x7b8a...', type: 'RETIREMENT', amount: '120', project: 'Solar Farm - UAE', time: '3 hours ago' },
];
// ==========================================
// END MOCK DATA SECTION
// ==========================================

const LiveImpactFeed = () => {
  const feedHeaderStyle = {
    borderBottom: '2px solid #00b894',
    paddingBottom: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 2fr 1fr',
    padding: '15px',
    borderBottom: '1px solid #eee',
    fontSize: '0.9rem',
    color: '#2d3436'
  };

  return (
    <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', marginTop: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={feedHeaderStyle}>
        <h3 style={{ margin: 0 }}>On-Chain Carbon Ledger</h3>
        <span style={{ color: '#00b894', fontWeight: 'bold' }}>● LIVE UPDATES</span>
      </div>
      
      {/* Header Row */}
      <div style={{ ...rowStyle, fontWeight: 'bold', background: '#f9f9f9' }}>
        <span>Transaction ID</span>
        <span>Action</span>
        <span>Project Impacted</span>
        <span>Amount (CBR)</span>
      </div>

      {/* Mock Data Rows */}
      {mockLedgerEntries.map((entry, index) => (
        <div key={index} style={rowStyle}>
          <span style={{ color: '#0984e3', fontFamily: 'monospace' }}>{entry.id}</span>
          <span style={{ 
            color: entry.type === 'RETIREMENT' ? '#d63031' : '#00b894', 
            fontWeight: 'bold' 
          }}>
            {entry.type}
          </span>
          <span>{entry.project}</span>
          <span style={{ fontWeight: 'bold' }}>{entry.amount} MT</span>
        </div>
      ))}
      
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#636e72', fontSize: '0.8rem' }}>
        Every retirement permanently cancels the underlying credit to create measurable impact [7].
      </p>
    </div>
  );
};

const CarbonMarketWidget = () => {
  // DATA FROM SOURCE [3]: Carbon Pricing Instruments around the world, 2025
  const globalMarketStats = {
    instruments: 113,
    national: 55,
    subnational: 44,
    ets: 37,
    carbonTax: 43
  };

  const widgetStyle = {
    background: '#fff',
    borderRadius: '15px',
    padding: '30px',
    marginTop: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    borderLeft: '5px solid #0984e3' // World Bank Blue
  };

  const statBoxStyle = {
    textAlign: 'center',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '10px'
  };

  return (
    <div style={widgetStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>🌍 Global Carbon Market Context</h3>
        <span style={{ fontSize: '0.8rem', color: '#636e72' }}>Source: World Bank Carbon Pricing Dashboard [4]</span>
      </div>

      {/* Market Coverage Counters from Source [3] */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={statBoxStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{globalMarketStats.instruments}</div>
          <div style={{ fontSize: '0.7rem', color: '#636e72' }}>INSTRUMENTS IMPLEMENTED</div>
        </div>
        <div style={statBoxStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{globalMarketStats.national}</div>
          <div style={{ fontSize: '0.7rem', color: '#636e72' }}>NATIONAL JURISDICTIONS</div>
        </div>
        <div style={statBoxStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{globalMarketStats.ets}</div>
          <div style={{ fontSize: '0.7rem', color: '#636e72' }}>ETS SYSTEMS</div>
        </div>
        <div style={statBoxStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{globalMarketStats.carbonTax}</div>
          <div style={{ fontSize: '0.7rem', color: '#636e72' }}>CARBON TAXES</div>
        </div>
      </div>

      {/* Comparison Logic from Source [1, 5] */}
      <div style={{ background: 'linear-gradient(135deg, #f0fff4 0%, #e6f7ff 100%)', padding: '20px', borderRadius: '10px' }}>
        <h4 style={{ marginTop: 0, color: '#2d3436' }}>CBR Token Utility vs. Global Standards</h4>
        <p style={{ fontSize: '0.9rem', color: '#2d3436', lineHeight: '1.5' }}>
          Unlike traditional credits that are illiquid [6], CarbonBRIDGE is <strong>tethered to the price of carbon credits</strong> [1]. 
          We align with <strong>Article 6.2 of the Paris Agreement</strong> [2] and emerging standards (SEC/UAE) [7, 8] to provide 
          <strong>provable offsets</strong> [9] that are verified by <strong>Verra and Gold Standard</strong> [7, 10].
        </p>
      </div>
    </div>
  );
};



export default LiveImpactFeed;
export default ImpactDashboard;