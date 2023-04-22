import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Dashboard } from "./Dashboard/";

const root = createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  </React.StrictMode>
);
