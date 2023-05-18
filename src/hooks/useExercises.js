import { useQuery, gql } from "@apollo/client";

const GET_EXERCISES = gql`
  query Exercises($programId: ID!, $workoutId: ID!){
    program(where: {id: $programId}) {
      id
      color
      programWorkoutSchedule(where: {id: $workoutId}) {
        id
        workout {
          exercises {
            ... on ExerciseWithDuration {
              id
              duration
              exercise {
                id
                name
              }
            }
            ... on ExerciseWithReps {
              id
              reps
              exercise {
                id
                name
              }
            }
          }
        }
      }
    }
}
`;

export const useExercises = (programId, workoutId) => {
  const { error, data, loading } = useQuery(GET_EXERCISES, {
    variables: {programId, workoutId}
  });

  return {
    error,
    data,
    loading,
  };
};
