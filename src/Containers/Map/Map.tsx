import react from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

const Map: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: 10 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item md={10}>
          map
        </Grid>
      </Grid>
    </Container>
  );
};
export default Map;
