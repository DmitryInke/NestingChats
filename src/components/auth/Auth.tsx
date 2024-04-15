import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";
import React from "react";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
}

const Auth = ({
  submitLabel,
  onSubmit,
  children,
  error,
  extraFields,
}: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: 360,
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        error={
          !!(
            error &&
            !error.includes("Password") &&
            !error.includes("Username")
          )
        }
        helperText={
          error && !error.includes("Password") && !error.includes("Username")
            ? error
            : ""
        }
        onChange={(event) => setEmail(event.target.value)}
      />
      {extraFields &&
        extraFields.map(
          (field, index) =>
            React.cloneElement(field as React.ReactElement, { key: index }) // Safely clone element with a key
        )}
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={
          !!(error && !error.includes("Email") && !error.includes("Username"))
        }
        helperText={
          error && !error.includes("Email") && !error.includes("Username")
            ? error
            : ""
        }
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
