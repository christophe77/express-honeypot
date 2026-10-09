// Every value displayed here was written by a bot. Treat it accordingly.
function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
// Only real http(s) links become clickable, no javascript: surprises.
function safeLink(url) {
  if (!/^https?:\/\//i.test(String(url || ""))) return esc(url);
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a>`;
}
function collapsible() {
  const elems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elems, { accordion: false });
}
function listHeaders(headers) {
  let list = "";
  for (const [key, value] of Object.entries(headers || {})) {
    list += `<li><b>${esc(key)}:</b> ${esc(value)}</li>`;
  }
  return list;
}
function payloadLink(file) {
  if (!file || !file.fileName) return "none";
  const href = `/beekeeper/files/${encodeURIComponent(
    file.pathName
  )}/${encodeURIComponent(file.fileName)}`;
  const hash = file.sha256 ? ` <small>sha256 ${esc(file.sha256)}</small>` : "";
  return `<a href="${esc(href)}">${esc(file.fileName)}</a>${hash}`;
}
function displayDetails(details, container) {
  let html = "";
  details.datas.forEach((detail) => {
    const location = detail.location || {};
    html += `
      <li>
        <div class="collapsible-header">
          <i class="material-icons">offline_bolt</i>
            ${esc(detail.fileInclusion || detail.url)}
        </div>
        <div class="collapsible-body" style="word-wrap: break-word;">
          <b>Request IP : </b><br/>
          <ul style="padding-left: 10px; padding-right: 10px;">
              <li>${esc(detail.ip)} ${esc(location.isp)}</li>
              <li>${esc(location.countryEmoji)}
                  ${esc(location.country)}
                  - ${esc(location.city)}</li>
          </ul>
          <b>Request url : </b><span>${esc(detail.url)}</span><br/>
          <b>Remote url : </b>${safeLink(detail.fileInclusion)}<br/>
          <b>Dpaste save url : </b>${safeLink(detail.reportUrl)}<br/>
          <b>Inclusion file : </b>${payloadLink(detail.file)}<br/>
          <b>Request headers:</b><br/>
          <ul style="padding-left: 10px; padding-right: 10px;">
            ${listHeaders(detail.headers)}
          </ul>
        </div>
      </li>`;
  });
  container.innerHTML = html;
}
async function deleteLog(date) {
  if (!window.confirm(`Delete all logs and payloads for ${date}?`)) return;
  const response = await fetch(`/beekeeper/logs/${encodeURIComponent(date)}`, {
    method: "DELETE",
  });
  if (response.ok) getDatas();
}
function displayResults(results) {
  const resultsElm = document.getElementById("results");
  resultsElm.innerHTML = "";
  results.forEach((darts) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="collapsible-header" style="display: block;">
        <i class="material-icons">keyboard_arrow_down</i>
        ${esc(darts.date)}
        <div class="right">
          <i class="material-icons delete-log">delete</i>
        </div>
      </div>
      <div class="collapsible-body">
        <ul class="collapsible"></ul>
      </div>`;
    item.querySelector(".delete-log").addEventListener("click", (event) => {
      event.stopPropagation();
      deleteLog(darts.date);
    });
    displayDetails(darts, item.querySelector("ul.collapsible"));
    resultsElm.appendChild(item);
  });
  collapsible();
}

async function getDatas() {
  const response = await fetch("/beekeeper/darts");
  if (response.ok) displayResults(await response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  getDatas();
});
