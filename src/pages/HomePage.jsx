import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IconPin, IconUser, IconCart, IconLogOut, IconChevronRight, IconTruck } from "../components/Icons";

function HomePage() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return (
      <div className="page-card empty-state">
        <span className="empty-icon"><IconTruck size={26} /></span>
        <h3>Please sign in</h3>
        <p>Register once to start booking or offering transport.</p>
        <button className="primary" onClick={() => navigate("/")}>Go to registration</button>
      </div>
    );
  }

  const actionLabel = user.role === "transporter" ? "Go to transporter dashboard" : "Continue to booking";
  const actionPath = user.role === "transporter" ? "/transporter" : "/user";

  const getInitials = (name, phone) => {
    const source = (name && name.trim()) || (phone && phone.toString()) || "";
    if (!source) return "U";
    const parts = source.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div>
      <div className="page-header">
        <h2>Welcome back</h2>
        <p>Here's your profile summary.</p>
      </div>

      <div className="page-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div className="profile-avatar" style={{ width: 54, height: 54 }}>{getInitials(user.name, user.phone)}</div>
          <div>
            <h3>{user.name ? user.name : (user.role === "transporter" ? "Transporter" : "Customer")}</h3>
            <p className="small">{user.phone}</p>
          </div>
        </div>

        <div className="profile-details" style={{ padding: 0 }}>
          <div className="detail-row">
            <IconPin size={16} />
            <div>
              <strong>Location</strong>
              {user.location?.address || `${user.location?.lat?.toFixed?.(3)}, ${user.location?.lng?.toFixed?.(3)}`}
            </div>
          </div>
          <div className="detail-row">
            <IconUser size={16} />
            <div>
              <strong>Role</strong>
              {user.role === "transporter" ? "Transporter" : "Customer"}
            </div>
          </div>
          {user.mode && (
            <div className="detail-row">
              <IconCart size={16} />
              <div>
                <strong>Works as</strong>
                {user.mode}
              </div>
            </div>
          )}
        </div>

        <button className="danger-text" onClick={handleSignOut} style={{ marginTop: 10 }}>
          <IconLogOut size={15} />
          Sign out
        </button>
      </div>

      <div className="page-card">
        <div className="section-header">
          <h3>Next step</h3>
        </div>
        <div className="form-actions">
          <button className="primary block" onClick={() => navigate(actionPath)}>
            {actionLabel}
            <IconChevronRight size={18} />
          </button>
          <button className="ghost block" onClick={() => navigate("/")}>Update registration</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
