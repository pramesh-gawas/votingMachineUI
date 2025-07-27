import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export const NodataFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        textAlign: "center",
        color: "text.secondary",
        p: 3,
        borderRadius: 2,
        // border: '1px dashed grey.400',
        // bgcolor: 'grey.50',
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, mb: 2, color: "text.disabled" }} />
      <Typography variant="h6" component="p">
        no data found
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
        Please try again later.
      </Typography>
    </Box>
  );
};
