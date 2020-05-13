import { GraphQLModule } from '@graphql-modules/core';
import { buildSchemaSync } from 'type-graphql';
import { AuthModule } from '@modules/auth';
import { UserProvider } from './providers';
import { UserResolver } from './resolvers';

const resolvers = [UserResolver];

const UserModule = new GraphQLModule({
  name: 'User',
  imports: [AuthModule],
  providers: [
    UserProvider,
    ...resolvers,
  ],
  extraSchemas: [
    buildSchemaSync({
      resolvers,
      container: ({ context }) => context.injector,
    }),
  ],
});

export default UserModule;
