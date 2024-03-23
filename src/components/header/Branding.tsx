import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

const Branding = () => (
  <>
    <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    <Typography
      variant="h6"
      noWrap
      component="a"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      Nesting Chats
    </Typography>
  </>
);

export default Branding;
