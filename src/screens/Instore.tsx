import React, { Suspense, useReducer } from "react";
import type { FC } from "react";

import { ThemeProvider } from "@vtex/admin-ui";

import { GraphQLProvider } from "./components/RelayEnvironmentProvider";
import { StoresList } from "./components/StoresList";

const App = () => {
  const [flag, toggle] = useReducer((value) => !value, true);

  return (
    <>
      <button type="button" onClick={toggle}>
        {flag ? "Hide" : "Show"}
      </button>
      {flag && (
        <Suspense fallback={null}>
          <StoresList where={{ category: { eq: "STREET" } }} />
        </Suspense>
      )}
    </>
  );
};

export const InstorePage: FC = () => {
  return (
    <GraphQLProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GraphQLProvider>
  );
};
