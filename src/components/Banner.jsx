import React from "react";
import { IconCheck, IconAlert, IconInfo } from "./Icons";

/**
 * Small colored feedback banner used across the app for
 * success / warning / error / info messages.
 * type: "success" | "warning" | "error" | "info"
 */
function Banner({ type = "info", text }) {
  if (!text) return null;

  const icons = {
    success: <IconCheck size={18} />,
    warning: <IconAlert size={18} />,
    error: <IconAlert size={18} />,
    info: <IconInfo size={18} />,
  };

  return (
    <div className={`banner banner-${type}`} role="status">
      {icons[type]}
      <span>{text}</span>
    </div>
  );
}

export default Banner;
