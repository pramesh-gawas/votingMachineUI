import { Box, ButtonBase, Grid, Skeleton } from "@mui/material";
import { Item } from "../home/Home";

export const ProfileSkeleton = () => {
  const count = 8;
  return (
    <Box padding={4}>
      <ButtonBase
        component="div" // Changed to div as it's static
        aria-label="Avatar image loading"
        sx={{
          borderRadius: "40px",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
        }}
      >
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          sx={{ marginTop: "1rem", bgcolor: "grey.300" }}
        />
        {/* The hidden img tag is not part of the visible skeleton */}
      </ButtonBase>
      <Skeleton
        variant="text"
        width={200}
        height={40}
        sx={{ my: 2, bgcolor: "grey.300" }}
      />{" "}
      {/* Name skeleton */}
      <form>
        <Grid container spacing={3}>
          {/* Skeleton for First Name */}
          {Array.from(new Array(count)).map((_, index) => (
            <Grid key={index}>
              {" "}
              {/* Use item and responsive sizes */}
              <Item>
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={40}
                  sx={{ bgcolor: "grey.300", borderRadius: "4px" }}
                />
              </Item>
            </Grid>
          ))}

          {/* Skeletons for Buttons */}
          <Grid container spacing={3}>
            <Grid>
              <Skeleton
                variant="rectangular"
                width={120}
                height={40}
                sx={{ bgcolor: "grey.300", borderRadius: "4px" }}
              />
            </Grid>
            <Grid>
              <Skeleton
                variant="rectangular"
                width={80}
                height={40}
                sx={{ bgcolor: "grey.300", borderRadius: "4px" }}
              />
            </Grid>
            <Grid>
              <Skeleton
                variant="rectangular"
                width={80}
                height={40}
                sx={{ bgcolor: "grey.300", borderRadius: "4px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
