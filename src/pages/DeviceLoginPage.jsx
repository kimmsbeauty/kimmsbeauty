// src/pages/DeviceLoginPage.jsx

import { useState } from "react";
import KimmsLogo from "../components/KimmsLogo";
import GoldBtn from "../components/GoldBtn";
import { signInDevice } from "../lib/deviceAuth";
import { GOLD, GOLD_LT, GOLD_DIM, BLACK, WHITE, RED } from "../lib/constants.js";

export default function DeviceLoginPage({ onSuccess, reauth }) {
  var emailState    = useState("");
  var email         = emailState[0]; var setEmail = emailState[1];

  var passwordState = useState("");
  var password       = passwordState[0]; var setPassword = passwordState[1];

  var errorState    = useState("");
  var error         = errorState[0]; var setError = errorState[1];

  var loadingState  = useState(false);
  var loading       = loadingState[0]; var setLoading = loadingState[1];

  async function handleLogin() {
    if (!email || !password) return setError("Please enter both email and password.");
    setLoading(true);
    setError("");

    var result = await signInDevice(email, password);
    setLoading(false);

    if (result.ok) {
      onSuccess();
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg," + BLACK + " 0%,#1A1400 60%,#2C1F00 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>

      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "2px solid " + GOLD, opacity: 0.1, pointerEvents: "none" }} />

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid " + GOLD_DIM, borderRadius: 24, padding: 36, maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>

        <KimmsLogo size="lg" dark={false} />
        <div style={{ borderTop: "1px solid " + GOLD_DIM, margin: "24px 0 20px", opacity: 0.4 }} />

        <div style={{ fontSize: 16, fontWeight: 900, color: GOLD_LT, marginBottom: 8 }}>
          {reauth ? "Please Sign In Again" : "Activate This Device"}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20, lineHeight: 1.6 }}>
          {reauth
            ? "For your security, this device needs to sign in again."
            : "Sign in once to connect this device to Kimm's Beauty Parlour."}
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function(e){ setEmail(e.target.value); setError(""); }}
          onKeyDown={function(e){ if (e.key === "Enter") handleLogin(); }}
          disabled={loading}
          style={{ width: "100%", borderRadius: 10, border: "1.5px solid " + (error ? RED : GOLD_DIM), background: "rgba(255,255,255,0.06)", padding: "13px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none", color: WHITE, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function(e){ setPassword(e.target.value); setError(""); }}
          onKeyDown={function(e){ if (e.key === "Enter") handleLogin(); }}
          disabled={loading}
          style={{ width: "100%", borderRadius: 10, border: "1.5px solid " + (error ? RED : GOLD_DIM), background: "rgba(255,255,255,0.06)", padding: "13px 14px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", outline: "none", color: WHITE, marginBottom: 8 }}
        />

        {error && (
          <div style={{ color: RED, fontSize: 12, marginBottom: 8, padding: "6px 10px", background: "rgba(239,68,68,0.1)", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)" }}>
            {error}
          </div>
        )}

        <GoldBtn onClick={handleLogin} disabled={loading} style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Signing in..." : "Sign In →"}
        </GoldBtn>
      </div>
    </div>
  );
}
