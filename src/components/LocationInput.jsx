import React, { useState } from "react";
import { getLocation } from "../utils/location";
import { IconPin, IconLoader, IconCheck, IconAlert } from "./Icons";

/**
 * Captures a location either via device GPS (preferred, one tap)
 * or a typed address as a fallback. Reports back through
 * onLocationCaptured({ lat, lng } | { address }).
 */
function LocationInput({ manualAddress, onManualAddressChange, onLocationCaptured, capturedLocation }) {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error

  const handleDetect = async () => {
    setStatus("loading");
    try {
      const loc = await getLocation();
      onLocationCaptured(loc);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="location-box">
      <label style={{ marginBottom: 10 }}>Your location</label>

      <button type="button" className="secondary block" onClick={handleDetect} disabled={status === "loading"}>
        {status === "loading" ? (
          <IconLoader size={18} className="spin" />
        ) : (
          <IconPin size={18} />
        )}
        {status === "loading" ? "Finding your location..." : "Use my current location"}
      </button>

      {status === "ok" && capturedLocation && (
        <div className="location-status ok">
          <IconCheck size={16} />
          Location captured
        </div>
      )}
      {status === "error" && (
        <div className="location-status err">
          <IconAlert size={16} />
          Could not detect location. Enter address below.
        </div>
      )}

      <p className="small" style={{ margin: "14px 0 8px" }}>Or type your address / landmark</p>
      <div className="input-with-icon">
        <span className="field-icon"><IconPin size={18} /></span>
        <input
          type="text"
          placeholder="e.g. Near Ganesh Market, Sector 12"
          value={manualAddress}
          onChange={(e) => onManualAddressChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LocationInput;
