import React, { useState } from 'react';

const initialPoints = [
  { label: '水砕/フレッシュ', x: 50, y: 30, visible: true },
  { label: '調整池', x: 30, y: 70, visible: true },
  { label: 'ISCスラグ①', x: 35, y: 75, visible: true },
  { label: '低Pスラグ①', x: 25, y: 85, visible: true },
  { label: '製鋼/低塩基度', x: 60, y: 80, visible: true },
];

function App() {
  const [points, setPoints] = useState(initialPoints);
  const [newLabel, setNewLabel] = useState('');
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');

  const handleToggleVisibility = (index) => {
    const updatedPoints = [...points];
    updatedPoints[index].visible = !updatedPoints[index].visible;
    setPoints(updatedPoints);
  };

  const handleAddPoint = () => {
    if (newLabel && !isNaN(newX) && !isNaN(newY)) {
      setPoints([
        ...points,
        {
          label: newLabel,
          x: parseFloat(newX),
          y: parseFloat(newY),
          visible: true,
        },
      ]);
      setNewLabel('');
      setNewX('');
      setNewY('');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="ラベル"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <input
          type="number"
          placeholder="X(%)"
          value={newX}
          onChange={(e) => setNewX(e.target.value)}
        />
        <input
          type="number"
          placeholder="Y(%)"
          value={newY}
          onChange={(e) => setNewY(e.target.value)}
        />
        <button onClick={handleAddPoint}>追加</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {points.map((pt, idx) => (
          <label key={idx} style={{ margin: '0 10px' }}>
            <input
              type="checkbox"
              checked={pt.visible}
              onChange={() => handleToggleVisibility(idx)}
            />
            {pt.label}
          </label>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          margin: '0 auto',
          backgroundImage: 'url("/triangle.jpg")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #ccc',
        }}
      >
        {points.map((pt, idx) =>
          pt.visible ? (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'blue',
                color: 'white',
                padding: '2px 5px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              {pt.label}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default App;
