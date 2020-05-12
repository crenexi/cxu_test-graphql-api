import path from 'path';
import { emitSchemaDefinitionFile } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

type EmitSchemaDefinition = (schema: GraphQLSchema) => Promise<void>;

const emitSchemaSnap: EmitSchemaDefinition = async (schema) => {
  const outPath = path.resolve(__dirname, '__snapshots__/schema/schema.gql');

  return emitSchemaDefinitionFile(outPath, schema, {
    commentDescriptions: false,
  });
};

export default emitSchemaSnap;
