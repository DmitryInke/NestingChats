import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const CreateUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(CreateUserDocument);
};

export { useCreateUser };
