mapboxgl.accessToken = mapToken;

if (typeof coordinates !== 'undefined') {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12', // Default style
    center: coordinates,
    zoom: 13,
    projection: 'globe',
  });

  new mapboxgl.Marker({ color: 'red' }).setLngLat(coordinates).addTo(map);

  // Correct style mapping
  const styleMap = {
    outdoors: 'mapbox://styles/mapbox/outdoors-v12',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    streets: 'mapbox://styles/mapbox/streets-v11',
  };

  // Style switcher
  const switchers = document.querySelectorAll('input[name="rtoggle"]');
  switchers.forEach((input) =>
    input.addEventListener('change', (e) => {
      const selected = e.target.value;
      const styleUrl = styleMap[selected];
      if (styleUrl) {
        map.setStyle(styleUrl);
      }
    })
  );
}
