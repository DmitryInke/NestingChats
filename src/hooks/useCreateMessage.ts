import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { updateMessages } from "../cache/messages";

const CreateMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(CreateMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
      }
    },
  });
};

export { useCreateMessage };
