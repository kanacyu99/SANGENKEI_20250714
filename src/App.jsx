import React from "react";
import Plot from "react-plotly.js";

function App() {
  const data = [
    {
      type: "scatterternary",
      mode: "markers+text",
      a: [30, 20, 10],
      b: [30, 50, 60],
      c: [40, 30, 30],
      text: ["サンプル1", "サンプル2", "サンプル3"],
      textposition: "middle center",
      marker: {
        symbol: 100,
        color: "blue",
        size: 12,
        line: { width: 2 },
      },
    },
  ];

  const layout = {
    title: "三元系スラグ状態図（CaO–SiO₂–Al₂O₃）",
    ternary: {
      sum: 100,
      aaxis: { title: "Al₂O₃ (%)", min: 0.01 },
      baxis: { title: "SiO₂ (%)", min: 0.01 },
      caxis: { title: "CaO (%)", min: 0.01 },
    },
    width: 600,
    height: 600,
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default App;
