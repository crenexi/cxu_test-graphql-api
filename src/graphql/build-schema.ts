

import {
  FirstResolver,
  SecondResolver,
} from "../app/src/resolvers";

const schema = await buildSchema({
  resolvers: [FirstResolver, SecondResolver],
});
