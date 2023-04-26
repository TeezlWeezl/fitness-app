import { useQuery, gql } from "@apollo/client";

const GET_PROGRAMS = gql`
  query {
    programs {
      id
      name
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