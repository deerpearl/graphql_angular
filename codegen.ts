
/*
//following used to be .yml file
schema: './packages/server/src/graphql/schema.graphql'
generates:
 ./packages/graphql-types/src/resolvers-types.ts:
 plugins:
 - typescript
 - typescript-resolvers
 */

 //https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga
 import type { CodegenConfig } from '@graphql-codegen/cli';
 
 const config: CodegenConfig = {
   schema: './packages/server/src/graphql/schema.graphql',
   generates: {
     './packages/graphql-types/src/resolvers-types.ts': {
       config: {
         useIndexSignature: true,
       },
       plugins: ['typescript', 'typescript-resolvers'],
     },
   },
 };
 export default config;