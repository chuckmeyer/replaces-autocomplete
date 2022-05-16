import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import '@algolia/autocomplete-theme-classic';

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'multi-column-layout-example',
  limit: 3,
});

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

autocomplete({
  debug: true,
  onStateChange({ state }) {
  	if (state.completion !== null) {
			console.log(`Item selected: ${state.completion}`);
			console.log(hit);
		}
  },
	container: '#autocomplete',
  placeholder: 'Search for address',
  openOnFocus: true,
  plugins: [recentSearchesPlugin],
  getSources({ query }) {
    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiY2h1Y2ttZXllciIsImEiOiJja3lkZ3hybHcwNW1qMm9xaGNxa3E1eDMwIn0._XpQJ45rdsyPQoWRCRparg`
    )
    .then((response) => response.json())
    .then(({ features }) => {
      return [
        {
          sourceId: 'features',
          templates: {
            item({ html, item, components }) {
              return html`
								<a
									href="https://www.google.com/maps/search/?api=1&query=${item.center[1]}%2C${item.center[0]}"
									target="_blank"
									rel="noreferrer noopener"
									class="${cx('aa-ItemLink', item.id)}"
								>
      						<div class="aa-ItemContent">
        						<div class="aa-ItemContentBody">
            					<div class="aa-ItemContentTitleWrapper">
              					<div class="aa-ItemContentTitle">
													${item.place_name}
              					</div>
              			  </div>
              			</div>
              		</div>
								</a>
							`;
            },
          },
          getItems() {
            return features;
          },
//          getItemUrl({ item }) {
//            return `https://www.google.com/maps/search/?api=1&query=${item.center[1]}%2C${item.center[0]}`;
//          },
          getItemInputValue({ item }) {
            return item.place_name;
          },
				},
      ];
    });
  },
  render({ elements, render, html }, root) {
    const { recentSearchesPlugin, features} = elements;

    render(
      html`<div className="aa-PanelLayout aa-Panel--scrollable">
        ${recentSearchesPlugin}
        ${features}
      </div>`,
      root
    );
  },
});

