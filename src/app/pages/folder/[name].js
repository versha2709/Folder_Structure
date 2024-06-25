import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

const FolderDetail = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Box p={2}>
      <Typography variant="h4">Folder Details: {name}</Typography>
    </Box>
  );
};

export default FolderDetail;
