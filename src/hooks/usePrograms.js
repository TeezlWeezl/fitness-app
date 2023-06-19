import { useQuery, gql } from "@apollo/client";

const CORE_PROGRAM_FIELDS = gql`
  fragment CoreProgramFields on Program {
    id
    name
    color
    isActive
  }
`;

const GET_PROGRAMS = gql`
  ${CORE_PROGRAM_FIELDS}
  query {
    programs {
      ...CoreProgramFields
    }
  }
`;

const GET_PROGRAM = gql`
  ${CORE_PROGRAM_FIELDS}
  query ProgramByID($id: ID!, $first: Int!, $skip: Int!) {
    program(where: { id: $id }) {
      ...CoreProgramFields
      description
      focus
      difficulty
      durationWeeks
      durationDays
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

const GET_ACTIVE_PROGRAMS = gql`
  ${CORE_PROGRAM_FIELDS}
  query ActivePrograms {
    programs(where: { isActive: true }) {
      ...CoreProgramFields
      programWorkoutSchedule(where: { completed: false }, first: 1) {
        dayDue
        workout {
          duration
          category
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

export const useActivePrograms = () => {
  const { error, data, loading } = useQuery(GET_ACTIVE_PROGRAMS);

  return {
    error,
    data,
    loading,
  };
};
