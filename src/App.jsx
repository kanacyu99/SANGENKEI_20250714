import React, { useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';

const Plot = createPlotlyComponent(Plotly);

function App() {
  const [label, setLabel] = useState('');
  const [cao, setCao] = useState('');
  const [sio2, setSio2] = useState('');
  const [al2o3, setAl2o3] = useState('');
  const [points, setPoints] = useState([]);

  const handleAddPoint = () => {
    const total = parseFloat(cao) + parseFloat(sio2) + parseFloat(al2o3);
    if (total !== 100) {
      alert('成分の合計は100%にしてください');
      return;
    }

    const newPoint = {
      a: parseFloat(al2o3),
      b: parseFloat(sio2),
      c: parseFloat(cao),
      text: label,
    };
    setPoints([...points, newPoint]);
    setLabel('');
    setCao('');
    setSio2('');
    setAl2o3('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="ラベル"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{ width: '150px', marginRight: '5px' }}
        />
        <input
          placeholder="CaO (%)"
          value={cao}
          onChange={(e) => setCao(e.target.value)}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <input
          placeholder="SiO₂ (%)"
          value={sio2}
          onChange={(e) => setSio2(e.target.value)}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <input
          placeholder="Al₂O₃ (%)"
          value={al2o3}
          onChange={(e) => setAl2o3(e.target.value)}
          style={{ width: '100px', marginRight: '5px' }}
        />
        <button onClick={handleAddPoint}>追加</button>
      </div>

      <Plot
        data={[
          {
            type: 'ternary',
            mode: 'markers+text',
            a: points.map((p) => p.a),
            b: points.map((p) => p.b),
            c: points.map((p) => p.c),
            text: points.map((p) => p.text),
            textposition: 'middle right',
            marker: {
              symbol: 100,
              size: 8,
              color: 'red',
            },
          },
        ]}
        layout={{
          ternary: {
            sum: 100,
            aaxis: { title: 'Al₂O₃ (%)', min: 0 },
            baxis: { title: 'SiO₂ (%)', min: 0 },
            caxis: { title: 'CaO (%)', min: 0 },
          },
          margin: { t: 40 },
          width: 600,
          height: 600,
          title: '三元系スラグ状態図（CaO–SiO₂–Al₂O₃）',
        }}
      />
    </div>
  );
}

export default App;
