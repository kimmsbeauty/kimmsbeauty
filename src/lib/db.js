// src/lib/db.js

import { SUPABASE_URL, SUPABASE_KEY, KIMMS_SALON_ID } from "./constants";
import { getValidAccessToken } from "./deviceAuth";

// Tables that require salon_id on every write
const TENANT_TABLES = new Set([
  "bookings", "customers", "expenses", "feedback",
  "sales", "services", "staff", "stock", "salon_pins",
]);

// ── Offline queue ──────────────────────────────────────────────────────────
export const offlineQueue = [];
let isSyncing = false;

async function dbDirect(method, table, data = null, filters = "") {
  // Inject salon_id into all POST/PATCH payloads for tenant-scoped tables
  let body = data;
  if (data && (method === "POST" || method === "PATCH") && TENANT_TABLES.has(table)) {
    body = Array.isArray(data)
      ? data.map((row) => ({ salon_id: KIMMS_SALON_ID, ...row }))
      : { salon_id: KIMMS_SALON_ID, ...data };
  }

  // If this device has signed in (staff/admin POS), use its real token so
  // Supabase can see auth.uid(). If not (e.g. the customer-facing booking
  // and rating pages, which never sign in), fall back to the anon key —
  // exactly as before.
  const deviceToken = await getValidAccessToken();

  const url = `${SUPABASE_URL}/rest/v1/${table}${filters}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${deviceToken || SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: method === "POST" ? "return=representation" : "",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    if (method === "DELETE" || method === "PATCH") return true;
    return res.json();
  } catch (e) {
    clearTimeout(timeout);
    return null;
  }
}

export async function syncOfflineQueue() {
  if (isSyncing || offlineQueue.length === 0 || !navigator.onLine) return;
  isSyncing = true;
  while (offlineQueue.length > 0) {
    const item = offlineQueue[0];
    try {
      await dbDirect(item.method, item.table, item.data, item.filters);
      offlineQueue.shift();
    } catch (e) {
      break;
    }
  }
  isSyncing = false;
}

export async function db(method, table, data = null, filters = "") {
  if (!navigator.onLine && method !== "GET") {
    offlineQueue.push({ method, table, data, filters });
    return null;
  }
  return dbDirect(method, table, data, filters);
}
