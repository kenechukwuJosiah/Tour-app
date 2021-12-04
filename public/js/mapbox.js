/* eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2VuZWNodWt3dSIsImEiOiJja3R1cHE1M24yMmt3MzBtcHF1bXl0OHFqIn0.3jtU5G_t8EPvU8Tu6mQiCw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kenechukwu/cku32q3pf09if18o7pb5odvyu',
    scrollZoom: false,
    // center: [7.085486, 6.2211308],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create Marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      right: 100,
      left: 100,
      bottom: 200,
    },
  });
};
