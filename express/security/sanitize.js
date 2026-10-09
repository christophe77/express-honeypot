const path = require("path");

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidDate(date) {
  return typeof date === "string" && DATE_REGEX.test(date);
}

// Turn whatever the attacker named their payload into a boring local name.
function sanitizeFileName(name) {
  const base = path.basename(String(name || "")).replace(/[^\w.-]/g, "_");
  const trimmed = base.replace(/^\.+/, "").slice(0, 100);
  return trimmed || "payload";
}

// Resolve `segments` inside `baseDir`, or return null if it tries to escape.
function resolveInside(baseDir, ...segments) {
  const base = path.resolve(baseDir);
  const target = path.resolve(base, ...segments);
  return target.startsWith(base + path.sep) ? target : null;
}

module.exports = { escapeHtml, isValidDate, sanitizeFileName, resolveInside };
