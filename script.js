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

  let resultOfSearchLayer = L.markerClusterGroup();
  resultOfSearchLayer.addTo(map);

  let generalData = await generalSearch(1.29, 103.85, "garden");

  for (index of generalData.results) {
    let lat = index.geocodes.main.latitude;
    let lng = index.geocodes.main.longitude;
    let locationName = index.name;
    let eachPic = index.fsq_id;
    console.log(eachPic);

    let marker = L.marker([lat, lng]).addTo(resultOfSearchLayer);

    marker.bindPopup(function () {
      let newDivElement = document.createElement("div");
      newDivElement.classList.add("popup");
      newDivElement.innerHTML += `<h1>${locationName}</h1>`;

      async function retrievePicture() {
        let pic = await getPic(eachPic);
        let url = pic[0].prefix + "original" + pic[0].suffix;
        newDivElement.innerHTML += `<div><img class="img" src="${url}"></div>`;
        console.log(url);
      }
      retrievePicture();
      return newDivElement;
    });
  }
});
