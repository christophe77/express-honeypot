document.addEventListener("DOMContentLoaded", async function () {
  const elems = document.querySelectorAll(".collapsible");
  const instances = M.Collapsible.init(elems, { accordion: false });
  getDatas();
});

function displayResults(results) {
  const getResultsElm = document.getElementById("results");
  let html = "";
  results.forEach(({ fileInclusion, url, headers }) => {
    const result = `
                <li>
                    <div class="collapsible-header">
                        <i class="material-icons">offline_bolt</i>${fileInclusion}
                    </div>
                    <div class="collapsible-body">
                        <span>${fileInclusion}</span>
                        <p>${JSON.stringify(headers)}</p>
                    </div>
                </li>
        `;
    html += result;
  });
  getResultsElm.innerHTML = html;
}

async function getDatas() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      const results = JSON.parse(xhr.responseText);
      displayResults(results.datas);
    }
  };
  xhr.open("GET", "./beekeeper/darts");
  xhr.send();
}
