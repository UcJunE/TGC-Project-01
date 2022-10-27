const API_BASE_URL = "https://api.foursquare.com/v3/places/";
const API_KEY = "fsq3bzBRnEE5HLqGM3bDBptK7/LlEConGGlgT0reewUQ/Ok=";

const headers = {
  Accept: "application/json",

  Authorization: API_KEY,
};

let parkMarker = L.icon({
  iconUrl: `images/nature.png`,
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

let foodMarker = L.icon({
  iconUrl: `images/restaurant.png`,
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
      category: category,
      limit: 50,
      v: "20210903",
    },
  });
  return response.data;
}

async function getPic(fsq_id) {
  let response = await axios.get(API_BASE_URL + `${fsq_id}/photos`, {
    headers: headers,
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
      console.log(radioBtns[i].value);
      rdbtn = radioBtns[i].value;
      break;
    }
  }
  return rdbtn;
}

let triggerBtn = document
  .querySelector("#exploreBtn")
  .addEventListener("click", async function () {
    let markerClusterLayer = L.markerClusterGroup();
    markerClusterLayer.addTo(map);
    let checkedCategory = checkRadioBtn();
    document.querySelector("#results").innerHTML = "";
    // resultOfSearchLayer.clearLayers();
    markerClusterLayer.clearLayers();

    let boundaries = map.getBounds();
    let center = boundaries.getCenter();
    let latLng = center.lat + "," + center.lng;
    let selectedIcon = locationMarker;
    console.log(checkedCategory);
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
      50000,
      checkedCategory
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
