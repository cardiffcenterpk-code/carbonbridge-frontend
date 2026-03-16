import React, { useState } from 'react';
import './App.css';
import Marketplace from './Marketplace';
import Retire from './Retire';
import Admin from './Admin';
import ImpactDashboard from './ImpactDashboard'; // Ensure this matches your filename
import { ethers } from "ethers";

// Contract data from your sources [2-4]
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contractABI = [
  // ... Paste your full ABI array here from your source [3, 4]
];

function App() {
  const [view, setView] = useState('home'); // Default view is Home
  const [walletAddress, setWalletAddress] = useState("");

  // Wallet Connection Logic [5, 6]
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use CarbonBRIDGE!");
    }
  };

  return (
    <div className="App">
      {/* NAVIGATION BAR [1, 6] */}
      <nav className="navbar">
        <div className="logo-area" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          🌿 CarbonBRIDGE
        </div>
        <div className="nav-links">
          <button onClick={() => setView('marketplace')}>Marketplace</button>
          <button onClick={() => setView('retire')}>Retire Tokens</button>
          <button onClick={() => setView('dashboard')} style={{ fontWeight: 'bold', border: '2px solid var(--cb-green)' }}>
            📊 Impact Dashboard
          </button>
          <button onClick={() => setView('admin')}>Admin</button>
          <button className="cta-button" onClick={connectWallet} style={{ padding: '8px 15px', fontSize: '14px' }}>
            {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : "Connect Wallet"}
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA [6] */}
      <main>
        {view === 'home' && (
          <>
            <section className="hero">
              <h1>Bridging Profit and Planet</h1>
              <p>
                CarbonBRIDGE turns verified carbon offsets into liquid digital assets. 
                1 CBR = 1 Metric Ton of CO2 [7].
              </p>
              <button className="cta-button" onClick={() => setView('dashboard')}>
                View Global Impact Dashboard
              </button>
            </section>
            
            <section className="features">
              <div className="feature-card">
                <h3>Dual Transparency</h3>
                <p>Real-time tracking of both financial growth and carbon retirement [8].</p>
              </div>
              <div className="feature-card">
                <h3>Verified Credits</h3>
                <p>Projects audited by Verra and Gold Standard [7].</p>
              </div>
              <div className="feature-card">
                <h3>Instant Liquidity</h3>
                <p>Trade carbon credits as easily as any other digital asset.</p>
              </div>
            </section>
          </>
        )}

        {/* View-specific Components */}
        {view === 'marketplace' && <Marketplace />}
        {view === 'retire' && <Retire />}
        {view === 'dashboard' && <ImpactDashboard />}
        {view === 'admin' && <Admin />}
      </main>

      {/* FOOTER [9, 10] */}
      <footer className="footer">
        <p>© 2026 CarbonBRIDGE | Bridging Profit and Planet</p>
        <p style={{ fontSize: '0.8rem' }}>"Your portfolio grows, while the carbon footprint sinks" [10].</p>
      </footer>
    </div>
  );
}

export default App;