import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

const FolderList = dynamic(() => import("./components/FolderList"), {
  ssr: false,
});
const ErrorBoundary = dynamic(() => import("./components/ErrorBoundary"), {
  ssr: false,
});

export default function Home() {
  return (
    <ErrorBoundary>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box>
          <Typography variant="h2" textAlign="center" mb={2}>
            File System
          </Typography>
          <FolderList />
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
