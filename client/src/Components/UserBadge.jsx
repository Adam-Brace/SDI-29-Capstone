import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';


function UserBadge() {

  const { user } = useAuth();

  const tooltipContent = user ? (
    <Box sx={{ p: 1 }}>
      <div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
        Rank: {user.rank}
      </div>
      <div style={{ fontSize: "0.875rem" }}>
        First Name: {user.first_name}
      </div>
      <div style={{ fontSize: "0.875rem" }}>
        Last Name: {user.last_name}
      </div>
    </Box>
  ) : (
    <Box sx={{ p: 1, fontSize: "0.875rem" }}>Not Logged In</Box>
  );

  const getInitials = () => {
    if (!user) return "U";
    const first = user.first_name?.[0]?.toUpperCase() || "";
    const last = user.last_name?.[0]?.toUpperCase() || "";
    return first + last;
  };

  const avatarSrc = user
  ? `https://dummyimage.com/40x40/cccccc/000000.png&text=${getInitials()}`
  : "https://dummyimage.com/40x40/cccccc/000000.png&text=User";

  return (
    <Tooltip title={tooltipContent} arrow>
      <Avatar
        alt={user ? `${user.first_name} ${user.last_name}` : "Guest"}
        src={avatarSrc}
        sx={{ width: 40, height: 40 }}
      />
    </Tooltip>
  );
}

export default UserBadge;
