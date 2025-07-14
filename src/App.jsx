import React, { useState } from 'react';

function App() {
  const [points, setPoints] = useState([]);
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');

  const handleAddPoint = () => {
    const x = parseFloat(cao);
    const y = parseFloat(sio2);
    const z = parseFloat(al2o3);
    if (isNaN(x) || isNaN(y) || isNaN(z) || x + y + z !== 100) {
      alert('CaO + SiO₂ + Al₂O₃ の合計を100%にしてください');
      return;
    }
    setPoints([...points, { label, cao: x, sio2: y, al2o3: z }]);
    setLabel('');
    setCao('');
    setSio2('');
    setAl2o3('');
  };

  const ternaryToCartesian = ({ cao, sio2, al2o3 }) => {
    const sum = cao + sio2 + al2o3;
    const c = cao / sum;
    const s = sio2 / sum;
    const a = al2o3 / sum;
    const x = 0.5 * (2 * s + a) / (a + s + c);
    const y = (Math.sqrt(3) / 2) * a / (a + s + c);
    return { x, y };
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="ラベル" value={label} onChange={e => setLabel(e.target.value)} />
        <input placeholder="CaO (%)" value={cao} onChange={e => setCao(e.target.value)} />
        <input placeholder="SiO₂ (%)" value={sio2} onChange={e => setSio2(e.target.value)} />
        <input placeholder="Al₂O₃ (%)" value={al2o3} onChange={e => setAl2o3(e.target.value)} />
        <button onClick={handleAddPoint}>追加</button>
      </div>

      <svg viewBox="0 0 1 0.866" width="500" height="433" style={{ border: '1px solid #ccc', background: 'white' }}>
        {/* ▼ 背景白（重要） */}
        <rect x="0" y="0" width="1" height="0.866" fill="white" />

        {/* ▼ 三角形エリア */}
        <polygon points="0,0 1,0 0.5,0.866" fill="#f0f8ff" stroke="black" strokeWidth="0.003" />

        {/* ▼ 軸ラベル */}
        <text x="0.5" y="-0.02" fontSize="0.03" textAnchor="middle">Al₂O₃ (%)</text>
        <text x="-0.03" y="0.02" fontSize="0.03" textAnchor="start">SiO₂ (%)</text>
        <text x="1.03" y="0.02" fontSize="0.03" textAnchor="end">CaO (%)</text>

        {/* ▼ データポイント */}
        {points.map((p, i) => {
          const { x, y } = ternaryToCartesian(p);
          return (
            <g key={i}>
              <circle cx={x} cy={0.866 - y} r={0.01} fill="blue" />
              <text x={x + 0.015} y={0.866 - y} fontSize="0.025" fill="black">{p.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default App;
