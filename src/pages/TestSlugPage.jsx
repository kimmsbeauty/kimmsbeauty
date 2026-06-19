// src/pages/TestSlugPage.jsx
//
// TEMPORARY scratch page for confirming generateUniqueSlug() works as
// expected. Delete this file and its route in App.jsx once Step 6 is
// confirmed — it has no place in the real app.

import { useState } from "react";
import { generateUniqueSlug } from "../lib/slugify";

export default function TestSlugPage() {
  var nameState = useState("");
  var name = nameState[0]; var setName = nameState[1];

  var resultState = useState("");
  var result = resultState[0]; var setResult = resultState[1];

  var loadingState = useState(false);
  var loading = loadingState[0]; var setLoading = loadingState[1];

  async function handleTest() {
    if (!name) return;
    setLoading(true);
    var slug = await generateUniqueSlug(name);
    setResult(slug);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 360, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
          🧪 TEMPORARY — Step 6 slug test. Delete this page once confirmed.
        </div>
        <input
          placeholder="Salon name (e.g. Test Salon)"
          value={name}
          onChange={function(e){ setName(e.target.value); }}
          onKeyDown={function(e){ if (e.key === "Enter") handleTest(); }}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #555", background: "#1A1A1A", color: "#fff", fontSize: 14, marginBottom: 10, boxSizing: "border-box" }}
        />
        <button
          onClick={handleTest}
          disabled={loading}
          style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: "#C9A84C", color: "#000", fontWeight: 700, cursor: "pointer", marginBottom: 16 }}
        >
          {loading ? "Checking..." : "Generate Slug"}
        </button>
        {result && (
          <div style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Result:</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#C9A84C" }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
