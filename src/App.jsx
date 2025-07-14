import React, { useState } from 'react';

const initialPoints = [
  { label: '水砕/フレッシュ', x: 33, y: 33, visible: true },
  { label: '調整池', x: 25, y: 20, visible: true },
  { label: 'ISCスラグ①', x: 27, y: 18, visible: true },
  { label: '低Pスラグ①', x: 20, y: 10, visible: true },
  { label: '製鋼/低塩基度', x: 40, y: 10, visible: true }
];

const toTriangle = (x, y, size) => {
  const h = (Math.sqrt(3) / 2) * size;
  const xCoord = ((100 - x - y / 2) / 100) * size;
  const yCoord = h - (y / 100) * h;
  return { x: xCoord, y: yCoord };
};

function App() {
  const [points, setPoints] = useState(initialPoints);
  const [label, setLabel] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const togglePoint = (index) => {
    const newPoints = [...points];
    newPoints[index].visible = !newPoints[index].visible;
    setPoints(newPoints);
  };

  const addPoint = () => {
    if (!label || isNaN(x) || isNaN(y)) return;
    setPoints([...points, { label, x: parseFloat(x), y: parseFloat(y), visible: true }]);
    setLabel('');
    setX('');
    setY('');
  };

  const size = 400;
  const height = (Math.sqrt(3) / 2) * size;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h2>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h2>

      <div>
        <input value={label} onChange={e => setLabel(e.target.value)} placeholder="ラベル" />
        <input value={x} onChange={e => setX(e.target.value)} placeholder="X(%)" />
        <input value={y} onChange={e => setY(e.target.value)} placeholder="Y(%)" />
        <button onClick={addPoint}>追加</button>
      </div>

      <div style={{ margin: '0.5rem 0' }}>
        {points.map((pt, i) => (
          <label key={i} style={{ marginRight: '1rem' }}>
            <input type="checkbox" checked={pt.visible} onChange={() => togglePoint(i)} />
            {pt.label}
          </label>
        ))}
      </div>

      <svg width={size + 40} height={height + 40}>
        <g transform="translate(20,20)">
          <polygon
            points={`0,${height} ${size},${height} ${size / 2},0`}
            fill="#f0f8ff"
            stroke="#444"
            strokeWidth="2"
          />

          {/* 軸ラベル */}
          <text x={-10} y={height + 15} fontSize="12">SiO₂ (%)</text>
          <text x={size - 30} y={height + 15} fontSize="12">CaO (%)</text>
          <text x={size / 2 - 25} y={-10} fontSize="12">Al₂O₃ (%)</text>

          {points.map((pt, i) => {
            if (!pt.visible) return null;
            const { x, y } = toTriangle(pt.x, pt.y, size);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="blue" />
                <text x={x + 8} y={y + 4} fontSize="12" fill="black">{pt.label}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
