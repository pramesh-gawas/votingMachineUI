import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Vote, CandidateList } from "../apiIntegration/api";

import { useEffect, useState } from "react";
import { Item } from "../home/Home";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Toaster } from "../common/Toaster";

interface CandidateItemInterface {
  _id: string;
  name: string;
  party: string;
  photo?: string;
}

// interface CandidateListProps {
//   candidates: Candidate[];
//   handleVote: (candidateId: string) => void;
// }

export const Voting = () => {
  const Navigate = useNavigate();
  const [candidate, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidateList = async () => {
      setLoading(true);
      try {
        const candidatelist = await CandidateList();
        setCandidateList(candidatelist?.candidateList);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    loadCandidateList();
  }, []);

  const handleVote = async (candidateID: any) => {
    try {
      Navigate(`/candidate/vote/${candidateID}`);
      const { error, message } = await Vote(candidateID);
      if (error) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
      }
    } catch (error) {}
  };
  return (
    <>
      <h2>Vote your candidate</h2>
      <Grid container spacing={3} sx={{ justifyContent: "space-evenly" }}>
        {candidate.map((item: CandidateItemInterface, index) => (
          <Grid sx={{ width: "20rem" }} key={index}>
            <Item>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  height: "auto",
                  width: "auto",
                }}
                variant="rounded"
              ></Avatar>

              <Grid>
                <h3>
                  CandiateName:<b>{item.name}</b>
                </h3>
                <h3>
                  PartyName:<b>{item.party}</b>
                </h3>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleVote(item?._id)}
                >
                  VOTE NOW
                </Button>
              </Grid>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
