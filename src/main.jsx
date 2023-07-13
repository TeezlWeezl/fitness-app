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

function mergeArrays(array1, array2) {
  const merged = [...array1];

  array2.forEach((item2) => {
    const index = merged.findIndex(
      (item1) => item1.__ref.split(':')[1] === item2.__ref.split(':')[1]
    );

    if (index !== -1) {
      // Replace the existing item in the merged array
      merged[index] = item2;
    } else {
      // Add the item from array2 to the merged array
      merged.push(item2);
    }
  });

  return merged;
}

const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgw946601iky01uig6lia0tz/master",
  cache: new InMemoryCache(
    {
    typePolicies: {
      Program: {
        fields: {
          programWorkoutSchedule: {
            keyArgs: (args) => {
              const newArguments =  Object.keys(args).filter(
                (key) => key !== "first" && key !== "skip"
              );

              console.log("Args: ", args, typeof args ,"New Args: ", newArguments, typeof newArguments);

              return newArguments
            },
  
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              console.log("Existing: ", existing);
              console.log("Incoming: ", incoming);

              return mergeArrays(existing, incoming);
            },
            // read(pws, args) {
            //   const programWorkoutScheduleId = args?.args?.where?.id
            //   console.log(programWorkoutScheduleId);
            //   if (programWorkoutScheduleId) {
            //     const test = pws.filter((pw) => {
            //       console.log(pw);
            //       return pw.__ref.includes(programWorkoutScheduleId)
            //     })
            //     console.log(test);
            //     return test
            //   }
            //   return pws
            // }
          }, 
        }
      }
    }
  }
  ),
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
