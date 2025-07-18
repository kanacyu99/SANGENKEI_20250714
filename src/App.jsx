// App.jsx
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [points, setPoints] = useState([]);
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');

  const handleAddPoint = () => {
    const total = parseFloat(cao) + parseFloat(sio2) + parseFloat(al2o3);
    if (total !== 100) {
      alert('CaO, SiO2, Al2O3の合計は100% にしてください');
      return;
    }
    const newPoint = {
      a: parseFloat(cao),
      b: parseFloat(sio2),
      c: parseFloat(al2o3),
      label: label || `Point ${points.length + 1}`
    };
    setPoints([...points, newPoint]);
    setLabel('');
    setCao('');
    setSio2('');
    setAl2o3('');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>三元系スラグ状態図　(CaO–SiO<sub>2</sub>–Al<sub>2</sub>O<sub>3</sub>)</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="ラベル"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          placeholder="CaO (%)"
          value={cao}
          type="number"
          onChange={(e) => setCao(e.target.value)}
        />
        <input
          placeholder="SiO₂ (%)"
          value={sio2}
          type="number"
          onChange={(e) => setSio2(e.target.value)}
        />
        <input
          placeholder="Al₂O₃ (%)"
          value={al2o3}
          type="number"
          onChange={(e) => setAl2o3(e.target.value)}
        />
        <button onClick={handleAddPoint}>追加</button>
      </div>

      <Plot
        data={[{
          type: 'scatterternary',
          mode: 'markers+text',
          a: points.map(p => p.a),
          b: points.map(p => p.b),
          c: points.map(p => p.c),
          text: points.map(p => p.label),
          marker: { color: 'blue', size: 10 },
          textposition: 'top center'
        }]}
        layout={{
          ternary: {
            sum: 100,
            aaxis: { title: 'CaO', min: 0, ticksuffix: '%', linewidth: 2 },
            baxis: { title: 'SiO₂', min: 0, ticksuffix: '%', linewidth: 2 },
            caxis: { title: 'Al₂O₃', min: 0, ticksuffix: '%', linewidth: 2 }
          },
          title: '三元系グラフ CaO-SiO₂-Al₂O₃',
          width: 600,
          height: 600
        }}
      />
    </div>
  );
}

export default App;
