import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import UserSettingsModal from "./UserSettingsModal";
import { IconTruck, IconX, IconPin, IconPhone, IconUser, IconCart, IconLogOut, IconChevronRight } from "./Icons";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, setUser } = useContext(AppContext);
  const [showDetails, setShowDetails] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) setShowDetails(true);
  }, [mobileOpen]);

  if (!user) return null;

  const handleSignOut = () => {
    setUser(null);
    if (setMobileOpen) setMobileOpen(false);
    navigate("/");
  };

  const targetPath = user.role === "transporter" ? "/transporter" : "/user";
  const targetLabel = user.role === "transporter" ? "Go to transporter page" : "Go to booking page";

  const getInitials = (name, phone) => {
    const source = (name && name.trim()) || (phone && phone.toString()) || "";
    if (!source) return "U";
    const parts = source.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <>
      {mobileOpen && <div className="backdrop show" onClick={() => setMobileOpen(false)} />}

      <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand-row">
          <span className="brand-mark"><IconTruck size={18} /></span>
          <div>
            <div className="brand-name" style={{ fontSize: 16 }}>Saathi</div>
            <div className="brand-tag">Transport, made simple</div>
          </div>
        </div>

        <div className="profile-summary">
          <button className="icon-button" onClick={() => setSettingsOpen(true)} aria-label="Open user settings" style={{ padding: 0 }}>
            <div className="profile-avatar">{getInitials(user.name, user.phone)}</div>
          </button>

          <div className="profile-meta" onClick={() => setShowDetails((s) => !s)} style={{ cursor: "pointer" }}>
            <h3>{user.name ? user.name : (user.role === "transporter" ? "Transporter" : "Your profile")}</h3>
            <p>{user.phone}</p>
          </div>

          {setMobileOpen && (
            <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
              <IconX size={18} />
            </button>
          )}
        </div>

        {showDetails && (
          <div className="profile-details">
            <div className="detail-row">
              <IconPhone size={16} />
              <div>
                <strong>Phone</strong>
                {user.phone}
              </div>
            </div>
            <div className="detail-row">
              <IconPin size={16} />
              <div>
                <strong>Location</strong>
                {user.location?.address || `${user.location?.lat?.toFixed(3)}, ${user.location?.lng?.toFixed(3)}`}
              </div>
            </div>
            <div className="detail-row">
              <IconUser size={16} />
              <div>
                <strong>Role</strong>
                {user.role === "transporter" ? "Transporter" : user.role === "user" ? "Customer" : "Not selected"}
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
        )}

        <div className="card-actions">
          <button
            className="secondary block"
            onClick={() => {
              navigate(targetPath);
              if (setMobileOpen) setMobileOpen(false);
            }}
          >
            {targetLabel}
            <IconChevronRight size={16} />
          </button>
          <button className="ghost block" onClick={handleSignOut}>
            <IconLogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      <UserSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} user={user} setUser={setUser} />
    </>
  );
}

export default Sidebar;
