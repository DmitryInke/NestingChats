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
import { useGetMe } from "../../hooks/useGetMe";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const { data: selfUserId } = useGetMe();
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location.pathname, messagesCount]);

  const handleCreateMessage = async () => {
    if (!message.trim().length) {
      return;
    }
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
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages.length || 0 } })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
          threshold={50}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => {
                const isSelfMessage = message.user._id !== selfUserId?.me._id;
                return (
                  <Grid
                    key={message._id}
                    container
                    wrap="nowrap"
                    spacing={1}
                    alignItems="flex-start"
                    marginBottom="1rem"
                    justifyContent={isSelfMessage ? "flex-end" : "flex-start"}
                  >
                    {!isSelfMessage && (
                      <Grid item>
                        <Avatar src="" sx={{ width: 52, height: 52 }} />
                      </Grid>
                    )}

                    <Grid item xs zeroMinWidth>
                      <Stack
                        direction={isSelfMessage ? "row-reverse" : "row"}
                        spacing={1}
                      >
                        <Paper
                          sx={{
                            display: "inline-flex",
                            flexDirection: "column",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            maxWidth: "100%",
                          }}
                          elevation={4}
                        >
                          <Typography
                            sx={{ wordBreak: "break-word", hyphens: "auto" }}
                          >
                            {message.content}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ alignSelf: "flex-end", mt: "8px" }}
                          >
                            {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                            {new Date(message.createdAt).toLocaleDateString()}
                          </Typography>
                        </Paper>
                      </Stack>
                    </Grid>

                    {isSelfMessage && (
                      <Grid item>
                        <Avatar src="" sx={{ width: 52, height: 52 }} />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
          <div ref={divRef}></div>
        </InfiniteScroll>
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
