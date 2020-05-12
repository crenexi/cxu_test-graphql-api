/* eslint-disable global-require */

const enabledMigrations: Function[] = [
  require('./1588795003353-HeroRefactoring'),
  require('./1589323200704-RemoveHeroTables'),
  require('./1589324771750-RemoveShipTable'),
];

export default enabledMigrations;
