import React from "react";
import { IconPin, IconPackage, IconInbox } from "./Icons";
import { TRANSPORT_MODES } from "./TransportModeSelector";

const STATUS_MAP = {
  pending: { label: "Waiting for bids", className: "badge-amber" },
  booked: { label: "Booked", className: "badge-green" },
};

function modeIcon(modeId) {
  const found = TRANSPORT_MODES.find((m) => m.id === modeId);
  return found ? found.Icon : IconPackage;
}

/**
 * Renders a list of order cards. `renderFooter(order)` lets each
 * page (user / transporter) plug in its own action area
 * (bid list + accept button, or the bid-placing widget).
 */
function OrderList({ orders, emptyTitle, emptyMessage, renderFooter }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <IconInbox size={26} />
        </span>
        <h4>{emptyTitle}</h4>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => {
        const status = STATUS_MAP[order.status] || STATUS_MAP.pending;
        const ModeIcon = modeIcon(order.mode);
        return (
          <div className="order-card" key={order.id}>
            <div className="order-card-head">
              <span className={`badge ${status.className}`}>{status.label}</span>
              <span className="meter">
                <span className="meter-dot" />
                {order.weight}
              </span>
            </div>

            <div className="order-route">
              <div className="route-line">
                <IconPin size={16} style={{ color: "var(--green)" }} />
                <span>{order.pickup}</span>
              </div>
              <div className="route-connector" />
              <div className="route-line">
                <IconPin size={16} style={{ color: "var(--red)" }} />
                <span>{order.drop}</span>
              </div>
            </div>

            <div className="order-tags">
              <span className="badge badge-navy">
                <ModeIcon size={13} />
                {order.mode}
              </span>
            </div>

            {renderFooter && renderFooter(order)}
          </div>
        );
      })}
    </div>
  );
}

export default OrderList;
