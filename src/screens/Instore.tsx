import React, { Suspense, useEffect, useReducer } from "react";
import type { FC } from "react";

import { ThemeProvider } from "@vtex/admin-ui";

import {
  GraphQLProvider,
  // afterFetch,
} from "./components/RelayEnvironmentProvider";
import { StoresList } from "./components/StoresList";

const App = () => {
  const [flag, toggle] = useReducer((value) => !value, true);

  // useEffect(() => {
  //   afterFetch.push(() => {
  //     toggle();
  //   });

  //   return () => {
  //     afterFetch.length = 0;
  //   };
  // }, []);

  return (
    <>
      <button type="button" onClick={toggle}>
        {flag ? "Hide" : "Show"}
      </button>
      {flag ? (
        <>
          <Suspense fallback={null}>
            <StoresList where={{ category: { eq: "STREET" } }} />
          </Suspense>
          <Suspense fallback={null}>
            <StoresList where={{ category: { eq: "KIOSK" } }} />
          </Suspense>
          <Suspense fallback={null}>
            <StoresList where={{ category: { eq: "SHOPPING" } }} />
          </Suspense>
        </>
      ) : (
        <>
          {Array.from({ length: 1_000 }, (_, i) => i).map((i) => (
            <span key={i}>{i}</span>
          ))}
        </>
      )}
    </>
  );
};

export const InstorePage: FC = () => {
  return (
    <ThemeProvider>
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </ThemeProvider>
  );
};
