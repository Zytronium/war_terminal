"use client";

import { useState, useMemo } from "react";
import { create_building, ownerFilter } from "@/lib/helpers";
import { Owner, PlacedBuilding } from "@/types";

const GRID_ROWS = 10;
const GRID_COLS = 25;
const MID_COL = Math.floor(GRID_COLS / 2);

const DEBUG_BUILDING_IDS = ["missile_silo", "factory", "small_encampment", "large_encampment", "fortress"];

/**
 * Pick a random cell inside the given row range that isn't already occupied.
 * Returns null if no free cell is found after 200 attempts.
 */
function randomFreeCell(
    rowMin: number,
    rowMax: number,
    occupied: Set<string>
): { row: number; col: number } | null {
  for (let attempt = 0; attempt < 200; attempt++) {
    const row = rowMin + Math.floor(Math.random() * (rowMax - rowMin + 1));
    const col = Math.floor(Math.random() * GRID_COLS);
    const key = `${row}-${col}`;
    if (!occupied.has(key)) {
      occupied.add(key);
      return { row, col };
    }
  }
  return null;
}

/** Build the initial set of placed buildings (capitals + debug scatter) */
function buildInitialPlacements(): PlacedBuilding[] {
  const placed: PlacedBuilding[] = [];
  const occupied = new Set<string>();

  const place = (
      buildingId: string,
      owner: Owner,
      row: number,
      col: number
  ) => {
    placed.push({ buildingId, owner, row, col });
    occupied.add(`${row}-${col}`);
  };

  // Capital Bases — fixed positions at mid-top (red) and mid-bottom (cyan)
  place("capital_base", "enemy", 0, MID_COL);
  place("capital_base", "player", GRID_ROWS - 1, MID_COL);

  // Debug: one of each building for each side, random positions
  const redRowMax = Math.floor(GRID_ROWS / 2) - 1;   // rows 0–9
  const cyanRowMin = Math.floor(GRID_ROWS / 2);       // rows 10–19

  for (const id of DEBUG_BUILDING_IDS) {
    const redCell = randomFreeCell(0, redRowMax, occupied);
    if (redCell) place(id, "enemy", redCell.row, redCell.col);

    const cyanCell = randomFreeCell(cyanRowMin, GRID_ROWS - 1, occupied);
    if (cyanCell) place(id, "player", cyanCell.row, cyanCell.col);
  }

  return placed;
}

export default function Home() {
  const [gridSize] = useState({ rows: GRID_ROWS, cols: GRID_COLS });

  const placements = useMemo(() => buildInitialPlacements(), []);
  const placementMap = useMemo(() => {
    const map = new Map<string, PlacedBuilding>();
    for (const p of placements) map.set(`${p.row}-${p.col}`, p);
    return map;
  }, [placements]);

  const renderGrid = () => {
    const cells = [];

    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const key = `${row}-${col}`;
        const placement = placementMap.get(key);
        const building = placement ? create_building(placement.buildingId) : undefined;
        const iconFile = placement ? create_building(placement.buildingId)!.icon : undefined;

        cells.push(
            <div
                key={key}
                className="relative aspect-square border border-cyan-900/50 bg-slate-950 hover:bg-cyan-950/30 hover:border-cyan-500 transition-all cursor-crosshair group"
            >
              {/* Coordinate label on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <span className="text-[8px] text-cyan-400 font-mono drop-shadow">
                {String.fromCharCode(65 + col)}{row + 1}
              </span>
              </div>

              {/* Building icon */}
              {placement && iconFile && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Glow ring behind icon */}
                    <div
                        className={`absolute inset-[2px] rounded-sm opacity-20 ${
                            placement.owner === "player" ? "bg-cyan-400" : "bg-red-500"
                        }`}
                    />
                    <img
                        src={`/icons/${iconFile}`}
                        alt={building?.name ?? placement.buildingId}
                        title={`[${placement.owner.toUpperCase()}] ${building?.name ?? placement.buildingId}`}
                        width={12}
                        height={12}
                        style={{ filter: ownerFilter(placement.owner) }}
                        className="relative z-10 pixel-art h-full w-full p-2"
                    />
                  </div>
              )}
            </div>
        );
      }
    }

    return cells;
  };

  return (
      <div className="flex flex-col flex-1 items-center justify-center bg-slate-950 p-8">
        <div className="w-full max-w-6xl">
          {/* Header bar */}
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

          {/* Grid */}
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

          {/* Legend */}
          <div className="mt-4 border-2 border-cyan-900 bg-slate-900/50 p-3">
            <div className="font-mono text-xs text-cyan-400 flex gap-6 flex-wrap">
              <div><span className="text-cyan-500">█</span> HOVER CELL FOR COORDINATES</div>
              <div><span className="text-cyan-500">█</span> CLICK TO SELECT</div>
              <div><span className="text-cyan-400">■</span> CYAN = PLAYER</div>
              <div><span className="text-red-500">■</span> RED = ENEMY</div>
            </div>
          </div>
        </div>
      </div>
  );
}
