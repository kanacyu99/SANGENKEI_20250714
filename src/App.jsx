import React, { useState } from 'react';
import triangle from './assets/triangle.jpg';

const initialPoints = [
  { label: '水砕/フレッシュ', x: 0.5, y: 0.4, visible: true },
  { label: 'ISCスラグ①', x: 0.25, y: 0.2, visible: true },
  { label: '調整池', x: 0.22, y: 0.25, visible: true },
  { label: '低Pスラグ①', x: 0.15, y: 0.1, visible: true },
  { label: '製鋼/低塩基度', x: 0.6, y: 0.1, visible: true }
];

function App() {
  const [points, setPoints] = useState(initialPoints);

  const togglePoint = (index) => {
    const updated = [...points];
    updated[index].visible = !updated[index].visible;
    setPoints(updated);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem', textAlign: 'center' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <div style={{ marginBottom: '1rem' }}>
        {points.map((p, i) => (
          <label key={i} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={p.visible}
              onChange={() => togglePoint(i)}
            />{' '}
            {p.label}
          </label>
        ))}
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={triangle}
          alt="三元系状態図"
          style={{ width: '400px', height: 'auto', border: '1px solid #ccc' }}
        />
        {points.map((p, i) =>
          p.visible ? (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${p.x * 400}px`,
                top: `${p.y * 400}px`,
                transform: 'translate(-50%, -50%)',
                background: 'blue',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
                border: '2px solid white',
                cursor: 'pointer',
                title: p.label
              }}
              title={p.label}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default App;
