import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [composition, setComposition] = useState({
    cao: '',
    sio2: '',
    al2o3: '',
  });

  const [points, setPoints] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComposition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPoint = () => {
    const { cao, sio2, al2o3 } = composition;
    const total = Number(cao) + Number(sio2) + Number(al2o3);
    if (total !== 100) {
      alert('CaO + SiO₂ + Al₂O₃ の合計は 100% にしてください');
      return;
    }

    setPoints((prev) => [
      ...prev,
      {
        a: Number(cao),
        b: Number(sio2),
        c: Number(al2o3),
      },
    ]);

    setComposition({ cao: '', sio2: '', al2o3: '' });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>三元系スラグチャート</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          CaO（%）:
          <input
            type="number"
            name="cao"
            value={composition.cao}
            onChange={handleChange}
            style={{ margin: '0 1rem' }}
          />
        </label>
        <label>
          SiO₂（%）:
          <input
            type="number"
            name="sio2"
            value={composition.sio2}
            onChange={handleChange}
            style={{ margin: '0 1rem' }}
          />
        </label>
        <label>
          Al₂O₃（%）:
          <input
            type="number"
            name="al2o3"
            value={composition.al2o3}
            onChange={handleChange}
            style={{ margin: '0 1rem' }}
          />
        </label>
        <button onClick={handleAddPoint}>グラフに追加</button>
      </div>

      <Plot
        data={[
          {
            type: 'scatterternary',
            mode: 'markers',
            a: points.map((p) => p.a),
            b: points.map((p) => p.b),
            c: points.map((p) => p.c),
            marker: { size: 10, color: 'blue' },
            name: '入力成分',
          },
        ]}
        layout={{
          ternary: {
            aaxis: { title: 'CaO', min: 0.01 },
            baxis: { title: 'SiO₂', min: 0.01 },
            caxis: { title: 'Al₂O₃', min: 0.01 },
          },
          margin: { t: 30 },
          height: 500,
          title: 'CaO–SiO₂–Al₂O₃ 三元系チャート',
        }}
        style={{ width: '100%', maxWidth: '700px' }}
      />
    </div>
  );
}

export default App;
