// https://github.com/relay-tools/react-relay-network-modern/tree/v6.0.0#what-if-regeneratorruntime-is-not-defined
import "regenerator-runtime/runtime";
import type { FC } from "react";
import React from "react";
import { RelayEnvironmentProvider } from "relay-hooks";
// import {
//   errorMiddleware,
//   loggerMiddleware,
//   perfMiddleware,
//   RelayNetworkLayer,
//   retryMiddleware,
//   urlMiddleware,
// } from 'react-relay-network-modern'
import EnvironmentIDB from "react-relay-offline/lib/runtime/EnvironmentIDB";
// import { StatusCodes } from 'http-status-codes'
import { useRestore } from "react-relay-offline";
import type { FetchFunction } from "relay-runtime";
import { Network } from "relay-runtime";

// import { name as appName, version as appVersion } from '../../../package.json'

// const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development'

const fetchQuery: FetchFunction = (operation, variables) => {
  return {
    subscribe: (sink: any) => {
      const query = async () => {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: operation.text,
            variables,
          }),
        });

        const data = await response.json();

        if (data.errors) {
          sink.error?.(data);
        } else {
          sink.next?.(data);
        }

        sink.complete?.();
      };

      query();

      // let clo

      // return {
      //   unsubscribe: () => {},
      //   closed: false,
      // }
    },
  } as any;
};

const network = Network.create(fetchQuery);

// const network = new RelayNetworkLayer([
//   urlMiddleware({
//     method: 'POST',
//     url: ({ operation }) => `/graphql?operationName=${operation.name}`,
//     headers: {
//       'ApolloGraphQL-Client-Name': appName,
//       'ApolloGraphQL-Client-Version': IS_DEVELOPMENT_MODE
//         ? `${process.env.GATSBY_USER_HOSTNAME}@${appVersion}`
//         : appVersion,
//     },
//   }),

//   // IS_DEVELOPMENT_MODE ? loggerMiddleware() : null,
//   // IS_DEVELOPMENT_MODE ? errorMiddleware() : null,
//   // IS_DEVELOPMENT_MODE ? perfMiddleware() : null,

//   // retryMiddleware({
//   //   allowMutations: false,
//   //   fetchTimeout: 5 * 1000,
//   //   retryDelays: (attempt) => 2 ** (attempt + 4) * 100,
//   //   beforeRetry: ({ abort, attempt }) => {
//   //     if (attempt > 3) abort()
//   //   },
//   //   statusCodes: [
//   //     StatusCodes.INTERNAL_SERVER_ERROR,
//   //     StatusCodes.SERVICE_UNAVAILABLE,
//   //     StatusCodes.GATEWAY_TIMEOUT,
//   //   ],
//   // }),
// ])

const environment = EnvironmentIDB.create({ network });

environment.setOfflineOptions({
  start: (mutations) => {
    console.warn("NetworkOffline#start", mutations);

    return Promise.resolve(mutations);
  },
  finish: (mutations, error) => {
    console.warn("NetworkOffline#finish", mutations, error);

    return Promise.resolve();
  },
  onExecute: (mutation) => {
    console.warn("NetworkOffline#onExecute", mutation);

    return Promise.resolve(mutation);
  },
  onComplete: (options) => {
    console.warn("NetworkOffline#onComplete", options);

    return Promise.resolve(true);
  },
  onDiscard: (options) => {
    console.warn("NetworkOffline#onDiscard", options);

    return Promise.resolve(true);
  },
  onPublish: (offlineRecord) => {
    console.warn("NetworkOffline#onPublish", offlineRecord);

    return Promise.resolve(offlineRecord);
  },
});

export const GraphQLProvider: FC = ({ children }) => {
  const isRehydrated = useRestore(environment);

  if (!isRehydrated) return null;

  console.log(RelayEnvironmentProvider);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
