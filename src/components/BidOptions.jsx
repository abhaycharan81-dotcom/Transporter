import React from "react";
import { IconRupee } from "./Icons";

const BID_AMOUNTS = [300, 500, 750, 1000];

function BidOptions({ onBid }) {
  return (
    <div>
      <p className="small" style={{ marginBottom: 8, fontWeight: 700, color: "var(--ink-soft)" }}>
        Tap an amount to place your bid
      </p>
      <div className="bid-grid">
        {BID_AMOUNTS.map((amount) => (
          <button key={amount} type="button" className="bid-tile" onClick={() => onBid(amount)}>
            <span className="bid-amount">
              <IconRupee size={15} style={{ marginRight: 3, verticalAlign: "-2px" }} />
              {amount}
            </span>
            <span className="bid-label">Place bid</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BidOptions;
