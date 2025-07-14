import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');
  const [points, setPoints] = useState([]);

  const addPoint = () => {
    const c = parseFloat(cao);
    const s = parseFloat(sio2);
    const a = parseFloat(al2o3);
    const sum = c + s + a;
    if (sum === 0) return;
    const normC = c / sum;
    const normS = s / sum;
    const normA = a / sum;
    const x = 0.5 * (2 * normS + normA);
    const y = (Math.sqrt(3) / 2) * normA;
    setPoints([...points, { label, x, y }]);
    setLabel('');
    setCao('');
    setSio2('');
    setAl2o3('');
  };

  const layout = {
    title: {
      text: '三元系スラグ状態図（CaO–SiO₂–Al₂O₃）',
      font: { size: 24 },
    },
    xaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      range: [0, 1],
    },
    yaxis: {
      showgrid: false,
      zeroline: false,
      showticklabels: false,
      range: [0, Math.sqrt(3) / 2],
    },
    shapes: [
      {
        type: 'path',
        path: `
          M 0 ${Math.sqrt(3) / 2}
          L 1 ${Math.sqrt(3) / 2}
          L 0.5 0
          Z
        `,
        fillcolor: 'rgba(173, 216, 230, 0.2)',
        line: { color: 'black' },
      },
    ],
    annotations: [
      {
        x: 0.5,
        y: Math.sqrt(3) / 2 + 0.05,
        text: 'Al₂O₃ (%)',
        showarrow: false,
        font: { size: 14 },
      },
      {
        x: 0,
        y: Math.sqrt(3) / 2,
        text: 'SiO₂ (%)',
        showarrow: false,
        font: { size: 14 },
        xanchor: 'right',
      },
      {
        x: 1,
        y: Math.sqrt(3) / 2,
        text: 'CaO (%)',
        showarrow: false,
        font: { size: 14 },
        xanchor: 'left',
      },
    ],
    width: 600,
    height: 600,
  };

  const data = [
    ...points.map((p) => ({
      x: [p.x],
      y: [p.y],
      type: 'scatter',
      mode: 'markers+text',
      marker: { color: 'blue', size: 10 },
      text: [p.label],
      textposition: 'top center',
    })),
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="ラベル"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          placeholder="CaO (%)"
          value={cao}
          onChange={(e) => setCao(e.target.value)}
        />
        <input
          placeholder="SiO₂ (%)"
          value={sio2}
          onChange={(e) => setSio2(e.target.value)}
        />
        <input
          placeholder="Al₂O₃ (%)"
          value={al2o3}
          onChange={(e) => setAl2o3(e.target.value)}
        />
        <button onClick={addPoint}>追加</button>
      </div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default App;
