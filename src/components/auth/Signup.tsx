import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/error";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          error={
            !!(error && !error.includes("Password") && !error.includes("Email"))
          }
          helperText={
            error && !error.includes("Password") && !error.includes("Email")
              ? error
              : ""
          }
          onChange={(event) => setUsername(event.target.value)}
        />,
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
