const API_BASE_URL = "https://api.foursquare.com/v3/places/";
const API_KEY = "fsq3bzBRnEE5HLqGM3bDBptK7/LlEConGGlgT0reewUQ/Ok=";

const headers = {
  Accept: "application/json",

  Authorization: API_KEY,
};
let allMarker = L.icon({
  iconUrl: `images/all.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

let parkMarker = L.icon({
  iconUrl: `images/nature.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});
let scenicMarker = L.icon({
  iconUrl: `images/scenic.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

let gamingMarker = L.icon({
  iconUrl: `images/gaming.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

let locationMarker = L.icon({
  iconUrl: `images/landmark.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

let petMarker = L.icon({
  iconUrl: `images/pet.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

let outdoorMarker = L.icon({
  iconUrl: `images/outdoor.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});
let foodMarker = L.icon({
  iconUrl: `images/restaurant.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});
let barMarker = L.icon({
  iconUrl: `images/bar.png`,
  iconSize: [45, 50],
  iconAnchor: [22, 40],
  popupAnchor: [0, -30],
});

async function generalSearch(ll, search, radius, category = "") {
  let url = API_BASE_URL + "search";
  let response = await axios.get(url, {
    headers: headers,
    params: {
      ll: ll,
      query: search,
      radius: radius,
      categories: category,
      limit: 50,
      v: "20210903",
    },
  });
  return response.data;
}

//next . if user checked the radio button.
//landmark
function checkRadioBtn() {
  let radioBtns = document.querySelectorAll(".radioBtn");
  // console.log(radioBtns);
  let rdbtn = "";
  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      rdbtn = radioBtns[i].value;
      break;
    }
  }
  return rdbtn;
}

let triggerBtn = document
  .querySelector("#exploreBtn")
  .addEventListener("click", async function () {
    markerClusterLayer.clearLayers();
    let checkedCategory = checkRadioBtn();
    document.querySelector("#results").innerHTML = "";

    let query = "";
    let boundaries = map.getBounds();
    let center = boundaries.getCenter();
    let latLng = center.lat + "," + center.lng;
    let selectedIcon = "";

    if (checkedCategory == "16032") {
      selectedIcon = parkMarker;
    } else if (checkedCategory == "16046") {
      selectedIcon = scenicMarker;
    } else if (checkedCategory == "16047") {
      selectedIcon = locationMarker;
    } else if (checkedCategory == "13006") {
      selectedIcon = gamingMarker;
    } else if (checkedCategory == "18000") {
      selectedIcon = outdoorMarker;
    } else if (checkedCategory == "13000") {
      selectedIcon = foodMarker;
    } else if (checkedCategory == "13003") {
      selectedIcon = barMarker;
    } else if (checkedCategory == "13063") {
      query = "pet-cafe";
      selectedIcon = petMarker;
    } else {
      selectedIcon = allMarker;
    }

    let queryResults = await generalSearch(
      latLng,
      query,
      100000,
      checkedCategory
    );

    // document.querySelector("#search-tab-pane").classList.add("active");
    // document.querySelector("#search-tab-pane").classList.add("show");
    // to open search tab pane when user click on search btn on explore tab.
    // document.querySelector("#explore-tab-pane").classList.remove("show");
    // document.querySelector("#explore-tab-pane").classList.remove("active");

    let searchPane = document.querySelector("#search-tab-pane");
    let explorePane = document.querySelector("#explore-tab-pane");
    let weatherPane = document.querySelector("#weather-tab-pane");

    // Tab buttons
    let searchPaneTab = document.querySelector("#search-tab");
    let explorePaneTab = document.querySelector("#explore-tab");
    let weatherPaneTab = document.querySelector("#weather-tab");

    explorePaneTab.classList.remove('active');
    searchPaneTab.classList.add('active');

    searchPane.classList.add("show");
    explorePane.classList.remove("show");
    explorePane.classList.remove("active");
    searchPane.classList.add("active");

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
        }, 3000);
      });
      queryResultsElement.appendChild(resultElement);
    }
  });

// get pic from api endpoint
async function getPic(fsq_id) {
  let response = await axios.get(API_BASE_URL + `${fsq_id}/photos`, {
    headers: headers,
  });

  return response.data;
}

function getTime() {
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = d.getDate();
  let month = d.getMonth();
  let currentMonth = months[month].toUpperCase();

  return `${date} ${currentMonth}`;
}
