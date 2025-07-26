import { Grid, Skeleton } from "@mui/material";
import { Item } from "../home/Home";

export const CardsSkeletonVoting = () => {
  const count = 4;
  return (
    <>
      <Grid container spacing={3} sx={{ justifyContent: "space-evenly" }}>
        {Array.from(new Array(count)).map((_, index) => (
          <Grid key={index} sx={{ width: "20rem" }}>
            <Item>
              {/* Skeleton for Avatar */}
              <Skeleton
                variant="rounded"
                width="100%"
                height={200}
                sx={{ bgcolor: "grey.300" }}
              />

              {/* Skeleton for Candidate Name and Party Name */}
              <Grid
                container
                direction="column"
                alignItems="justify"
                spacing={1}
              >
                <Grid>
                  <Skeleton
                    variant="text"
                    width={250}
                    height={40}
                    sx={{ bgcolor: "grey.300" }}
                  />{" "}
                  {/* Candidate Name */}
                </Grid>
                <Grid>
                  <Skeleton
                    variant="text"
                    width={100}
                    height={30}
                    sx={{ bgcolor: "grey.300" }}
                  />{" "}
                  {/* Party Name */}
                </Grid>
                {/* Skeleton for Button */}
                <Grid>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={35}
                    sx={{ bgcolor: "grey.300", borderRadius: "4px" }}
                  />
                </Grid>
              </Grid>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
