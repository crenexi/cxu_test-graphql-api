import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class WarnNotFound {
  @Field()
  notFoundNotice: string;
}

@ObjectType()
export class WarnIsArchived {
  @Field()
  archivalNotice: string;
}

@ObjectType()
export class WarnIsSuspended {
  @Field()
  suspensionNotice: string;
}
