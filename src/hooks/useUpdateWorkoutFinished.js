import { gql, useMutation } from "@apollo/client";

const UPDATE_WORKOUT_COMPLETED = gql`
  mutation UpdateWorkoutCompleted(
    $programId: ID!
    $workoutId: ID!
    $completed: Boolean!
  ) {
    updateProgram(
      data: {
        programWorkoutSchedule: {
          update: { where: { id: $workoutId }, data: { completed: $completed } }
        }
      }
      where: { id: $programId }
    ) {
      programWorkoutSchedule(where: { id: $workoutId }) {
        completed
      }
    }
  }
`;

const PUBLISH_WORKOUT_COMPLETED = gql`
  mutation PublishWorkoutCompleted(
    $programId: ID!
  ) {
    publishProgram(where: {id: $programId}) {
      id
  }
  }
`;

export const useUpdateWorkoutCompleted = () => {
  const [updateWorkoutCompleted, { dataUpdate, loadingUpdate, errorUpdate }] =
    useMutation(UPDATE_WORKOUT_COMPLETED);

  const [
    publishWorkoutCompleted,
    { data: dataPublish, loading: loadingPublish, error: errorPublish },
  ] = useMutation(PUBLISH_WORKOUT_COMPLETED);

  const updateAndPublishWorkoutCompleted = async ({
    programId,
    workoutId,
    completed,
  }) => {
    const result = await updateWorkoutCompleted({variables: {programId, workoutId, completed}})
    if (result.data.updateProgram) await publishWorkoutCompleted({variables: {programId}})
  };

  return {updateAndPublishWorkoutCompleted, loading: loadingPublish || loadingUpdate, error: {errorUpdate, errorPublish}, data: {dataUpdate, dataPublish}}
};
