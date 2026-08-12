import React from "react";

/* Shared line-icon set. Thick 2.25 stroke for visibility at small sizes.
   Color inherits via currentColor so parents control it with CSS. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Svg = ({ size = 24, children, ...props }) => (
  <svg width={size} height={size} {...base} {...props}>
    {children}
  </svg>
);

export const IconTruck = (p) => (
  <Svg {...p}>
    <rect x="1.5" y="7" width="13" height="10" rx="1.5" />
    <path d="M14.5 10h3.7a1.5 1.5 0 0 1 1.28.72l2.02 3.3c.13.22.2.47.2.72V17a1 1 0 0 1-1 1H21" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="17.5" cy="19" r="2" />
    <path d="M8 19h7.5" />
  </Svg>
);

export const IconCart = (p) => (
  <Svg {...p}>
    <path d="M3 5h2.2l1 3M6.2 8l1.6 7.2a1.5 1.5 0 0 0 1.46 1.3h7.1a1.5 1.5 0 0 0 1.46-1.16L19.5 9H6.2Z" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="16.5" cy="20" r="1.3" />
  </Svg>
);

export const IconRickshaw = (p) => (
  <Svg {...p}>
    <path d="M4 16V9a2 2 0 0 1 2-2h3l3 4h4a2 2 0 0 1 2 2v3" />
    <path d="M3 16h16" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M9 7V4h3" />
  </Svg>
);

export const IconHand = (p) => (
  <Svg {...p}>
    <path d="M8 12.5V5a1.3 1.3 0 0 1 2.6 0v6" />
    <path d="M10.6 11V4a1.3 1.3 0 0 1 2.6 0v7" />
    <path d="M13.2 11.2V5.3a1.3 1.3 0 0 1 2.6 0V13" />
    <path d="M15.8 8.6a1.3 1.3 0 0 1 2.6 0V15c0 3.9-2.5 7-6.4 7-2.4 0-3.8-.9-5.1-2.5L4 15.8c-.6-.8-.4-1.9.5-2.4.7-.4 1.5-.2 2 .4l1.5 1.7" />
  </Svg>
);

export const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M5.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2C10.6 19.3 4.7 13.4 3.5 6.2A2 2 0 0 1 5.5 3Z" />
  </Svg>
);

export const IconUser = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </Svg>
);

export const IconBuilding = (p) => (
  <Svg {...p}>
    <rect x="4" y="3" width="10" height="18" rx="1" />
    <path d="M14 8h6v13h-6" />
    <path d="M7 7h1M7 11h1M7 15h1M11 7h1M11 11h1M11 15h1" />
  </Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Svg>
);

export const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="M9 5l7 7-7 7" />
  </Svg>
);

export const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);

export const IconX = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M6 18L18 6" />
  </Svg>
);

export const IconLogOut = (p) => (
  <Svg {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </Svg>
);

export const IconSettings = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87A1.7 1.7 0 0 0 3 13.06H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.06a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V2a2 2 0 1 1 4 0v.09c0 .68.4 1.28 1 1.56.61.25 1.31.15 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.49.49-.66 1.19-.34 1.87v.09c.25.6.85 1 1.56 1H21a2 2 0 1 1 0 4h-.09c-.68 0-1.28.4-1.51 1Z" />
  </Svg>
);

export const IconPackage = (p) => (
  <Svg {...p}>
    <path d="M21 8v8a1.5 1.5 0 0 1-.77 1.31l-7.5 4.2a1.5 1.5 0 0 1-1.46 0l-7.5-4.2A1.5 1.5 0 0 1 3 16V8" />
    <path d="M3.27 6.96 12 12l8.73-5.04" />
    <path d="M12 22V12" />
    <path d="M7.5 4.27 16.5 9.5" />
    <path d="M20.73 6.96 12 2 3.27 6.96" />
  </Svg>
);

export const IconRupee = (p) => (
  <Svg {...p}>
    <path d="M6 4h11M6 9h11M6 4c3.5 0 6.5 1.5 6.5 4.5S15.5 13 12 13H8l8 8" />
  </Svg>
);

export const IconAlert = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 22 20H2Z" />
    <path d="M12 9.5v4.2" />
    <circle cx="12" cy="16.8" r="0.4" fill="currentColor" />
  </Svg>
);

export const IconInbox = (p) => (
  <Svg {...p}>
    <path d="M3 12h4.5l1.5 3h6l1.5-3H21" />
    <path d="M5.5 5h13l2.5 7v6a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18v-6Z" />
  </Svg>
);

export const IconLoader = (p) => (
  <Svg {...p}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </Svg>
);

export const IconInfo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <circle cx="12" cy="7.8" r="0.4" fill="currentColor" />
  </Svg>
);
