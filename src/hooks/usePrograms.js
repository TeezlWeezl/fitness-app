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
  query ProgramByID($id: ID!) {
    program(where: { id: $id }) {
      id
      name
      description
      focus
      difficulty
      duration
      color
      workouts {
        id
        name
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

export const useProgram = (id) => {
  const { error, data, loading } = useQuery(GET_PROGRAM, { variables: { id } });

  return {
    error,
    data,
    loading,
  };
};
