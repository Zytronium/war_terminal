"use client";

import {useState} from "react";

export default function Home() {
  const [gridSize] = useState({rows: 20, cols: 20});

  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        cells.push(
            <div
                key={`${row}-${col}`}
                className="relative aspect-square border border-cyan-900/50 bg-slate-950 hover:bg-cyan-950/30 hover:border-cyan-500 transition-all cursor-crosshair group"
            >
              <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] text-cyan-400 font-mono">
                {String.fromCharCode(65 + col)}{row + 1}
              </span>
              </div>
            </div>
        );
      }
    }
    return cells;
  };

  return (
      <div className="flex flex-col flex-1 items-center justify-center bg-slate-950 p-8">
        <div className="w-full max-w-6xl">
          <div className="mb-6 border-2 border-cyan-900 bg-slate-900/50 p-4">
            <div className="font-mono text-cyan-400 flex items-center justify-between">
              <div>
                <span className="text-cyan-500 font-bold">&gt;</span> WAR TERMINAL
              </div>
              <div className="text-xs">
                Board Size: {gridSize.cols}x{gridSize.rows}
              </div>
            </div>
          </div>

          <div className="border-4 border-cyan-900 bg-slate-900 p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div
                className="grid gap-[1px] bg-cyan-950/20 p-2"
                style={{
                  gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
                }}
            >
              {renderGrid()}
            </div>
          </div>

          <div className="mt-4 border-2 border-cyan-900 bg-slate-900/50 p-3">
            <div className="font-mono text-xs text-cyan-400 flex gap-6">
              <div><span className="text-cyan-500">█</span> HOVER CELL FOR COORDINATES</div>
              <div><span className="text-cyan-500">█</span> CLICK TO SELECT</div>
            </div>
          </div>
        </div>
      </div>
  );
}
