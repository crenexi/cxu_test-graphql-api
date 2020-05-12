# GraphQL Overview

## Folder Structure

The overall setup looks as follows:

```
/graphql
#### /entities
######## _BaseEntity.ts
######## ShipIdentity.ts
#### /modules
#### /helpers
```

Each GraphQL module has a folder structure as follows:

```
/ship-model
#### /types
######## /args          <== ex. { ShipModelsArgs }
######## /inputs        <== ex. { CreateShipModelInput }
######## /results       <== ex. { ShipModelResult }
#### /constants         <== ex. { messages }
#### /providers         <== ex. { ShipModelProvider }
#### /resolvers         <== ex. { ShipModelResolver }
#### ShipModelModule.ts
```

### What's a 'result'?

**Result** is a pattern for returning a union to GraphQL, rather than an entity. This enables custom error responses rather than throwing. For example:

Below, we define a type `IsSuspended`. We then create a union (with a method provided by TypeGraphQL) to return to GraphQL.

```javascript
// UserResult.ts

@ObjectType()
class IsSuspended {
  @Field()
  suspensionReason: string;
}

const UserResult = createUnionType({
  name: 'UserResult',
  types: () => [User, IsSuspended],
  resolveType: (value) => {
    if ('suspensionReason' in value) return IsSuspended;
    return User;
  },
});
```

A resolver using the `UserResult` type looks like this:

```javascript
// UserResolver.ts

@Query(() => UserResult)
user(@Arg('id') id: string): Promise<typeof UserResult> {
  return this.userProvider.getUser(id);
}
```

And our GraphQL query will utilize the spread syntax on the union to return either the `User` properties or `IsSuspended` properties.