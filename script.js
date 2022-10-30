let map = initMap();
let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(map);
window.addEventListener("DOMContentLoaded", async function () {
  function init() {
    document
      .querySelector("#btnSearch")
      .addEventListener("click", async function () {
        document.querySelector("#results").innerHTML = "";

        markerClusterLayer.clearLayers();

        let queryTerms = document.querySelector("#queryTerms").value;
        let boundaries = map.getBounds();
        let center = boundaries.getCenter();
        let latLng = center.lat + "," + center.lng;
        let selectedCategory = 16000;
        let selectedIcon = allMarker;

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
          let eachfsqId = index.fsq_id;
          let locAddress = index.location.formatted_address;
          let locCountry = index.location.locality;

          let marker = L.marker([lat, lng], { icon: selectedIcon });
          // marker.addTo(resultOfSearchLayer);

          marker.addTo(markerClusterLayer);

          marker.bindPopup(function () {
            let newDivElement = document.createElement("div");
            newDivElement.classList.add("popup");
            newDivElement.classList.add("card");

            async function retrievePicture() {
              let errorImg = "images/apology-pic.png";
              let pic = await getPic(eachfsqId);
              //pic == response.data
              let url = pic[0];

              if (url) {
                let fullUrl = url.prefix + 200 * 200 + pic[0].suffix;
                // console.log(fullUrl);
                newDivElement.innerHTML += `<img class="img-fluid card-img-top loc-pic" src=${fullUrl} />
                <div class="card-body">
                <h3 class="card-title loc-title">${locationName}</h3>
                <p class="card-text loc-text">${locAddress} , ${locCountry}</p>
                
              </div>`;
              } else {
                newDivElement.innerHTML += `<div><img class="img-fluid error-pic" src="${errorImg}"></div>`;
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
            setTimeout(() => {
              marker.openPopup();
            }, 2000);
          });
          queryResultsElement.appendChild(resultElement);
        }
      });
  }
  init();
  //weather input
  let weatherData = await weather(1.29, 103.85);
  // console.log(weatherData);
  const temp = Math.round(weatherData.main.temp);
  const minTemp = Math.round(weatherData.main.temp_min);
  const maxTemp = Math.round(weatherData.main.temp_max);
  const weatherDescription = weatherData.weather[0].description;

  const icon = weatherData.weather[0].icon;
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  // console.log(temp, weatherDescription, icon, imageURL);
  document.querySelector("#weather-tab").addEventListener("click", function () {
    let dateMonth = getTime();
    let weatherContainer = document.querySelector("#weather-tab-pane");
    weatherContainer.innerHTML = "";
    weatherContainer.innerHTML += `
    <div class="card weather-div">
    <img src=${imageURL} class="weather-icon" alt="icon.png">
    <h1 class="weather-title"> ${temp}°C</h1>
    <div class="card-body">
      <h4 class="card-title weather-date">${dateMonth}</h4>
      <p class="card-text weather-text">${weatherDescription[0].toUpperCase()}${weatherDescription.slice(
      1
    )}</p>
      <p class="card-text weather-text">${minTemp}°C
      <i class="fa-solid fa-temperature-arrow-down fa-2x"></i> 
      ${maxTemp}°C
      <i class="fa-solid fa-temperature-arrow-up fa-2x"></i></p>
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
