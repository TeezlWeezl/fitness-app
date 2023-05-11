import { useQuery, gql } from "@apollo/client";

const GET_PROGRAMS = gql`
  query {
    programs {
      id
      name
      color
    }
  }
`;

const GET_PROGRAM = gql`
  query ProgramByID($id: ID!, $first: Int!, $skip: Int!) {
    program(where: { id: $id }) {
      name
      description
      focus
      difficulty
      durationWeeks
      durationDays
      color
      programWorkoutSchedule(orderBy: dayDue_ASC, first: $first, skip: $skip) {
        id
        dayDue
        completed
        workout {
          id
          name
          category
          workoutColor
          duration
        }
      }
    }
  }
`;

export const usePrograms = () => {
  const { error, data, loading } = useQuery(GET_PROGRAMS);

  return {
    error,
    data,
    loading,
  };
};

export const useProgram = ({ id, first, skip, onCompleted }) => {
  const { error, data, loading, fetchMore } = useQuery(GET_PROGRAM, {
    variables: { id, first, skip },
    onCompleted,
  });

  return {
    error,
    data,
    loading,
    fetchMore,
  };
};
