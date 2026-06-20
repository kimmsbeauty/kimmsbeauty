// src/lib/currentSalon.js
//
// Holds which salon is "active" right now, so db.js (a plain module,
// not a React component) can read it on every request without needing
// React Context. Set by SalonGate whenever it resolves a slug; read by
// db.js to scope every GET/POST/PATCH against the 9 tenant tables.
//
// If nothing has set it — the legacy unprefixed /pos, /booking,
// /rate/:token routes have no SalonGate at all — db.js falls back to
// KIMMS_SALON_ID, so those routes keep working exactly as before.

var currentSalonId = null;

export function setCurrentSalonId(id) {
  currentSalonId = id;
}

export function getCurrentSalonId() {
  return currentSalonId;
}
