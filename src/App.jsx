import React, { useState } from 'react';

const TriangleChart = () => {
  const [points, setPoints] = useState([]);
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');

  const chartWidth = 400;
  const chartHeight = Math.sqrt(3) / 2 * chartWidth;

  const convertToXY = (cao, sio2, al2o3) => {
    const total = parseFloat(cao) + parseFloat(sio2) + parseFloat(al2o3);
    if (total === 0) return { x: 0, y: 0 };

    const pCaO = cao / total;
    const pSiO2 = sio2 / total;
    const pAl2O3 = al2o3 / total;

    const x = chartWidth * (0.5 * (2 * pSiO2 + pAl2O3));
    const y = chartHeight * pAl2O3;
    return { x, y };
  };

  const handleAddPoint = () => {
    if (!label || !cao || !sio2 || !al2o3) return;
    const { x, y } = convertToXY(Number(cao), Number(sio2), Number(al2o3));
    const newPoint = { label, x, y };
    setPoints([...points, newPoint]);
    setLabel(''); setCao(''); setSio2(''); setAl2o3('');
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="ラベル" value={label} onChange={(e) => setLabel(e.target.value)} />
        <input placeholder="CaO (%)" value={cao} onChange={(e) => setCao(e.target.value)} type="number" />
        <input placeholder="SiO₂ (%)" value={sio2} onChange={(e) => setSio2(e.target.value)} type="number" />
        <input placeholder="Al₂O₃ (%)" value={al2o3} onChange={(e) => setAl2o3(e.target.value)} type="number" />
        <button onClick={handleAddPoint}>追加</button>
      </div>

      <svg width={chartWidth} height={chartHeight} style={{ border: '1px solid #ccc' }}>
        <polygon
          points={`0,${chartHeight} ${chartWidth},${chartHeight} ${chartWidth / 2},0`}
          fill="#eef6ff" stroke="#333" strokeWidth="2"
        />

        <text x={chartWidth / 2 - 10} y={-5 + 10} fontSize="12">Al₂O₃ (%)</text>
        <text x={0} y={chartHeight + 15} fontSize="12">SiO₂ (%)</text>
        <text x={chartWidth - 40} y={chartHeight + 15} fontSize="12">CaO (%)</text>

        {points.map((pt, index) => (
          <g key={index}>
            <circle cx={pt.x} cy={chartHeight - pt.y} r={4} fill="blue" />
            <text x={pt.x + 5} y={chartHeight - pt.y - 5} fontSize="10">{pt.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TriangleChart;
