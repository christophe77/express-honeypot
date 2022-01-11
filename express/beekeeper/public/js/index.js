function collapsible() {
  const elems = document.querySelectorAll(".collapsible");
  const instances = M.Collapsible.init(elems, { accordion: false });
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
            <span>${detail.url}</span>
              <p>${JSON.stringify(detail.headers)}</p>
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
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      const results = JSON.parse(xhr.responseText);
      console.log();
      displayResults(results);
    }
  };
  xhr.open("GET", "./beekeeper/darts");
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  getDatas();
});
