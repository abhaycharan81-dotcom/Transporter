import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import TransportModeSelector, { TRANSPORT_MODES } from "../components/TransportModeSelector";
import BidOptions from "../components/BidOptions";
import OrderList from "../components/OrderList";
import Banner from "../components/Banner";
import { IconTruck } from "../components/Icons";

function TransporterPage() {
  const { user, setUser, orders, bids, setBids } = useContext(AppContext);
  const [mode, setMode] = useState(user?.mode || "");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page-card empty-state">
        <span className="empty-icon"><IconTruck size={26} /></span>
        <h3>Please sign in first</h3>
        <button className="primary" onClick={() => navigate("/")}>Go to registration</button>
      </div>
    );
  }

  if (user.role !== "transporter") {
    return (
      <div className="page-card empty-state">
        <span className="empty-icon"><IconTruck size={26} /></span>
        <h3>You're not registered as a transporter yet</h3>
        <button className="primary" onClick={() => navigate("/home")}>Back to dashboard</button>
      </div>
    );
  }

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setUser({ ...user, role: "transporter", mode: selectedMode });
    setMessage({ type: "success", text: `You're now available for ${selectedMode} jobs.` });
  };

  const handleBid = (orderId, price) => {
    setBids([...bids, { orderId, transporter: user.phone, price, mode }]);
    setMessage({ type: "success", text: `Bid placed: ₹${price} on order #${orderId}` });
  };

  const availableOrders = useMemo(
    () => orders.filter((order) => order.mode === mode && order.status === "pending"),
    [orders, mode]
  );

  const modeInfo = TRANSPORT_MODES.find((m) => m.id === mode);

  return (
    <div>
      <div className="page-header">
        <h2>Transporter dashboard</h2>
        <p>Find jobs that match how you work and place your bid.</p>
      </div>

      {!mode ? (
        <div className="page-card">
          <div className="section-header">
            <h3>How do you carry goods?</h3>
            <p>Choose your mode to see matching jobs nearby.</p>
          </div>
          <TransportModeSelector onSelect={handleModeSelect} selected={mode} />
        </div>
      ) : (
        <div>
          <div className="page-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {modeInfo && (
                <span className="opt-icon" style={{ background: "var(--orange-100)", color: "var(--orange)" }}>
                  <modeInfo.Icon size={18} />
                </span>
              )}
              <div>
                <h4 style={{ marginBottom: 2 }}>Registered as {mode}</h4>
                <p className="small">Only matching jobs are shown below</p>
              </div>
            </div>
            <button className="ghost sm" onClick={() => { setMode(""); setMessage(null); }}>Change</button>
          </div>

          {message && <div style={{ marginBottom: 14 }}><Banner type={message.type} text={message.text} /></div>}

          <div className="page-card">
            <div className="section-header">
              <h3>Available jobs</h3>
            </div>
            <OrderList
              orders={availableOrders}
              emptyTitle="No jobs right now"
              emptyMessage="Check back soon, or switch your mode to see other jobs."
              renderFooter={(order) => (
                <div style={{ marginTop: 12 }}>
                  <BidOptions onBid={(price) => handleBid(order.id, price)} />
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransporterPage;
