import ErrorIcon from "@mui/icons-material/Error";
import { Box, Icon, Typography } from "@mui/material";
const TimedOut = () => {
  return (
    <div className="faj text-white h-100 w-100">
      <Box className="faj flex-column errorBox">
        <ErrorIcon sx={{ fontSize: 100 }} />
        <Typography sx={{ marginTop: 1 }} variant="subtitle">
          OOPS!! we ran into an error
        </Typography>
      </Box>
    </div>
  );
};

export default TimedOut;
