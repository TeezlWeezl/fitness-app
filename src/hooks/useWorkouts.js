import { gql, useQuery } from "@apollo/client";

const GET_WORKOUT = gql`
  query WorkoutByID($programId: ID!, $workoutId: ID!) {
    program(where: { id: $programId }) {
      programWorkoutSchedule(where: { id: $workoutId }) {
        completed
        dayDue
        workout {
          name
          duration
          category
        }
      }
    }
  }
`;

export const useWorkout = (programId, workoutId) => {
  return useQuery(GET_WORKOUT, {
    variables: { programId, workoutId },
    fetchPolicy: 'no-cache'
  });
};
