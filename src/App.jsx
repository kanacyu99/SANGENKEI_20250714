import React, { useState } from 'react';

const App = () => {
  const [points, setPoints] = useState([]);
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');

  const handleAdd = () => {
    const total = parseFloat(cao) + parseFloat(sio2) + parseFloat(al2o3);
    if (total === 0) return;

    const normalized = {
      label: label,
      cao: parseFloat(cao) / total,
      sio2: parseFloat(sio2) / total,
      al2o3: parseFloat(al2o3) / total,
    };
    setPoints([...points, normalized]);
    setLabel('');
    setCao('');
    setSio2('');
    setAl2o3('');
  };

  const ternaryToCartesian = ({ cao, sio2, al2o3 }) => {
    const x = 0.5 * (2 * cao + al2o3);
    const y = (Math.sqrt(3) / 2) * al2o3;
    return { x, y };
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <div style={{ marginBottom: '10px' }}>
        <input placeholder="ラベル" value={label} onChange={e => setLabel(e.target.value)} />
        <input placeholder="CaO (%)" value={cao} onChange={e => setCao(e.target.value)} />
        <input placeholder="SiO₂ (%)" value={sio2} onChange={e => setSio2(e.target.value)} />
        <input placeholder="Al₂O₃ (%)" value={al2o3} onChange={e => setAl2o3(e.target.value)} />
        <button onClick={handleAdd}>追加</button>
      </div>

      <svg
        viewBox="0 0 1 0.866"
        width="500"
        height="433"
        style={{ backgroundColor: 'white', border: '1px solid gray' }}
      >
        {/* 三角形エリア */}
        <polygon points="0,0 1,0 0.5,0.866" fill="#f0f8ff" stroke="black" />

        {/* 軸ラベル */}
        <text x="0.5" y="-0.02" textAnchor="middle" fontSize="0.025" transform="translate(0,0.03)">
          Al₂O₃ (%)
        </text>
        <text x="0" y="0.02" fontSize="0.025">
          SiO₂ (%)
        </text>
        <text x="1" y="0.02" textAnchor="end" fontSize="0.025">
          CaO (%)
        </text>

        {/* プロットデータ */}
        {points.map((point, index) => {
          const { x, y } = ternaryToCartesian(point);
          return (
            <g key={index}>
              <circle cx={x} cy={0.866 - y} r="0.01" fill="blue" />
              <text x={x} y={0.866 - y - 0.015} fontSize="0.02" textAnchor="middle" fill="black">
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default App;
