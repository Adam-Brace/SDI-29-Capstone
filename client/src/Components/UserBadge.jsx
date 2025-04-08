import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

function UserBadge({ user }) {
 
  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
        Rank: {user.rank}
      </div>
      <div style={{ fontSize: "0.875rem" }}>
        First Name: {user.firstName}
      </div>
      <div style={{ fontSize: "0.875rem" }}>
        Last Name: {user.lastName}
      </div>
    </Box>
  );

  return (
   
    <Tooltip title={tooltipContent} arrow>
      <Avatar
        alt="User"
        
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=User"
        sx={{ width: 40, height: 40 }}
      />
    </Tooltip>
  );
}

export default UserBadge;
