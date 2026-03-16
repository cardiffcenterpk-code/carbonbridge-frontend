// src/App.js
import React, { useState } from 'react';
import './App.css';
import Marketplace from './Marketplace';
import Retire from './Retire'; // NEW: Import the retire component
import Admin from './Admin';
// src/App.js (Updated with Wallet Logic)
import { ethers } from "ethers";

// You will need to run: npm install chart.js react-chartjs-2
import { Line } from 'react-chartjs-2';
// IMPORTANT: Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Replace these with your actual data from Remix
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// You need to define your contractABI here
const contractABI = [[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "certificateID",
				"type": "string"
			}
		],
		"name": "Retired",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "retire",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; // Add your actual ABI here

async function connectWallet() {
  if (window.ethereum) {
    try {
      // 1. Request account access from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // 2. Connect to your CarbonBRIDGE Contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const address = await signer.getAddress();
      console.log("Connected to:", address);
      return { contract, address };
    } catch (error) {
      console.error("Connection failed", error);
    }
  } else {
    alert("Please install MetaMask to use CarbonBRIDGE!");
  }
}

const BottomImpactGraph = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Cumulative CO2 Retired (Metric Tons)',
      data: [65, 59, 80, 81, 56, 55, 40], 
      borderColor: '#00b894',
      backgroundColor: 'rgba(0, 184, 148, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metric Tons CO2'
        }
      }
    }
  };

  return (
    <div style={{ padding: '40px', background: '#fff', borderTop: '2px solid #eee', marginTop: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#2d3436' }}>Real-Time Proof of Impact Ledger</h3>
      <div style={{ height: '300px', maxWidth: '900px', margin: '0 auto' }}>
        <Line data={data} options={options} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#636e72', marginTop: '10px' }}>
        "Your portfolio grows, while the carbon footprint sinks" [4, 7].
      </p>
    </div>
  );
};

function App() {
  const [view, setView] = useState('home');

  // Inside your App function
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async () => {
    const connection = await connectWallet();
    if (connection) {
      setWalletAddress(connection.address);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-area">
          <span style={{cursor: 'pointer'}} onClick={() => setView('home')}>🌿 CarbonBRIDGE</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setView('marketplace')}>Marketplace</button>
          <button onClick={() => setView('retire')}>Retire Tokens</button> {/* UPDATED */}
          
          <button onClick={() => setView('admin')}>Admin</button>

          {/* NEW: Dashboard Button */}
          <button 
            onClick={() => setView('dashboard')}
            style={{ fontWeight: 'bold', color: '#0984e3', border: '1px solid #0984e3', borderRadius: '5px' }}
          >
            📊 Impact Dashboard
          </button>

          <button onClick={handleConnect} style={{background: '#2d5a27', color: 'white'}}>
          {walletAddress ? `Connected: ${walletAddress.substring(0,6)}...` : "Connect Wallet"}
          </button>
        </div>
      </nav>

      {/* Logic to switch between views */}
      {view === 'home' && (
        <>
          <header className="hero">
            <h1>Bridging Profit and Planet</h1>
            <p>
              The first digital asset where your portfolio grows while the carbon footprint sinks. 
              Each CBR token is backed 1:1 by verified high-integrity Carbon Credits.
            </p>
            <button className="cta-button" onClick={() => setView('marketplace')}>Explore Marketplace</button>
          </header>
          <section className="features">
            <div className="feature-card">
              <h3>1:1 Backing</h3>
              <p>Every token corresponds to 1 verified carbon credit (1 MT of CO2e) in our vault.</p>
            </div>
            <div className="feature-card">
              <h3>Net Zero Ledger</h3>
              <p>All network emissions are neutralized via credit retirement, ensuring net-zero impact.</p>
            </div>
            <div className="feature-card">
              <h3>Verified Impact</h3>
              <p>On-chain records provide immutable proof of carbon credit acquisition and retirement.</p>
            </div>
          </section>
        </>
      )}

      {view === 'marketplace' && <Marketplace />}
      {view === 'retire' && <Retire />} {/* NEW VIEW */}
      {view === 'admin' && <Admin />}

      {/* --- CHART AT THE BOTTOM --- */}
      <BottomImpactGraph />

      <footer className="footer">
        <p>© 2026 Carbon Bridge Crypto Inc. | USA & UAE Compliance</p>
        <p style={{fontSize: '12px', marginTop: '10px'}}>Verified by Verra, CORSIA, and Gold Standard</p>
      </footer>
    </div>
  );
}

export default App;