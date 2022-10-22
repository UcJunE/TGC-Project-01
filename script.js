window.addEventListener("DOMContentLoaded", async function () {
  function init() {
    let map = initMap();
    let resultOfSearchLayer = L.layerGroup();
    resultOfSearchLayer.addTo(map);

    document
      .querySelector("#btnSearch")
      .addEventListener("click", async function () {
        resultOfSearchLayer.clearLayers();

        let queryTerms = document.querySelector("#queryTerms").value;
        let boundaries = map.getBounds();
        let center = boundaries.getCenter();
        let latLng = center.lat + "," + center.lng;

        let queryResults = await generalSearch(latLng, queryTerms, 10000);

        let queryResultsElement = document.querySelector("#results");

        for (index of queryResults.results) {
          let lat = index.geocodes.main.latitude;
          let lng = index.geocodes.main.longitude;
          let locationName = index.name;
          let eachPic = index.fsq_id;

          let marker = L.marker([lat, lng]).addTo(resultOfSearchLayer);

          marker.bindPopup(function () {
            let newDivElement = document.createElement("div");
            newDivElement.classList.add("popup");
            newDivElement.innerHTML += `<h1>${locationName}</h1>`;

            async function retrievePicture() {
              let errorImg = "images/apology-pic.png";
              let pic = await getPic(eachPic);
              //pic == response.data
              let url = pic[0];

              if (url) {
                let fullUrl = url.prefix + 300 * 300 + pic[0].suffix;
                console.log(fullUrl);
                newDivElement.innerHTML += `<div><img class="img-fluid" src=${fullUrl} /></div>`;
              } else {
                newDivElement.innerHTML += `<div><img class="img-fluid" src="${errorImg}"></div>`;
              }
            }
            retrievePicture();
            return newDivElement;
          });

          let resultElement = document.createElement("div");
          resultElement.innerText = locationName;
          resultElement.classList.add("search-result");

          resultElement.addEventListener("click", function () {
            map.flyTo([lat, lng], 16);
            marker.openPopup();
          });
          queryResultsElement.appendChild(resultElement);
        }
      });
  }
  init();
});

function initMap() {
  // create a map object
  let map = L.map("map");
  // set the center point and the zoom
  map.setView([1.29, 103.85], 13);

  // set up the tile layer
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    }
  ).addTo(map);

  return map;
}
