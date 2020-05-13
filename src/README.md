# Application Overview

## Available aliases

Note: to add an alias, you must add to tsconfig.json AND package.json.

- **@app** - src/app
- **@graphql** - src/graphql
- **@modules** - src/graphql/modules
- **@config** - src/config
- **@types** - src/types
- **@entities** - src/entities
- **@helpers** - src/helpers
- **@services** - src/services

## Logging Levels

The logger implements custom levels. Levels 0-4 can receive a string or Error (to log the stack if it exists). A second "meta" object can be supplied as needed.

- **Severity 0 - Emergency**
- **Severity 1 - Critical**
- **Severity 2 - Error**
- **Severity 3 - Warning**
- **Severity 4 - Info**
- **Severity 5 - Debug**

```typescript
logger.emergency(throw Error('Thanos snapped the gauntlet'));
logger.critical(throw Error('Infinity stones are missing'));
logger.error(throw Error('Stark and Rogers are incompatible'));
logger.warning('Bruce Banner is under stress'));
logger.info('Avengers are assembling');
logger.debug('Assembled avengers', { avengers })
```
