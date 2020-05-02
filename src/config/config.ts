const serverConfig = {
  dbName: 'webb-universe-api_local',
  contentfulSpaces: {
    webbUniverse: 'z35a115s1oba',
  },
  env: () => process.env.NODE_ENV || 'development',
  secret: () => process.env.SESSION_SECRET,
  dbUri: () => process.env.DB_URI || '',
  baseUrl: () => process.env.BASE_URL || 'http://localhost:3000',
};

export default serverConfig;
