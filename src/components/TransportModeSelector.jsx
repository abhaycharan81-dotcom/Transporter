import React from "react";
import { IconCart, IconRickshaw, IconHand, IconCheck } from "./Icons";

export const TRANSPORT_MODES = [
  { id: "Thela Wala", label: "Thela Wala", sub: "Push cart", Icon: IconCart },
  { id: "Rickshaw", label: "Rickshaw", sub: "3-wheeler", Icon: IconRickshaw },
  { id: "Hand Pickup", label: "Hand Pickup", sub: "By hand", Icon: IconHand },
];

function TransportModeSelector({ onSelect, selected }) {
  return (
    <div>
      <div className="option-grid">
        {TRANSPORT_MODES.map(({ id, label, sub, Icon }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              className={`option-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(id)}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <span className="opt-check">
                  <IconCheck size={12} strokeWidth={3} />
                </span>
              )}
              <span className="opt-icon">
                <Icon size={22} />
              </span>
              <span className="opt-label">{label}</span>
              <span className="opt-sub">{sub}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TransportModeSelector;
