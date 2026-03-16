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

// Import images from your src folder
import PriceAggImg from './Price_ agg.png'; 
import TaxEtsImg from './tax ets.avif';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);



// --- COMPONENT: GLOBAL INSIGHT CARD ---
const GlobalInsightCard = ({ title, img, description }) => (
  <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
    <h3 style={{ color: '#2d5a27', borderBottom: '2px solid #f0f4f2', paddingBottom: '10px' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center', marginTop: '20px' }}>
      <img src={img} alt={title} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
      <p style={{ fontSize: '0.95rem', color: '#2c3e50', lineHeight: '1.6' }}>{description}</p>
    </div>
  </div>
);



// --- WIDGET: GLOBAL MARKET CONTEXT (From World Bank Data) ---
const CarbonMarketWidget = () => {
  const stats = { instruments: 113, national: 55, subnational: 44 }; // [1]
  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', marginTop: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: '5px solid #005b96' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>🌍 Global Carbon Market Context</h3>
        <span style={{ fontSize: '0.8rem', color: '#636e72' }}>Source: World Bank Dashboard [2]</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', textAlign: 'center' }}>
        <div><div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{stats.instruments}</div><small>Instruments</small></div>
        <div><div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{stats.national}</div><small>Nations</small></div>
        <div><div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{stats.subnational}</div><small>Subnational</small></div>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#2c3e50', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        CarbonBRIDGE is aligned with <strong>Article 6.2 of the Paris Agreement</strong> and verified by <strong>Verra/Gold Standard</strong> [3, 4].
      </p>
    </div>
  );
};

// --- COMPONENT: LIVE IMPACT FEED ---
const LiveImpactFeed = () => {
  const entries = [
    { id: '0x3a1b...', type: 'RETIREMENT', amount: '250', project: 'Amazon Reforestation', time: '2 mins ago' },
    { id: '0x9f2e...', type: 'MINT', amount: '1000', project: 'Vault Deposit', time: '15 mins ago' }
  ];
  return (
    <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', marginTop: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ borderBottom: '2px solid #2d5a27', paddingBottom: '10px' }}>On-Chain Carbon Ledger</h3>
      {entries.map((entry, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr', padding: '12px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#005b96', fontFamily: 'monospace' }}>{entry.id}</span>
          <span style={{ fontWeight: 'bold', color: entry.type === 'RETIREMENT' ? '#d63031' : '#2d5a27' }}>{entry.type}</span>
          <span>{entry.project}</span>
          <span style={{ textAlign: 'right', fontWeight: 'bold' }}>{entry.amount} MT</span>
        </div>
      ))}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ImpactDashboard = () => {
  const stats = { totalCO2Retired: "12,450", livesImpacted: "1.2M" }; // [5]

  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Metric Tons CO2 Retired',
      data: [23, 28, 38, 29, 22, 39], // Mock Values fixed from your [6]
      borderColor: '#2d5a27',
      backgroundColor: 'rgba(45, 90, 39, 0.1)',
      fill: true, tension: 0.4
    }]
  };

  const distributionData = {
    labels: ['Reforestation', 'Ocean Cleanup', 'Energy', 'Wetlands'],
    datasets: [{
      data: [23, 28, 38, 29, 37, 22], // Fixed from your [6]
      backgroundColor: ['#2d5a27', '#005b96', '#f1c40f', '#16a085']
    }]
  };

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #f0f4f2 0%, #e6f7ff 100%)', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2d5a27' }}>Public Impact Dashboard</h1>
        <p style={{ color: '#2c3e50' }}>"Your portfolio grows, while the carbon footprint sinks" [7]</p>
      </header>

      {/* Hero Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#2d5a27', fontWeight: 'bold' }}>TOTAL CO2 OFFSET</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.totalCO2Retired} MT</div>
        </div>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#005b96', fontWeight: 'bold' }}>LIVES IMPACTED</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.livesImpacted}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px' }}>
          <h3>Cumulative Carbon Retirement Growth</h3>
          <Line data={growthData} />
        </div>
        <div style={{ background: '#fff', padding: '25px', borderRadius: '15px' }}>
          <h3>Vault Distribution</h3>
          <Doughnut data={distributionData} />
        </div>
      </div>

      {/* NEW: GLOBAL MARKET ANALYSIS (Your requested images) */}
      <h2 style={{ color: '#2d5a27', marginBottom: '20px' }}>Global Market Benchmarks</h2>
      
      <GlobalInsightCard 
        title="Aggregate Real Carbon Price Indices"
        img={PriceAggImg}
        description="These indices represent the current or historical price of carbon across various jurisdictions. By excluding regions without carbon prices, this metric provides a realistic look at market value. Note that as new jurisdictions introduce emissions trading schemes or carbon taxes, there may be discontinuous changes in the indices. CarbonBRIDGE uses this data to ensure CBR tokens remain tethered to real-world carbon value."
      />

      <GlobalInsightCard 
        title="Aggregate Real Price Index by Tax/ETS"
        img={TaxEtsImg}
        description="This index compares the effectiveness and pricing levels of Carbon Taxes versus Emissions Trading Systems (ETS) globally. Understanding this split is vital for our enterprise partners as they navigate different regulatory compliance mechanisms across the 55 national jurisdictions currently implementing carbon pricing [5]."
      />




      {/* Integration of Widget and Ledger */}
      <CarbonMarketWidget />
      <LiveImpactFeed />
    </div>
  );
};

export default ImpactDashboard;