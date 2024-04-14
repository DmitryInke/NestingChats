import { SnackMessage } from "../interfaces/snack-message.interface";

const UNKNOWN_ERROR_MESSAGE =
  "An unknown error has occured. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

const CHAT_NOT_EXIST_ERROR_MESSAGE = "Chat is not exist";

const CHAT_NOT_EXIST_SNACK_MESSAGE: SnackMessage = {
  message: CHAT_NOT_EXIST_ERROR_MESSAGE,
  type: "error",
};

export {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
  CHAT_NOT_EXIST_SNACK_MESSAGE,
};
