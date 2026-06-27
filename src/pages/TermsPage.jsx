// src/pages/TermsPage.jsx
//
// Full Terms & Conditions for Trimora POS.
// Accessible at /terms — opens in a new tab from the onboarding form.

import { GOLD, GOLD_DIM, BLACK, WHITE, DARK, CREAM } from "../lib/constants.js";

var section = {
  marginBottom: 28,
};

var h2 = {
  fontSize: 15,
  fontWeight: 900,
  color: GOLD_DIM,
  marginBottom: 8,
  marginTop: 0,
};

var p = {
  fontSize: 13,
  color: "#444",
  lineHeight: 1.8,
  marginBottom: 10,
  marginTop: 0,
};

var li = {
  fontSize: 13,
  color: "#444",
  lineHeight: 1.8,
  marginBottom: 6,
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ background: BLACK, padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: GOLD, letterSpacing: "0.12em" }}>TRIMORA</div>
        <div style={{ fontSize: 10, color: GOLD_DIM, letterSpacing: "0.2em", marginTop: 2 }}>SYSTEMS</div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 80px" }}>

        <h1 style={{ fontSize: 24, fontWeight: 900, color: DARK, marginBottom: 4 }}>
          Terms & Conditions
        </h1>
        <p style={{ ...p, color: "#888", marginBottom: 32 }}>
          Trimora Systems · Last updated: June 2026 · Governing law: Republic of Kenya
        </p>

        {/* 1 */}
        <div style={section}>
          <h2 style={h2}>1. About Trimora POS</h2>
          <p style={p}>
            Trimora POS is a cloud-based point-of-sale and business management platform developed and operated by Trimora Systems, a technology company registered in Kenya. The platform is designed for salons, barbershops, and beauty businesses operating in Kenya and the East African region.
          </p>
          <p style={p}>
            By signing up for and using Trimora POS, you ("the Salon" or "Subscriber") agree to be bound by these Terms and Conditions. If you do not agree, you must not use the platform.
          </p>
        </div>

        {/* 2 */}
        <div style={section}>
          <h2 style={h2}>2. Eligibility</h2>
          <p style={p}>To use Trimora POS you must:</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>Be at least 18 years of age.</li>
            <li style={li}>Be the owner or authorised representative of the business you are registering.</li>
            <li style={li}>Provide accurate and truthful information during onboarding.</li>
            <li style={li}>Have received a valid invite link issued by Trimora Systems.</li>
          </ul>
          <p style={{ ...p, marginTop: 10 }}>
            Trimora Systems reserves the right to reject or revoke access at any time if false or misleading information is provided.
          </p>
        </div>

        {/* 3 */}
        <div style={section}>
          <h2 style={h2}>3. Subscription Plans & Payment</h2>
          <p style={p}>Trimora POS is a paid subscription service. The following plans are currently available:</p>
          <div style={{ overflowX: "auto", marginBottom: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: GOLD_DIM + "22" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 800, color: DARK, borderBottom: "2px solid " + GOLD_DIM }}>Plan</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 800, color: DARK, borderBottom: "2px solid " + GOLD_DIM }}>Price (KES)</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 800, color: DARK, borderBottom: "2px solid " + GOLD_DIM }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly",     "1,200",        "30 days"],
                  ["Quarterly",   "3,300",        "90 days"],
                  ["Semi-Annual", "6,000",        "180 days"],
                  ["Annual",      "10,800",       "365 days"],
                  ["Lifetime",    "38,000 (once)","Perpetual"],
                ].map(function(row, i) {
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? WHITE : CREAM }}>
                      <td style={{ padding: "8px 12px", color: DARK, fontWeight: 700 }}>{row[0]}</td>
                      <td style={{ padding: "8px 12px", color: DARK }}>KES {row[1]}</td>
                      <td style={{ padding: "8px 12px", color: "#666" }}>{row[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>All payments are made in Kenyan Shillings (KES) via M-Pesa or as agreed with Trimora Systems.</li>
            <li style={li}>Subscriptions are not automatically renewed. Renewal is initiated by the Subscriber and confirmed by Trimora Systems upon receipt of payment.</li>
            <li style={li}>Prices are subject to change with 30 days' notice. Any price change will not affect a subscription period already paid for.</li>
            <li style={li}>The Lifetime plan grants perpetual access to the version of the platform at the time of purchase. Major new features introduced after purchase may require an additional upgrade fee.</li>
            <li style={li}>All fees are non-refundable except where required by the laws of Kenya.</li>
          </ul>
        </div>

        {/* 4 */}
        <div style={section}>
          <h2 style={h2}>4. Grace Period & Suspension for Non-Payment</h2>
          <p style={p}>
            If a subscription expires and payment is not received, the Subscriber is granted a <b>7-day grace period</b> during which the platform remains accessible. A warning is displayed to the salon administrator during this period.
          </p>
          <p style={p}>
            After the 7-day grace period, access to the platform — including the POS, booking page, and all management features — will be automatically suspended until payment is received and confirmed by Trimora Systems.
          </p>
          <p style={p}>
            Suspension does not result in deletion of data. All salon data is retained for a minimum of 90 days after suspension. After 90 days of non-payment following suspension, Trimora Systems reserves the right to permanently delete the account and all associated data.
          </p>
        </div>

        {/* 5 */}
        <div style={section}>
          <h2 style={h2}>5. Data Ownership & Privacy</h2>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>All data entered into Trimora POS — including customer records, sales history, staff information, and business settings — belongs to the Subscriber.</li>
            <li style={li}>Trimora Systems does not sell, share, or disclose Subscriber data to third parties without consent, except as required by Kenyan law.</li>
            <li style={li}>Trimora Systems may use anonymised, aggregated platform statistics (e.g. total number of salons, total transactions) for business reporting and marketing. No individually identifiable data is used for this purpose.</li>
            <li style={li}>Customer personal data collected through the booking page (name, phone number) is stored on behalf of the Salon and is the Salon's responsibility to handle in accordance with applicable Kenyan data protection laws, including the Data Protection Act 2019.</li>
            <li style={li}>Trimora Systems uses Supabase (EU-hosted infrastructure) for data storage. Data is encrypted at rest and in transit.</li>
          </ul>
        </div>

        {/* 6 */}
        <div style={section}>
          <h2 style={h2}>6. Acceptable Use</h2>
          <p style={p}>You agree to use Trimora POS only for lawful business purposes. You must not:</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>Use the platform to process transactions for illegal goods or services.</li>
            <li style={li}>Attempt to reverse-engineer, copy, or resell the platform or any part of it.</li>
            <li style={li}>Share your account credentials with persons outside your business.</li>
            <li style={li}>Use the platform to harass, defraud, or deceive your customers.</li>
            <li style={li}>Attempt to access another salon's data or bypass the platform's security controls.</li>
          </ul>
          <p style={{ ...p, marginTop: 10 }}>
            Violation of these terms may result in immediate suspension or termination without refund.
          </p>
        </div>

        {/* 7 */}
        <div style={section}>
          <h2 style={h2}>7. M-Pesa & Payment Processing</h2>
          <p style={p}>
            Trimora POS integrates with Safaricom's M-Pesa Daraja API to facilitate customer payments. The Subscriber is responsible for:
          </p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>Registering and maintaining their own M-Pesa Business account (Buy Goods or Paybill) with Safaricom.</li>
            <li style={li}>Ensuring their M-Pesa till number and credentials entered into Trimora POS are correct.</li>
            <li style={li}>Any M-Pesa transaction fees charged by Safaricom — these are not covered by Trimora Systems.</li>
            <li style={li}>Resolving any disputes with customers regarding M-Pesa payments — Trimora Systems is not a party to payment transactions between the Salon and its customers.</li>
          </ul>
        </div>

        {/* 8 */}
        <div style={section}>
          <h2 style={h2}>8. Service Availability</h2>
          <p style={p}>
            Trimora Systems will make reasonable efforts to ensure the platform is available 24/7. However, we do not guarantee uninterrupted service and are not liable for downtime caused by:
          </p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}>Scheduled or emergency maintenance.</li>
            <li style={li}>Third-party infrastructure issues (Supabase, Vercel, Safaricom, internet providers).</li>
            <li style={li}>Force majeure events including natural disasters, power outages, or government actions.</li>
          </ul>
          <p style={{ ...p, marginTop: 10 }}>
            In the event of planned maintenance that will cause significant downtime, Trimora Systems will provide advance notice where possible.
          </p>
        </div>

        {/* 9 */}
        <div style={section}>
          <h2 style={h2}>9. Intellectual Property</h2>
          <p style={p}>
            All software, design, branding, and intellectual property in Trimora POS belongs exclusively to Trimora Systems. The Subscriber is granted a non-exclusive, non-transferable licence to use the platform for the duration of their active subscription.
          </p>
          <p style={p}>
            The Subscriber retains all intellectual property rights in their own business name, logo, and branding uploaded to the platform.
          </p>
        </div>

        {/* 10 */}
        <div style={section}>
          <h2 style={h2}>10. Termination</h2>
          <p style={p}>Either party may terminate the subscription:</p>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li style={li}><b>By the Subscriber:</b> at any time by contacting Trimora Systems at admin@trimorasystems.com. No refund will be issued for the unused portion of a subscription period.</li>
            <li style={li}><b>By Trimora Systems:</b> immediately and without notice in the event of a serious breach of these Terms. With 30 days' notice for any other reason, with a pro-rata refund of the unused subscription period.</li>
          </ul>
          <p style={{ ...p, marginTop: 10 }}>
            Upon termination, the Subscriber may request an export of their data within 30 days. After 30 days, Trimora Systems is not obligated to retain or provide the data.
          </p>
        </div>

        {/* 11 */}
        <div style={section}>
          <h2 style={h2}>11. Limitation of Liability</h2>
          <p style={p}>
            To the maximum extent permitted by Kenyan law, Trimora Systems shall not be liable for any indirect, incidental, or consequential loss arising from use of the platform, including but not limited to loss of revenue, loss of data, or business interruption.
          </p>
          <p style={p}>
            Trimora Systems' total liability to the Subscriber for any claim shall not exceed the total subscription fees paid by the Subscriber in the 3 months preceding the claim.
          </p>
        </div>

        {/* 12 */}
        <div style={section}>
          <h2 style={h2}>12. Amendments</h2>
          <p style={p}>
            Trimora Systems may update these Terms and Conditions from time to time. Subscribers will be notified of material changes via the platform or by email at least 14 days before the changes take effect. Continued use of the platform after the effective date constitutes acceptance of the updated terms.
          </p>
        </div>

        {/* 13 */}
        <div style={section}>
          <h2 style={h2}>13. Governing Law & Dispute Resolution</h2>
          <p style={p}>
            These Terms and Conditions are governed by the laws of the Republic of Kenya. Any dispute arising from or relating to these Terms shall first be resolved through good-faith negotiation between the parties. If negotiation fails, disputes shall be submitted to the jurisdiction of the Kenyan courts.
          </p>
        </div>

        {/* 14 */}
        <div style={section}>
          <h2 style={h2}>14. Contact</h2>
          <p style={p}>For questions, support, or notices under these Terms, contact Trimora Systems at:</p>
          <p style={{ ...p, fontWeight: 700 }}>
            📧 <a href="mailto:admin@trimorasystems.com" style={{ color: GOLD_DIM }}>admin@trimorasystems.com</a>
          </p>
        </div>

        <div style={{ borderTop: "1px solid #ddd", paddingTop: 20, fontSize: 12, color: "#aaa", textAlign: "center" }}>
          © 2026 Trimora Systems. All rights reserved. · Nairobi, Kenya
        </div>

      </div>
    </div>
  );
}
