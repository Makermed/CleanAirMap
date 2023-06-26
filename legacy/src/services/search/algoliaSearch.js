const algoliasearch = require('algoliasearch');

const client = algoliasearch('9X5Q719R4O', 'ef8ba2eda91bbf431e427e782c7ae4aa');
const searchIndex = client.initIndex('dev_newsraven');

export default searchIndex;