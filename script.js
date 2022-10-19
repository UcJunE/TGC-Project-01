window.addEventListener("DOMContentLoaded", async function () {
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

  let resultOfSearch = L.layerGroup();
  resultOfSearch.addTo(map);

  let generalData = await generalSearch(1.29, 103.85, "garden");
  console.log(generalData.results);
  for (index of generalData.results) {
    let lat = index.geocodes.main.latitude;
    let lng = index.geocodes.main.longitude;
    let locationName = index.name;

    let marker = L.marker([lat, lng]).addTo(resultOfSearch);

    marker.bindPopup(function () {
      let newDivElement = document.createElement("div");
      newDivElement.innerHTML = `<h1>${locationName}</h1>`;

      async function retrievePicture() {
        let pic = await getPic(index.fsq_id);
        let firstPic = index.categories[0].icon;
        let url = firstPic.prefix + "original" + firstPic.suffix;
        newDivElement += `<img src="${url}"/>`;
        console.log(url);
      }
      retrievePicture();
      return newDivElement;
    });
  }
});
