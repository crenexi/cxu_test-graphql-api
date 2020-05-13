import path from 'path';
import { emitSchemaDefinitionFile } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

type EmitSchemaDefinition = (schema: GraphQLSchema) => Promise<void>;

const emitSchemaSnap: EmitSchemaDefinition = async (schema) => {
  const outPathEnd = '__snapshots__/schema/schema.gql';
  const outPath = path.resolve(__dirname, '../../', outPathEnd);

  return emitSchemaDefinitionFile(outPath, schema, {
    commentDescriptions: false,
  });
};

export default emitSchemaSnap;
