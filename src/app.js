import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createReplacesMapboxPlugin } from './plugins/autocomplete-plugin-replaces';
import '@algolia/autocomplete-theme-classic';

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'replaces',
  limit: 3,
});

const replacesPlugin = createReplacesMapboxPlugin({
  proximity: 'ip',
  access_token: 'pk.eyJ1IjoiY2h1Y2ttZXllciIsImEiOiJja3lkZ3hybHcwNW1qMm9xaGNxa3E1eDMwIn0._XpQJ45rdsyPQoWRCRparg',
});

autocomplete({
  debug: true,
	container: '#autocomplete',
  placeholder: 'Search for address',
  openOnFocus: true,
  plugins: [recentSearchesPlugin, replacesPlugin],
});

