import { Card, Grid, CircularProgress } from "@mui/material";
import react from "react";
const LoadingCard = () => {
  return (
    <Grid container>
      <Grid
        item
        md={12}
        alignItems="center"
        justifyContent="center"
        display="flex"
        minHeight={150}
      >
        <CircularProgress size={60} />
      </Grid>
    </Grid>
  );
};
export default LoadingCard;
