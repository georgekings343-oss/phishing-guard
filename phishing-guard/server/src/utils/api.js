// src/utils/api.js
export async function apiFetch(path, opts = {}) {
  const base = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
  const token = localStorage.getItem("sm_token");
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(base + path, { ...opts, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'API error');
  }
  return res.json();
}
