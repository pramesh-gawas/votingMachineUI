import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { CandidateList } from "../apiIntegration/api";
import { CandidateCount } from "../apiIntegration/api";
import { useEffect, useState } from "react";

interface candidateList {
  party: string;
  count: number;
  name: string;
  voteCount: string;
}

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "justify",
  justifyContent: "center",
  overflow: "auto",
  display: "flex",
  columnGap: "20px",
  flexDirection: "column",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export const Home = () => {
  const [candidate, setCandidateList] = useState([]);
  const [candidateCount, setCandidateCount] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidateList = async () => {
      // setLoading(true);
      try {
        const candidatelist = await CandidateList();
        setCandidateList(candidatelist?.candidateList);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    loadCandidateList();
  }, []);

  useEffect(() => {
    const loadCandidateCount = async () => {
      // setLoading(true);
      try {
        const candidateCount = await CandidateCount();
        setCandidateCount(candidateCount?.voteRecord);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    loadCandidateCount();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <h2>Live Vote Count</h2>
        <Grid container spacing={2} minWidth={"100px"}>
          <>
            {candidateCount?.map((candidate: candidateList, index) => (
              <Grid
                size={4}
                boxShadow={4}
                padding={1}
                key={index}
                sx={{ overflow: "auto" }}
              >
                <h2>
                  Party Name: <b>{candidate.party}</b>
                </h2>
                <h2>
                  Vote Count: <b>{candidate.count}</b>
                </h2>
              </Grid>
            ))}
          </>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginBlockStart: "30px",
        }}
      >
        <h2>Candidate List</h2>
        <Grid container spacing={3} sx={{ justifyContent: "space-evenly" }}>
          {candidate.map((item: candidateList, index) => (
            <Grid sx={{ width: "16rem" }} key={index} boxShadow={3}>
              <Item>
                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                    height: "150px",
                    width: "auto",
                  }}
                  variant="rounded"
                ></Avatar>

                <Grid
                  sx={{
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <h3>
                    CandiateName:<b>{item.name}</b>
                  </h3>
                  <h3>
                    PartyName:<b>{item.party}</b>
                  </h3>
                  <p>
                    Vote Count:<b>{item.voteCount}</b>
                  </p>
                </Grid>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
