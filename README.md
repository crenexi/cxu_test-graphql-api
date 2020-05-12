# Webb Universe API
[api.webbuniverse.com](https://api.webbuniverse.com)

This project is within the context of the WU project ([repository here](https://github.com/crenexi/webb-universe)). WU is a personal side project to serve a gaming society. The API is a GraphQL-powered, Apollo-based endpoint.

## Start

### Method 1: Script

Simply put:

```
npm run start
```

*This runs ./bin/start.sh and checks if both Postgres and Redis are running before proceeding.*

### Method 2: Standard

Alternatively, ensure Postgres and Redis are running, then `npm start`. Note environment variables in `.env.example` are required to start.

## Roadmap

### Basic Setup

- [ ] **HTTP Server** - [www.ts](src/bin/www.ts) - serves Express app
- [ ] **TypeORM Connection** - [init-connection.ts](src/app/connect.js) - connects to Postgres
- [ ] **Session Middleware** - [init-session.ts](src/app/bootstrap/init-session.ts) - session, Redis store, and rate limiter
- [ ] **Access Logger** [access-logger.ts](src/app/middlewares/access-logger.ts) - Morgan-based access logger with rotations
- [ ] **Logger** - [logger.ts](src/services/logger/logger.ts) - Winston-based logger with custom levels
- [ ] **TypeORM Config** - [orm.config.ts](src/config/orm.config.ts) - TypeORM configuration
- [ ] **PM2 Config** - [pm2.config.ts](src/config/pm2.config.ts) - PM2 configuration
- [ ] **BaseEntity** - [BaseEntity](src/entities/_BaseEntity.ts) - base entity to extend
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

### Note-to-self about releasing

1. Ensure git-flow is initialized
1. **npm run release:start**
1. QA, test, lint, wrap-up, etc.
1. Update/commit changelog
1. **npm run release:finish**

## Authors & Contributing

* **James Walrath** - [crenexi](https://github.com/crenexi)

*This is a side project. No contributors are needed at this time. If interested in the future of this project, contact me at james@crenexi.com or visit [webbuniverse.com](https://webbuniverse.com) for more info.*

## License

This project is licensed under the MIT License - [LICENSE](LICENSE)

## Acknowledgments

* **GraphQL & TypeScript ecosystem** - [Apollo](https://www.apollographql.com/), [TypeGraphQL](https://typegraphql.com), [GraphQL-Modules](https://graphql-modules.com/), and [TypeORM](https://typeorm.io) are the veins of this project. Thanks to all related contributors.
* **Ben Awad** - [YouTuber](https://www.youtube.com/user/99baddawg) who's tutorials on GraphQL, TypeGraphQL, React and other topics helped jump-start the architecture of this project.
* **Philz Coffee** - the most under-valued contributor
