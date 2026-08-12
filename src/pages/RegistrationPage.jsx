import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import LocationInput from "../components/LocationInput";
import Banner from "../components/Banner";
import { IconTruck, IconCart, IconUser, IconPhone, IconChevronRight } from "../components/Icons";

const STEP_LABELS = ["Choose role", "Your number", "Your location"];

function RegistrationPage() {
  const { setUser } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState(null); // { type, text }
  const navigate = useNavigate();

  const goNext = () => {
    setMessage(null);
    if (step === 1 && !role) {
      setMessage({ type: "warning", text: "Please choose whether you need a pickup or you provide transport." });
      return;
    }
    if (step === 2 && !phone.trim()) {
      setMessage({ type: "warning", text: "Please enter your phone number to continue." });
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setMessage(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = () => {
    setMessage(null);
    if (!location && !manualAddress.trim()) {
      setMessage({ type: "warning", text: "Please share your location or type an address." });
      return;
    }

    const userLocation = location ? location : { address: manualAddress.trim() };
    const userObj = { phone: phone.trim(), location: userLocation, role };
    if (name && name.trim()) userObj.name = name.trim();
    setUser(userObj);
    navigate("/home");
  };

  return (
    <div>
      <div className="page-header" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
        <span className="brand-mark" style={{ width: 40, height: 40 }}><IconTruck size={20} /></span>
        <div>
          <h1>Saathi</h1>
          <p className="small">Local transport, made simple</p>
        </div>
      </div>

      <div className="page-card">
        <div className="step-track">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`step-dot ${s < step ? "done" : s === step ? "active" : ""}`} />
          ))}
        </div>
        <div className="step-label">Step {step} of 3 — {STEP_LABELS[step - 1]}</div>

        {step === 1 && (
          <div className="role-grid">
            <button
              type="button"
              className={`role-card ${role === "user" ? "selected" : ""}`}
              onClick={() => setRole("user")}
            >
              <span className="role-icon"><IconUser size={22} /></span>
              <div>
                <h4>I need a pickup</h4>
                <p>Book a thela, rickshaw or hand pickup for your goods</p>
              </div>
              <IconChevronRight size={18} className="role-arrow" />
            </button>

            <button
              type="button"
              className={`role-card ${role === "transporter" ? "selected" : ""}`}
              onClick={() => setRole("transporter")}
            >
              <span className="role-icon"><IconCart size={22} /></span>
              <div>
                <h4>I provide transport</h4>
                <p>Find jobs and earn by carrying goods for people nearby</p>
              </div>
              <IconChevronRight size={18} className="role-arrow" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="form-row">
              <label>Phone number</label>
              <div className="input-with-icon">
                <span className="field-icon"><IconPhone size={18} /></span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row" style={{ marginBottom: 4 }}>
              <label>Name or company (optional)</label>
              <div className="input-with-icon">
                <span className="field-icon"><IconUser size={18} /></span>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <LocationInput
            manualAddress={manualAddress}
            onManualAddressChange={setManualAddress}
            capturedLocation={location}
            onLocationCaptured={setLocation}
          />
        )}

        {message && <div style={{ marginTop: 14 }}><Banner type={message.type} text={message.text} /></div>}

        <div className="form-actions" style={{ marginTop: 18, flexDirection: "row" }}>
          {step > 1 && (
            <button className="ghost" style={{ flex: 1 }} onClick={goBack}>Back</button>
          )}
          {step < 3 ? (
            <button className="primary" style={{ flex: 2 }} onClick={goNext}>
              Continue
              <IconChevronRight size={18} />
            </button>
          ) : (
            <button className="primary" style={{ flex: 2 }} onClick={handleSubmit}>
              Get started
              <IconChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
