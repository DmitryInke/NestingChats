import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import AuthGuard from "./components/auth/Guards/Auth-Guard";
import Header from "./components/header/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
