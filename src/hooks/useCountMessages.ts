import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { useNavigate } from "react-router-dom";
import {
  CHAT_NOT_EXIST_SNACK_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
} from "../constants/errors";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();
  const navigate = useNavigate();
  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      navigate("/");
      return;
    }
    try {
      const body = await res.json();
      const { messages } = body;
      setMessagesCount(messages);
    } catch (error) {
      snackVar(CHAT_NOT_EXIST_SNACK_MESSAGE);
      navigate("/");
    }
  }, [chatId, navigate]);

  return { messagesCount, countMessages };
};

export { useCountMessages };
