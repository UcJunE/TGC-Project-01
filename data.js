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
