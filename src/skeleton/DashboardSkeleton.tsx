import { Grid, Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid #e0e0e0",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

export const DashboardSkeleton = () => {
  const numberOfVoteCountSkeletons = 4;
  const numberOfCandidateListSkeletons = 4;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />{" "}
        <Grid container spacing={2}>
          {[...Array(numberOfVoteCountSkeletons)].map((_, index) => (
            <Grid
              size={4}
              boxShadow={4}
              padding={1}
              key={index}
              sx={{ overflow: "auto", height: "150px" }}
            >
              <Skeleton variant="text" width="70%" height={30} />{" "}
              <Skeleton variant="text" width="50%" height={30} />{" "}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginBlockStart: "30px",
        }}
      >
        <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />{" "}
        <Grid container spacing={3} sx={{ justifyContent: "space-evenly" }}>
          {[...Array(numberOfCandidateListSkeletons)].map((_, index) => (
            <Grid
              sx={{
                width: "16rem",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                borderRadius: "8px",
                bgcolor: "background.paper",
              }}
              key={index}
            >
              <Item
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    bgcolor: "#e0e0e0",
                    height: "150px",
                    width: "150px",
                    borderRadius: "20px",
                    mb: 2,
                  }}
                />

                <Box
                  sx={{
                    width: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "justify",
                    gap: 0.5,
                  }}
                >
                  <Skeleton variant="text" width="90%" height={30} />{" "}
                  <Skeleton variant="text" width="70%" height={30} />{" "}
                  <Skeleton variant="text" width="50%" height={25} />{" "}
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
