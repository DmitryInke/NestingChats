import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { useGetMe } from "../../hooks/useGetMe";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const { data: selfUserId } = useGetMe();
  const location = useLocation();

  useMessageCreated({ chatId });

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location.pathname, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages &&
          [...messages.messages]
            .sort(
              (messageA, messageB) =>
                new Date(messageA.createdAt).getTime() -
                new Date(messageB.createdAt).getTime()
            )
            .map((message) => {
              const isSelfMessage = message.userId !== selfUserId?.me._id;
              return (
                <Grid
                  container
                  alignItems="flex-end" // Align items to the bottom
                  marginBottom="1rem"
                  justifyContent={isSelfMessage ? "flex-end" : "flex-start"}
                >
                  <Grid item>
                    <Avatar
                      src=""
                      sx={{ width: 52, height: 52, marginRight: "1rem" }}
                    />{" "}
                    {/* Adjust marginRight for space */}
                  </Grid>
                  <Grid item>
                    <Stack
                      direction={isSelfMessage ? "row-reverse" : "row"}
                      spacing={1}
                    >
                      <Paper
                        sx={{ width: "fit-content", padding: "0.5rem" }}
                        elevation={4}
                      >
                        {" "}
                        {/* Add padding and shadow for aesthetic */}
                        <Typography sx={{ padding: "0.4rem" }}>
                          {message.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ display: "block", textAlign: "right" }}
                        >
                          {" "}
                          {/* Use block display and right align for the timestamp */}
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              );
            })}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
