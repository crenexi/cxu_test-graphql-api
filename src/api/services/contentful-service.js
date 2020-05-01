const contentful = require('contentful');

const fetchEntries = async ({ space, accessToken, query }) => {
  // Ensure we have the space and token
  if (!space || !accessToken) {
    throw new Error('Must supply space and accessToken to Contentful');
  }

  // Create the contenful client
  const client = contentful.createClient({ space, accessToken });

  // Get the desired entries
  try {
    const res = await client.getEntries(query);
    return res.items;
  } catch (err) {
    throw new Error(`Contentful request error: ${err.message}`);
  }
};

const contentfulService = () => ({
  fetchEntries,
});

module.exports = contentfulService;
