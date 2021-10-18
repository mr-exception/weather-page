import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

interface IProps {
  children: any;
}
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              location.href = "/";
            }}
          >
            Search
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              location.href = "#map";
              location.reload();
            }}
          >
            World Map
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
export default Layout;
