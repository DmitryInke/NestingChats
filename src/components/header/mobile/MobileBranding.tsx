import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

const MobileBranding = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
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
};

export default MobileBranding;
