// supabase/functions/mpesa-callback/index.ts
//
// Receives the asynchronous STK Push callback from Safaricom.
// Safaricom POSTs to this URL after the customer enters their PIN
// (or cancels, or the request times out).
//
// This function:
//   1. Parses Safaricom's callback body
//   2. Updates the matching salon_mpesa_payments row to confirmed/failed
//   3. Returns 200 immediately (Safaricom requires a fast response)
//
// The frontend polls salon_mpesa_payments by checkout_request_id
// to detect when status changes from "pending" to "confirmed"/"failed".

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  // Always respond 200 immediately — Safaricom will retry if we don't
  // Safaricom does not send CORS preflight; this endpoint is server-to-server only

  try {
    const body = await req.json();
    console.log("M-Pesa callback received:", JSON.stringify(body));

    // Safaricom callback structure:
    // { Body: { stkCallback: { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata? } } }
    const callback = body?.Body?.stkCallback;
    if (!callback) {
      console.error("Unexpected callback shape:", JSON.stringify(body));
      return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      CheckoutRequestID,
      MerchantRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = callback;

    // ResultCode 0 = success, anything else = failure/cancellation
    const succeeded = ResultCode === 0 || ResultCode === "0";

    // Extract M-Pesa receipt number from metadata items (only present on success)
    let mpesaReceipt: string | null = null;
    if (succeeded && CallbackMetadata?.Item) {
      const receiptItem = CallbackMetadata.Item.find(
        (i: { Name: string; Value?: string }) => i.Name === "MpesaReceiptNumber"
      );
      if (receiptItem) mpesaReceipt = receiptItem.Value ?? null;
    }

    // Use service role to update the payment record (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: updateError } = await supabase
      .from("salon_mpesa_payments")
      .update({
        status:       succeeded ? "confirmed" : "failed",
        result_code:  String(ResultCode),
        result_desc:  ResultDesc,
        mpesa_receipt: mpesaReceipt,
        updated_at:   new Date().toISOString(),
      })
      .eq("checkout_request_id", CheckoutRequestID);

    if (updateError) {
      console.error("Failed to update payment record:", updateError);
    } else {
      console.log(
        `Payment ${CheckoutRequestID} → ${succeeded ? "confirmed" : "failed"}`,
        mpesaReceipt ? `receipt: ${mpesaReceipt}` : ""
      );
    }

    // Safaricom expects this exact response shape
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("mpesa-callback error:", err);
    // Still return 200 — never let Safaricom think the callback failed
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
});
