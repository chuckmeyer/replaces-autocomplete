import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import algoliasearch from 'algoliasearch/lite';
import { ProductItem } from './components/ProductItem';
import '@algolia/autocomplete-theme-classic';

const appId = 'latency';
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const searchClient = algoliasearch(appId, apiKey);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'multi-column-layout-example',
  limit: 3,
});

autocomplete({
	debug: true,
  container: '#autocomplete',
  placeholder: 'Search for address',
	openOnFocus: true,
  plugins: [recentSearchesPlugin],
  getSources({ query }) {
    return [
			{
				sourceId: 'products',
				getItems() {
					return getAlgoliaResults({
						searchClient,
						queries: [
							{
								indexName: 'autocomplete_demo_products',
								query,
								params: {
									hitsPerPage: 4,
								},
							},
						],
					});
				},
				templates: {
					item({ html, item, components }) {
						return ProductItem({ html, hit: item, components });
					},
				},
			},
		];
  },
	render({ elements, render, html }, root) {
		const { recentSearchesPlugin, products } = elements;

		render(
			html`<div className="aa-PanelLayout aa-Panel--scrollable">
				<div className="aa-PanelSections">
					<div className="aa-PanelSection--left">
						${recentSearchesPlugin}
					</div>
					<div className="aa-PanelSection--right">
						${products}
					</div>
				</div>
			</div>`,
			root
		);
	},
});

