import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGetMe } from "../../hooks/useGetMe";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: any) => {
    const fileInput = event.target;
    try {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Image upload failed.");
      }
      snackVar({ message: "Image uploaded.", type: "success" });
      window.location.reload();
    } catch (error) {
      snackVar({ message: "Error uploading file.", type: "error" });
    } finally {
      fileInput.value = "";
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">{me?.data?.me.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} src={me.data?.me.imageUrl} />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;
