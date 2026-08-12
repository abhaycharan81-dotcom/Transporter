import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import TransportModeSelector from "../components/TransportModeSelector";
import WeightSelector from "../components/WeightSelector";
import OrderList from "../components/OrderList";
import Banner from "../components/Banner";
import { IconPin, IconTruck, IconUser, IconRupee } from "../components/Icons";

function UserPage() {
  const { user, setOrders, orders, bids, setUser, updateOrder } = useContext(AppContext);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [mode, setMode] = useState("");
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

  if (user.role !== "user") {
    return (
      <div className="page-card empty-state">
        <span className="empty-icon"><IconTruck size={26} /></span>
        <h3>You're not registered as a customer yet</h3>
        <button className="primary" onClick={() => navigate("/home")}>Back to dashboard</button>
      </div>
    );
  }

  const createOrder = () => {
    setMessage(null);
    if (!pickup.trim() || !drop.trim() || !weight || !mode) {
      setMessage({ type: "warning", text: "Please fill pickup, drop, weight and transport mode." });
      return;
    }

    const newOrder = {
      id: orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1,
      pickup: pickup.trim(),
      drop: drop.trim(),
      weight,
      mode,
      user: user.phone,
      status: "pending",
      acceptedBid: null,
    };

    setOrders([...orders, newOrder]);
    setUser({ ...user, role: "user" });
    setPickup("");
    setDrop("");
    setWeight("");
    setMode("");
    setMessage({ type: "success", text: "Order created. Waiting for transporter bids." });
  };

  const acceptBid = (bid) => {
    const order = orders.find((o) => o.id === bid.orderId);
    if (!order || order.status !== "pending") {
      setMessage({ type: "error", text: "This order is no longer available." });
      return;
    }

    const updatedOrder = {
      ...order,
      status: "booked",
      acceptedBid: { price: bid.price, transporter: bid.transporter },
    };

    updateOrder(updatedOrder);
    setMessage({ type: "success", text: `Accepted ₹${bid.price} from ${bid.transporter}.` });
  };

  const myOrders = orders.filter((order) => order.user === user.phone);

  return (
    <div>
      <div className="page-header">
        <h2>Book a pickup</h2>
        <p>Tell us what needs to move, and transporters nearby will bid.</p>
      </div>

      <div className="page-card">
        <div className="section-header">
          <h3>New order</h3>
        </div>

        <div className="form-row">
          <label>Pickup location</label>
          <div className="input-with-icon">
            <span className="field-icon" style={{ color: "var(--green)" }}><IconPin size={18} /></span>
            <input type="text" placeholder="Where to pick up from" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <label>Drop location</label>
          <div className="input-with-icon">
            <span className="field-icon" style={{ color: "var(--red)" }}><IconPin size={18} /></span>
            <input type="text" placeholder="Where to deliver to" value={drop} onChange={(e) => setDrop(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <label>Weight of goods</label>
          <WeightSelector onSelect={setWeight} selected={weight} />
        </div>

        <div className="form-row" style={{ marginBottom: 8 }}>
          <label>Transport mode</label>
          <TransportModeSelector onSelect={setMode} selected={mode} />
        </div>

        {message && <div style={{ margin: "14px 0" }}><Banner type={message.type} text={message.text} /></div>}

        <button className="primary block" onClick={createOrder}>Create order</button>
      </div>

      <div className="page-card">
        <div className="section-header">
          <h3>My orders</h3>
        </div>
        <OrderList
          orders={myOrders}
          emptyTitle="No orders yet"
          emptyMessage="Create your first order above to get bids from transporters."
          renderFooter={(order) => {
            const orderBids = bids.filter((bid) => bid.orderId === order.id);
            if (order.status === "booked" && order.acceptedBid) {
              return (
                <div className="bid-card" style={{ marginTop: 10 }}>
                  <div className="bid-card-info">
                    <IconUser size={16} />
                    <div>
                      <p className="small" style={{ marginBottom: 2 }}>Booked with</p>
                      <strong>{order.acceptedBid.transporter}</strong>
                    </div>
                  </div>
                  <span className="meter meter-lg">
                    <IconRupee size={14} />
                    {order.acceptedBid.price}
                  </span>
                </div>
              );
            }
            return (
              <div style={{ marginTop: 10 }}>
                <h4 style={{ marginBottom: 8, fontSize: 13.5, textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--ink-faint)" }}>
                  Bids ({orderBids.length})
                </h4>
                {orderBids.length === 0 ? (
                  <p className="small">No bids yet. Check back soon.</p>
                ) : (
                  orderBids.map((bid, index) => (
                    <div className="bid-card" key={index}>
                      <div className="bid-card-info">
                        <IconUser size={16} />
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{bid.transporter}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="meter">
                          <IconRupee size={13} />
                          {bid.price}
                        </span>
                        <button className="primary sm" onClick={() => acceptBid(bid)}>Accept</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default UserPage;
