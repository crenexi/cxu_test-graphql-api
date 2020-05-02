import contentful from 'contentful';

interface FetchEntriesOpts {
  space: string;
  accessToken: string;
  query?: string;
}

const fetchEntries = async (opts: FetchEntriesOpts) => {
  const { space, accessToken, query } = opts;

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

export default contentfulService;
