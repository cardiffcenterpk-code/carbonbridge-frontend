// src/Marketplace.js
import React from 'react';

const projects = [
  { id: 1, name: "Amazon Rainforest Restoration", type: "Nature-Based", location: "Brazil", price: "25.00", standard: "Verra" },
  { id: 2, name: "Solar Wind Farm Initiative", type: "Renewable Energy", location: "India", price: "18.50", standard: "Gold Standard" },
  { id: 3, name: "Mangrove Protection Project", type: "Nature-Based", location: "Indonesia", price: "22.00", standard: "CORSIA" }
];

function Marketplace() {
  return (
    <div style={{ padding: '50px' }}>
      <h2 style={{ color: '#2d5a27', textAlign: 'center' }}>CarbonBRIDGE Marketplace</h2>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Explore projects verified by leading registries. 1 CBR token = 1 Metric Tonne of CO2.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {projects.map(project => (
          <div key={project.id} style={{
            border: '1px solid #ddd', 
            borderRadius: '15px', 
            padding: '20px', 
            width: '280px',
            background: 'white',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{project.type === "Nature-Based" ? "🌳" : "☀️"}</div>
            <h3 style={{ color: '#005b96', marginTop: '0' }}>{project.name}</h3>
            <p><strong>Location:</strong> {project.location}</p>
            <p><strong>Standard:</strong> {project.standard}</p>
            <hr />
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>${project.price} <span style={{ fontSize: '14px', color: '#666' }}>per CBR</span></p>
            <button style={{
              width: '100%', 
              padding: '10px', 
              background: '#2d5a27', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>Buy CBR Tokens</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;