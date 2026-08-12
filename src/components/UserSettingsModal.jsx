import React, { useState, useEffect } from "react";
import { IconX, IconUser, IconPhone } from "./Icons";

function UserSettingsModal({ open, onClose, user, setUser }) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    if (open) {
      setName(user?.name || "");
      setPhone(user?.phone || "");
    }
  }, [open, user]);

  if (!open) return null;

  const handleSave = () => {
    const updated = { ...user, name: name.trim(), phone: phone.trim() };
    setUser(updated);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3>Your details</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close settings">
            <IconX size={18} />
          </button>
        </div>

        <div className="form-row">
          <label>Name or company</label>
          <div className="input-with-icon">
            <span className="field-icon"><IconUser size={18} /></span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
        </div>

        <div className="form-row">
          <label>Phone number</label>
          <div className="input-with-icon">
            <span className="field-icon"><IconPhone size={18} /></span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" inputMode="tel" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <button className="primary block" onClick={handleSave}>Save changes</button>
          <button className="ghost block" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsModal;
