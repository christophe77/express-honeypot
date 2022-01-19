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
    let result = "";
    if (detail.dpaste) {
      result = `
      <li>
        <div style="padding:5px;">
          <b>Request url : </b><span>${detail.url}</span><br/>
        </div>
      </li>`;
    } else {
      result = `
      <li>
        <div class="collapsible-header">
          <i class="material-icons">offline_bolt</i>
            ${detail.fileInclusion}
        </div>
        <div class="collapsible-body" style="word-wrap: break-word;">
          <b>Request IP : </b><br/>
          <ul style=" padding-left : 10px; 
                      padding-right : 10px;">
              <li>${detail.ip} ${detail.location.isp || ""}</li>
              <li>${detail.location.countryEmoji || ""}
                  ${detail.location.country || ""} 
                  - ${detail.location.city || ""}</li>
          </ul>
          <b>Request url : </b><span>${detail.url}</span><br/>
          <b>Remote url : </b>
            <a href="${detail.fileInclusion}" target="_blank">
              ${detail.fileInclusion}
            </a><br/>
            <b>Dpaste save url : </b><a href="${
              detail.reportUrl
            }" target="_blank">${detail.reportUrl}</a><br/>
            <b>Inclusion file : </b>
            <a href="../hive/?file=${detail.file.fileName}&path=${
        detail.file.pathName
      }" target="_blank">
              ${detail.file.fileName}
            </a><br/>
          <b>Request headers:</b><br/>
          <ul style=" padding-left : 10px; 
                      padding-right : 10px;">
            ${listHeaders(detail.headers)}
          </ul>
        </div>
      </li>`;
    }

    html += result;
  });
  getDetailsElm.innerHTML = html;
  collapsible();
}
function deleteLog(date) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      const results = JSON.parse(xhr.responseText);
      if (results.deleted === true) {
        getDatas();
      }
    }
  };
  xhr.open("GET", `./beekeeper/d/log/${date}`);
  xhr.send();
}
function displayResults(results) {
  const getResultsElm = document.getElementById("results");
  let html = "";
  results.forEach((darts) => {
    const result = ` 
        <li>
          <div class="collapsible-header" style="display: block;">
            <i class="material-icons">keyboard_arrow_down</i>
            ${darts.date}
            <div class="right">
              <i class="material-icons" onclick="deleteLog('${darts.date}')">delete</i>
            </div>
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
  xhr.open("GET", "/beekeeper/darts");
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  getDatas();
});
