import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Dashboard } from "./Dashboard/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { ProgramBrowser } from "./ProgramBrowser";
import { UserProfile } from "./UserProfile";
import { Program } from "./Program";
import { Workout } from "./Workout";
import { Exercises } from "./Exercises";

const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgw946601iky01uig6lia0tz/master",
  cache: new InMemoryCache({
    typePolicies: {
      Program: {
        fields: {
          programWorkoutSchedule: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
  
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }, 
        }
      }
    }
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "programs",
    element: <ProgramBrowser />,
  },
  {
    path: "programs/:programId",
    element: <Program />,
  },
  {
    path: "programs/:programId/:workoutId",
    element: <Workout />,
  },
  {
    path: "programs/:programId/:workoutId/exercise",
    element: <Exercises />
  },
  {
    path: "profile",
    element: <UserProfile />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
