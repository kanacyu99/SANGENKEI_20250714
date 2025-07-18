import React from "react";
import { slagSamples } from "./data";

const triangleSize = 300;

function ternaryToXY(ca, si, al) {
  const total = ca + si + al;
  const x = (0.5 * (2 * si + al)) / total;
  const y = (Math.sqrt(3) * al) / total;
  return {
    x: x * triangleSize,
    y: (1 - y) * triangleSize
  };
}

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>三元系スラグ状態図（CaO–SiO₂–Al₂O₃）</h1>
      <svg width={triangleSize} height={triangleSize} style={{ border: "1px solid #ccc" }}>
        <polygon
          points={`${triangleSize / 2},0 0,${triangleSize} ${triangleSize},${triangleSize}`}
          fill="#f0f8ff"
          stroke="#888"
          strokeWidth="2"
        />
        {slagSamples.map((sample, index) => {
          const { x, y } = ternaryToXY(sample.CaO, sample.SiO2, sample.Al2O3);
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="5" fill="steelblue" />
              <text x={x + 5} y={y - 5} fontSize="10" fill="#333">
                {sample.name}
              </text>
            </g>
          );
        })}
        <text x={triangleSize / 2 - 20} y={-5} fontSize="12">SiO₂ 100%</text>
        <text x={-5} y={triangleSize + 15} fontSize="12">CaO 100%</text>
        <text x={triangleSize - 40} y={triangleSize + 15} fontSize="12">Al₂O₃ 100%</text>
      </svg>
    </div>
  );
}

export default App;
