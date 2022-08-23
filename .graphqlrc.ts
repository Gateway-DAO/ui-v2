import { IGraphQLConfig } from 'graphql-config';

require('dotenv').config();

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
