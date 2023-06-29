import { gql } from '@apollo/client';

export const CORE_PROGRAM_FIELDS = gql`
  fragment CoreProgramFields on Program {
    id
    name
    color
    isActive
  }
`;