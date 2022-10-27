let map = initMap();
let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(map);
window.addEventListener("DOMContentLoaded", async function () {
  function init() {
    // let resultOfSearchLayer = L.layerGroup();
    // resultOfSearchLayer.addTo(map);

    document
      .querySelector("#btnSearch")
      .addEventListener("click", async function () {
        document.querySelector("#results").innerHTML = "";
        // resultOfSearchLayer.clearLayers();
        markerClusterLayer.clearLayers();

        let queryTerms = document.querySelector("#queryTerms").value;
        let boundaries = map.getBounds();
        let center = boundaries.getCenter();
        let latLng = center.lat + "," + center.lng;
        let selectedCategory = 16000;
        let selectedIcon = allMarker;

        // let category = {
        //   park: 16032,
        //   scenic: 16046,
        //   entertainment: 13000,
        //   bowling: 13006,
        //   sports: 18000,
        //   restaurant: 13000,
        //   "pet-cafe": 13063,
        //   bar: 13003,
        // };

        // test case if user dint input anything .
        // preset it to certain category .

        let queryResults = await generalSearch(
          latLng,
          queryTerms,
          100000,
          selectedCategory
        );

        let queryResultsElement = document.querySelector("#results");

        for (index of queryResults.results) {
          let lat = index.geocodes.main.latitude;
          let lng = index.geocodes.main.longitude;
          let locationName = index.name;
          let eachPic = index.fsq_id;

          let marker = L.marker([lat, lng], { icon: selectedIcon });
          // marker.addTo(resultOfSearchLayer);

          marker.addTo(markerClusterLayer);

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
                // console.log(fullUrl);
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
  //weather input
  let weatherData = await weather(1.29, 103.85);
  // console.log(weatherData);
  const temp = weatherData.main.temp;
  const minTemp = weatherData.main.temp_min;
  const maxTemp = weatherData.main.temp_max;
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  // console.log(temp, weatherDescription, icon, imageURL);
  document.querySelector("#weather-tab").addEventListener("click", function () {
    let weatherContainer = document.querySelector("#weather-tab-pane");
    weatherContainer.innerHTML = "";
    weatherContainer.innerHTML += `
    <div class="card" style="object-fit:contain;">
    <img src=${imageURL} class="card-img-top" alt="icon.png">
    <div class="card-body">
      <h5 class="card-title">Weather Forecast</h5>
      <p class="card-text">${weatherDescription}</p>
      <p class="card-text">${temp}</p>
      <p class="card-text">${minTemp} ${maxTemp}</p>
    </div>  
  </div>
    `;
  });
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
