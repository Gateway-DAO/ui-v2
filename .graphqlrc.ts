import { IGraphQLConfig } from 'graphql-config';
import fs from "fs";

require('dotenv').config(process.env.NODE_ENV !== 'production' && fs.existsSync('./.env.local') ? { path: './.env.local' } : undefined);

const generateConfig = {
  plugins: [
    'typescript',
    'typescript-operations',
    'typescript-graphql-request',
    'typescript-resolvers',
  ],
  config: {
    scalars: {
      _text: 'string',
    },
    defaultMapper: 'Partial<{T}>',
    avoidOptionals: {
      field: true,
      inputValue: false,
      object: true,
      defaultValue: true,
    },
    fetcher: 'graphql-request',
    // maybeValue: 'T',
    skipTypename: true
  },
};

const config: IGraphQLConfig = {
  schema: '',
  extensions: {
    codegen: {
      generates: {
        // './types/cyberconnect.generated.ts': {
        //  ...generateConfig,
        //  schema: process.env.NEXT_PUBLIC_CYBERCONNECT_ENDPOINT as string,
        //  documents: ['./services/cyberconnect/**/*.{graphql,gql}'],
        //},
        './types/hasura.generated.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.HASURA_ENDPOINT}`]: {
              headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
              },
            },
          },
          documents: ['./services/hasura/**/*.{graphql,gql}'],
        }
      },
    },
  },
}

export default config;
