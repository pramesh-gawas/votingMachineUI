import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

const commonCardSx = {
  maxWidth: 295,
  padding: 5,
  width: "100%",
  justifyContent: "center",
  border: "lightgray",
  borderRadius: "20px",
};

export const CardSkeleton = () => {
  return (
    <Card sx={commonCardSx}>
      <Skeleton
        variant="rectangular"
        sx={{
          height: 240,
          borderRadius: "20px",
          mb: 2,
          width: "100%",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 0, "&:last-child": { pb: 0 } }}>
        <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={25} />
      </CardContent>
      <CardActions
        sx={{ mt: "auto", justifyContent: "space-between", p: 0, pt: 2 }}
      >
        <Skeleton
          variant="rectangular"
          width={60}
          height={30}
          sx={{ borderRadius: "4px" }}
        />
        <Skeleton
          variant="rectangular"
          width={60}
          height={30}
          sx={{ borderRadius: "4px" }}
        />
      </CardActions>
    </Card>
  );
};
