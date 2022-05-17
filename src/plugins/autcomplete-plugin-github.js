const gitHubReposPlugin = {
  getSources() {
    return [
      {
        sourceId: 'githubPlugin',
        getItems({ query }) {
          return [
            { name: 'algolia/autocomplete', stars: 1237 },
            { name: 'algolia/algoliasearch-client-javascript', stars: 884 },
            { name: 'algolia/algoliasearch-client-php', stars: 554 },
          ].filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase())
          );
        },
        getItemUrl({ item }) {
          return `https://github.com/${item.name}`;
        },
        templates: {
          item({ item }) {
            const stars = new Intl.NumberFormat('en-US').format(item.stars);

            return `${item.name} (${stars} stars)`;
          },
          noResults() {
            return 'No results.';
          },
        },
      },
    ];
  },
};

autocomplete({
  // ...
  plugins: [gitHubReposPlugin],
});
