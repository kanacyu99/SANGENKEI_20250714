import React from "react";
import Plot from "react-plotly.js";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>三元系スラグチャート</h1>
      <Plot
        data={[
          {
            type: "scatterternary",
            mode: "markers",
            a: [60],
            b: [20],
            c: [20],
            marker: { symbol: 100, color: "blue", size: 14 },
            name: "サンプル点",
          },
        ]}
        layout={{
          ternary: {
            aaxis: { title: "CaO", min: 0.01 },
            baxis: { title: "SiO₂", min: 0.01 },
            caxis: { title: "Al₂O₃", min: 0.01 },
          },
          title: "CaO-SiO₂-Al₂O₃ 三元系状態図プロット",
          height: 500,
        }}
      />
    </div>
  );
}

export default App;
