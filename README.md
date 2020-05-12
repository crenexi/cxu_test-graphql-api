# Webb Universe API
[api.webbuniverse.com](https://api.webbuniverse.com)

This project is within the context of the WU project ([repository here](https://github.com/crenexi/webb-universe)). WU is a personal side project to serve a gaming society. The API is a GraphQL-powered, Apollo-based endpoint.

## Basic Roadmap

### Setup

- [ ] **HTTP Server** - [www.ts](src/bin/www.ts) - serves Express app
- [ ] **TypeORM Connection** - [init-connection.ts](src/init-connection.ts) - connects to Postgres
- [ ] **Session Middleware** - [init-session.ts](src/init-session.ts) - session, Redis store, and rate limiter
- [ ] **Access Logger** [access-logger.ts](src/middlewares/access-logger.ts) - Morgan-based access logger with rotations
- [ ] **Logger** - [logger.ts](src/services/logger.ts) - Winston-based logger with custom levels
- [ ] **TypeORM Config** - [orm.config.ts](src/config) - TypeORM configuration
- [ ] **PM2 Config** - [pm2.config.ts](pm2.config.ts) - PM2 configuration
- [ ] **BaseEntity** - [BaseEntity](src/graphql/entities/_BaseEntity.ts) - base entity to extend
- [ ] **GraphQL AppModule** - [AppModule.ts](src/graphql/AppModule.ts) - root module

### Modules

- [ ] **AuthModule** - **IN PROGRESS** - authentication
- [ ] **UserModule** - **IN PROGRESS** - user management
- [ ] **ProfileModule** - *planned* - user profile
- [ ] **HullModule** - *planned* - globals, holidays, offices, banners
- [ ] **BridgeModule** - *planned* - council, policies, requirements
- [ ] **CrewModule** - *planned* - crew, shoutouts, downlinks, reports
- [ ] **AngeliModule** - *planned* - application repository
- [ ] **HangarModule** - *planned* - ShiRe (Ship Registration), WC yard
- [ ] **EventsModule** - *planned* - meetups, ops, Pri-Fly
- [ ] **DeckModule** - *planned* - broadcasts, agenda, flights
- [ ] **ShipModelModule** - **IN PROGRESS** - ship catalog
- [ ] **MediaModule** - *planned* - media repository
- [ ] **ReisseLibrary** - *planned* - guides, affairs, ARK
- [ ] **HandbookModule** - *planned* - handbook repository
- [ ] **ModModule** - *planned* - for mod station

### What is this?

These modules reflect a plan to build a comprehensive web application to serve a gaming society related to [Star Citizen](https://robertsspaceindustries.com/star-citizen/universe). *Note: this is currently a side project of theory, and the Webb Universe society does not exist at this time. The expectation is to launch the society by 2025.*

## Documentation

- **[Application Overview](src/README.md)** - middlewares, cache, etc.
- **[GraphQL Overview](src/graphql/README.md)** - entities, modules, providers, etc.
- **[TypeORM Usage](src/typeorm/README.md)** - migrations, subscribers, etc.

## Versioning

We use [SemVer](http://semver.org/) for versioning. [View releases here](https://github.com/crenexi/webb-universe-api/releases).

## Authors & Contributing

* **James Walrath** - [crenexi](https://github.com/crenexi)

*This is a side project. No contributors are needed at this time. If interested in the future of this project, contact me at james@crenexi.com or visit [webbuniverse.com](https://webbuniverse.com) for more info.*

## License

This project is licensed under the MIT License - [LICENSE](LICENSE)

## Acknowledgments

* **GraphQL & TypeScript ecosystem** - [Apollo](https://www.apollographql.com/), [TypeGraphQL](https://typegraphql.com), [GraphQL-Modules](https://graphql-modules.com/), and [TypeORM](https://typeorm.io) are the veins of this project. Thanks to all related contributors.
* **Ben Awad** - [YouTuber](https://www.youtube.com/user/99baddawg) who's tutorials on GraphQL, TypeGraphQL, React and other topics helped jump-start the architecture of this project.
* **Philz Coffee** - the most under-valued contributor
