// src/components/SalonBrandmark.jsx
//
// Generic replacement for the old KimmsLogo.jsx, used by LoginPage,
// DeviceLoginPage, and POSApp's header strip. Renders whichever salon
// is passed in via the `salon` prop (shape: { name, tagline, logo_url,
// primary_color }), instead of Kimms' bespoke hardcoded crest+tagline.
//
// If logo_url is set, renders that image. Otherwise falls back to a
// plain text wordmark using the salon's real name — deliberately no
// crest/icon graphic in the fallback case, since that graphic was
// bespoke Kimms artwork that doesn't generalize to an arbitrary salon
// with no logo yet. Kimms' own logo_url is also null right now, so it
// gets this same plain-text treatment going forward too — no
// special-casing.
//
// Colors are derived from the salon's own primary_color via
// lighten()/darken() in colorUtils.js — see that file for the
// known, accepted tradeoff this involves.

import { lighten, darken } from "../lib/colorUtils";
import { GOLD } from "../lib/constants.js";

export default function SalonBrandmark({ salon, size, dark }) {
  size = size || "md";
  dark = dark || false;

  var s = {
    sm: { logo: 28, name: 15, tag: 9  },
    md: { logo: 40, name: 22, tag: 12 },
    lg: { logo: 56, name: 32, tag: 16 },
  }[size] || { logo: 40, name: 22, tag: 12 };

  var primary = (salon && salon.primary_color) || GOLD;
  var accentColor = dark ? darken(primary, 18) : lighten(primary, 14);

  var name = (salon && salon.name) || "Trimora POS";
  var tagline = salon && salon.tagline;
  var logoUrl = salon && salon.logo_url;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.1 }}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          style={{ maxHeight: s.logo, maxWidth: s.logo * 4, objectFit: "contain", marginBottom: 4 }}
        />
      ) : (
        <div style={{ fontFamily: "Georgia,serif", fontSize: s.name, fontWeight: 900, color: accentColor, letterSpacing: "0.04em", fontStyle: "italic" }}>
          {name}
        </div>
      )}
      {tagline && (
        <div style={{ fontSize: s.tag, color: accentColor, letterSpacing: "0.1em", fontStyle: "italic", marginTop: 1, opacity: 0.85 }}>
          {tagline}
        </div>
      )}
    </div>
  );
}
