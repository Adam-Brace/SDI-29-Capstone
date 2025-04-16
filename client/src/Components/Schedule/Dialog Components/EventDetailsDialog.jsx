import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { formatDate } from "../utilityFunctions";

const EventDetailsDialog = ({ 
  open, 
  onClose, 
  selectedTile, 
  onEdit, 
  onDelete 
}) => {
  if (!selectedTile) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedTile.title}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Description:</strong> {selectedTile.description || "Not specified"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>Start:</strong> {formatDate(selectedTile.startDate)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <strong>End:</strong> {formatDate(selectedTile.endDate)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsDialog; 