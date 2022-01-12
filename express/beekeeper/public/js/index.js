function collapsible() {
  const elems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elems, { accordion: false });
}
function listHeaders(headers) {
  let list = "";
  for (const [key, value] of Object.entries(headers)) {
    list += `<li><b>${key}:</b> ${value}</li>`;
  }
  return list;
}
function displayDetails(details) {
  const getDetailsElm = document.getElementById(`details-${details.date}`);
  let html = "";
  details.datas.forEach((detail) => {
    const result = `
        <li>
          <div class="collapsible-header">
            <i class="material-icons">offline_bolt</i>
              ${detail.fileInclusion}
          </div>
          <div class="collapsible-body">
            <b>Request IP : </b><span>${detail.ip}</span><br/>
            <b>Request url : </b><span>${detail.url}</span><br/>
            <b>Remote url : </b>
              <a href="${detail.fileInclusion}" target="_blank">
                ${detail.fileInclusion}
              </a><br/>
            <b>Request headers:</b><br/>
            <ul style=" padding-left : 5px; 
                        padding-right : 5px;
                        word-wrap: break-word;">
              ${listHeaders(detail.headers)}
            </ul>
          </div>
        </li>`;
    html += result;
  });
  getDetailsElm.innerHTML = html;
  collapsible();
}
function displayResults(results) {
  const getResultsElm = document.getElementById("results");
  let html = "";
  results.forEach((darts) => {
    const result = `
        <li>
          <div class="collapsible-header">
            <i class="material-icons">keyboard_arrow_down</i>
            ${darts.date}
          </div>
          <div class="collapsible-body">
            <ul class="collapsible" id="details-${darts.date}">
            </ul>
          </div>
        </li>
      `;
    html += result;
  });
  getResultsElm.innerHTML = html;
  results.forEach((result) => {
    displayDetails(result);
  });
}

function getDatas() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      const results = JSON.parse(xhr.responseText);
      displayResults(results);
    }
  };
  xhr.open("GET", "./beekeeper/darts");
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  getDatas();
});
