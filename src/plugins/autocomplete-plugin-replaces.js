import qs from 'qs';
const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

export function createReplacesMapboxPlugin(options) {
  return {
    onStateChange({ state }) {
      if (state.completion !== null) {
        console.log(`Item selected: ${state.completion}`);
      }
    },
    getSources({ query }) {
      // Options can come from: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding
			console.log(query);
			if (!("access_token" in options)) {
				console.log('access_token required for MapBox API');
				return [
					{
            sourceId: 'features',
            getItems() {
              return [];
            },
            templates: {
              noResults() {
                return 'Mapbox access_token not defined.';
              },
            },
					},
				];
			} else {
        if (!("types" in options)) {
          options.types = 'place,postcode,address,poi';
        }
        const queryParameters = qs.stringify({ ...options });
        const endpoint = [`${baseUrl}/${query}.json`, queryParameters].join('?');
        return fetch(endpoint)
          .then((response) => response.json())
          .then(({ features }) => {
            return [
              {
                sourceId: 'features',
                getItems() {
                  return features;
                },
                getItemInputValue({ item }) {
                  console.log(item);
                  return item.place_name;
                },
      //          getItemUrl({ item }) {
      //            return `https://www.google.com/maps/search/?api=1&query=${item.center[1]}%2C${item.center[0]}`;
      //          },
                templates: {
                  item({ html, item }) {
                    return html`
                      ${item.place_name}
      							`;
                  },
                  noResults() {
                    return 'No results.';
                  },
                },
              },
            ];
          });
      }
    },
	};
}

