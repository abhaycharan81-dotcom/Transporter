import React from "react";
import { IconPackage, IconCheck } from "./Icons";

export const WEIGHT_OPTIONS = ["25-50kg", "50-75kg", "75-100kg", "100-150kg"];

function WeightSelector({ onSelect, selected }) {
  return (
    <div className="option-grid">
      {WEIGHT_OPTIONS.map((w) => {
        const isSelected = selected === w;
        return (
          <button
            key={w}
            type="button"
            className={`option-card ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(w)}
            aria-pressed={isSelected}
          >
            {isSelected && (
              <span className="opt-check">
                <IconCheck size={12} strokeWidth={3} />
              </span>
            )}
            <span className="opt-icon">
              <IconPackage size={20} />
            </span>
            <span className="opt-sub" style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
              {w}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default WeightSelector;
