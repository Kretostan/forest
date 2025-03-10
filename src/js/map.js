// Initialize and add the map
let map;

async function initMap() {
  // The location of McDonald
  const position = { lat: 51.89717102050781, lng: 21.614938735961914 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Mcdonald
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at McDonald
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "McDonald",
  });
}

initMap();