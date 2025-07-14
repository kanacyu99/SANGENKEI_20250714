import React, { useState } from "react";
import Plot from "react-plotly.js";

function App() {
  const [composition, setComposition] = useState({
    CaO: "",
    SiO2: "",
    Al2O3: "",
  });

  const [points, setPoints] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComposition({ ...composition, [name]: value });
  };

  const handleAddPoint = () => {
    const { CaO, SiO2, Al2O3 } = composition;
    const total = parseFloat(CaO) + parseFloat(SiO2) + parseFloat(Al2O3);

    if (total === 0 || isNaN(total)) {
      alert("数値をすべて入力してください");
      return;
    }

    setPoints([
      ...points,
      {
        a: (parseFloat(CaO) / total) * 100,
        b: (parseFloat(SiO2) / total) * 100,
        c: (parseFloat(Al2O3) / total) * 100,
        label: `#${points.length + 1}`,
      },
    ]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>CaO–SiO₂–Al₂O₃ 三元系状態図</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          CaO:{" "}
          <input
            type="number"
            name="CaO"
            value={composition.CaO}
            onChange={handleChange}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          SiO₂:{" "}
          <input
            type="number"
            name="SiO2"
            value={composition.SiO2}
            onChange={handleChange}
          />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Al₂O₃:{" "}
          <input
            type="number"
            name="Al2O3"
            value={composition.Al2O3}
            onChange={handleChange}
          />
        </label>
        <button style={{ marginLeft: "1rem" }} onClick={handleAddPoint}>
          プロット
        </button>
      </div>

      <Plot
        data={[
          {
            type: "scatterternary",
            mode: "markers+text",
            a: points.map((p) => p.a),
            b: points.map((p) => p.b),
            c: points.map((p) => p.c),
            text: points.map((p) => p.label),
            marker: { color: "blue", size: 8 },
            textposition: "top center",
          },
        ]}
        layout={{
          ternary: {
            sum: 100,
            aaxis: { title: "CaO" },
            baxis: { title: "SiO₂" },
            caxis: { title: "Al₂O₃" },
          },
          width: 500,
          height: 500,
          margin: { l: 20, r: 20, t: 20, b: 20 },
        }}
      />
    </div>
  );
}

export default App;
