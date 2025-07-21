import { useEffect, useState } from "react";
import { Button, Box, Typography, Grid, Stack } from "@mui/material";
import { Item } from "../home/Home";
import { CandidateList, DeleteCandidate } from "../apiIntegration/api";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../common/Toaster";

export const AdminCandidateList = ({
  setUpdateData,
  setHandleUpdateClicked,
  setHandleAddClicked,
}: any) => {
  const [candidate, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const handleDelete = async (candidateID: any) => {
    try {
      const { response, message, error } = await DeleteCandidate(candidateID);
      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
      }
    } catch (error: any) {
      Toaster(error, "error");
    }
  };

  useEffect(() => {
    const loadCandidateList = async () => {
      setLoading(true);
      try {
        const candidatelist = await CandidateList();
        setCandidateList(candidatelist?.candidateList);
        setLoading(false);
      } catch (err: any) {
        Toaster(err, "error");
      }
    };

    loadCandidateList();
  }, [loading]);

  const handleUpdate = (item: any) => {
    setHandleUpdateClicked(true);
    setHandleAddClicked(false);
    setUpdateData(item);
    Navigate(`/candidate/${item._id}`);
  };

  return (
    <Box sx={{ mt: 1, marginBlockStart: "10px" }}>
      <Typography component="h1" variant="h5">
        Candidate List
      </Typography>
      <Box sx={{ width: "100%", marginBlockStart: "14px" }}>
        <Stack spacing={2}>
          {candidate?.map((item, index) => (
            <Box key={index} boxShadow={3}>
              <Item>
                <Grid>
                  <Button onClick={() => handleDelete(item?._id)}>
                    delete
                  </Button>
                  <Button onClick={() => handleUpdate(item)}>update</Button>
                  <h2>
                    CandiateName: <b>{item.name}</b>
                  </h2>
                  <h2>
                    PartyName: <b>{item.party}</b>
                  </h2>
                </Grid>
              </Item>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
