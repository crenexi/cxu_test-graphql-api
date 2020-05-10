import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class IsDeleted {
  @Field()
  message: string;
};

export union ShipModelResult =

import { createUnionType } from "type-graphql";

const SearchResultUnion = createUnionType({
  name: "SearchResult", // the name of the GraphQL union
  types: () => [Movie, Actor] as const, // function that returns tuple of object types classes
});
