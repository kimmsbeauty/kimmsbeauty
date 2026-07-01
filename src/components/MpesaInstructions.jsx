// src/components/MpesaInstructions.jsx
// Handles three M-Pesa payment variants: Till (Buy Goods), Paybill, Send Money.

import { MPESA_GREEN, WHITE, DARK } from "../lib/constants";
import { fmt } from "../lib/utils";

function buildSteps(variant, config, amount, reference) {
  if (variant === "Till") return [
    "Go to M-Pesa on your phone",
    "Select \"Lipa na M-Pesa\"",
    "Select \"Buy Goods & Services\"",
    "Enter Till Number: " + config.till,
    "Enter Amount: KES " + Number(amount).toLocaleString(),
    reference ? "Enter Reference: " + reference : null,
    "Enter your M-Pesa PIN & confirm",
  ].filter(Boolean);

  if (variant === "Paybill") return [
    "Go to M-Pesa on your phone",
    "Select \"Lipa na M-Pesa\"",
    "Select \"Pay Bill\"",
    "Enter Business No.: " + config.paybill,
    config.account ? "Enter Account No.: " + config.account : null,
    "Enter Amount: KES " + Number(amount).toLocaleString(),
    "Enter your M-Pesa PIN & confirm",
  ].filter(Boolean);

  if (variant === "Send Money") return [
    "Go to M-Pesa on your phone",
    "Select \"Send Money\"",
    "Enter Phone No.: " + config.sendMoneyPhone,
    "Enter Amount: KES " + Number(amount).toLocaleString(),
    reference ? "Enter Reference: " + reference : null,
    "Enter your M-Pesa PIN & confirm",
  ].filter(Boolean);

  return [];
}

export default function MpesaInstructions({ amount, reference, compact = false, salon, variant = "Till" }) {
  // No hardcoded fallbacks — if a salon hasn't configured a payment method,
  // show nothing rather than defaulting to another salon's details.
  var till           = (salon && salon.mpesa_till)             || "";
  var name           = (salon && salon.mpesa_name)             || "";
  var paybill        = (salon && salon.mpesa_paybill)          || "";
  var account        = (salon && salon.mpesa_account)          || "";
  var sendMoneyPhone = (salon && salon.mpesa_send_money_phone) || "";

  var config = { till, name, paybill, account, sendMoneyPhone };

  var label = variant === "Till"
    ? "Buy Goods & Services"
    : variant === "Paybill"
    ? "Pay Bill"
    : "Send Money";

  var primaryRef = variant === "Till"
    ? till
    : variant === "Paybill"
    ? paybill
    : sendMoneyPhone;

  var primaryLabel = variant === "Till"
    ? "Till Number"
    : variant === "Paybill"
    ? "Business No."
    : "Phone No.";

  var steps = buildSteps(variant, config, amount, reference);

  if (compact) {
    return (
      <div style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <span style={{ fontWeight: 800, fontSize: 13, color: "#166534" }}>Lipa na M-Pesa — {label}</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ background: WHITE, borderRadius: 8, padding: "8px 12px", border: "1px solid #BBF7D0", flex: 1, minWidth: 100 }}>
            <div style={{ fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>{primaryLabel}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: MPESA_GREEN }}>{primaryRef}</div>
          </div>
          <div style={{ background: WHITE, borderRadius: 8, padding: "8px 12px", border: "1px solid #BBF7D0", flex: 1, minWidth: 100 }}>
            <div style={{ fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Amount</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: DARK }}>{fmt(amount)}</div>
          </div>
          {variant === "Paybill" && account && (
            <div style={{ background: WHITE, borderRadius: 8, padding: "8px 12px", border: "1px solid #BBF7D0", flex: 1, minWidth: 100 }}>
              <div style={{ fontSize: 10, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Account No.</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: DARK }}>{account}</div>
            </div>
          )}
        </div>
        {variant === "Till" && name && (
          <div style={{ fontSize: 11, color: "#166534", marginTop: 8, fontWeight: 600 }}>{name}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: "#F0FDF4", border: "2px solid #BBF7D0", borderRadius: 16, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>📱</span>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16, color: "#166534" }}>Lipa na M-Pesa</div>
          <div style={{ fontSize: 12, color: "#4ADE80" }}>{label}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, background: WHITE, borderRadius: 12, padding: "14px 16px", border: "2px solid #4ADE80", textAlign: "center", minWidth: 100 }}>
          <div style={{ fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{primaryLabel}</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: MPESA_GREEN, letterSpacing: "0.1em" }}>{primaryRef}</div>
          {variant === "Till" && name && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{name}</div>}
        </div>
        {variant === "Paybill" && account && (
          <div style={{ flex: 1, background: WHITE, borderRadius: 12, padding: "14px 16px", border: "2px solid #4ADE80", textAlign: "center", minWidth: 100 }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Account No.</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: DARK }}>{account}</div>
          </div>
        )}
        <div style={{ flex: 1, background: WHITE, borderRadius: 12, padding: "14px 16px", border: "2px solid #4ADE80", textAlign: "center", minWidth: 100 }}>
          <div style={{ fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Amount</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: DARK }}>{fmt(amount)}</div>
          {reference && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Ref: {reference}</div>}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #BBF7D0", paddingTop: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#166534", marginBottom: 10, textTransform: "uppercase" }}>
          How to pay
        </div>
        {steps.map(function(step, i) {
          return (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: MPESA_GREEN, color: WHITE, fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 13, color: DARK, paddingTop: 2, lineHeight: 1.4 }}>{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
