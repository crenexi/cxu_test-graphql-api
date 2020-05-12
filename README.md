# Webb Universe API
[api.webbuniverse.com](https://api.webbuniverse.com)

This project is within the context of the WU project ([repository here](https://github.com/crenexi/webb-universe)). WU is a personal side project to serve a gaming society. The API is a GraphQL-powered, Apollo-based endpoint.

## Basic Roadmap

- [ ] **Setup - HTTP Server** - [www.ts](src/bin/www.ts) - serves Express app
- [ ] **Setup - TypeORM Connection** - [init-connection.ts](src/init-connection.ts) - connects to Postgres
- [ ] **Setup - Session Middleware** - [init-session.ts](src/init-session.ts) - session, Redis store, and rate limiter
- [ ] **Setup - Access Logger** [access-logger.ts](src/middlewares/access-logger.ts) - Morgan-based access logger with rotations
- [ ] **Setup - Logger** - [logger.ts](src/services/logger.ts) - Winston-based logger with custom levels
- [ ] **Setup - TypeORM Config** - [orm.config.ts](src/config) - TypeORM configuration
- [ ] **Setup - PM2 Config** - [pm2.config.ts](pm2.config.ts) - PM2 configuration
- [ ] **Setup ** - []() - T
- [ ] **Setup ** - []() - T

## Documentation

- **[Application Overview](src/README.md)**
- **[TypeORM Usage](src/typeorm/README.md)**

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
