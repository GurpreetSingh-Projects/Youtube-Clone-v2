import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ProfileModal = () => {
  return (
    <>
      <Box className="faj flex-column my-3">
        <Avatar sx={{ height: 120, width: 120 }}>G</Avatar>
        <Typography
          id="modal-modal-description"
          className="text-center"
          sx={{ mt: 2 }}
        >
          Welcome Guest User!! <br />
          The breeze is cold out there, stay cozy & warm ☕
        </Typography>
      </Box>
    </>
  );
};

export default ProfileModal;
