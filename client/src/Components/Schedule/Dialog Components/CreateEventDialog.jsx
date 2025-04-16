import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { descriptionTypes } from "../constants";

const CreateEventDialog = ({
  open,
  onClose,
  selectedUser,
  createForm,
  onInputChange,
  onCreate,
}) => {
  const [userMessage, setUserMessage] = useState("");
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleOpenMessageDialog = () => {
    setShowMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handleCreateWithMessage = () => {
    onCreate(userMessage);
    handleCloseMessageDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Event for {selectedUser?.name || 'User'}
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
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={createForm.title}
            onChange={onInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="create-description-label">Description</InputLabel>
            <Select
              labelId="create-description-label"
              name="description"
              value={createForm.description}
              label="Description"
              onChange={onInputChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {descriptionTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        bgcolor: type.color, 
                        borderRadius: '50%', 
                        mr: 1 
                      }} 
                    />
                    {type.value}
                  </Box>
                </MenuItem>
              ))}

            </Select>
          </FormControl>
          {createForm.description === "custom" && (
            <TextField
              margin="dense"
              name="customDescription"
              label="Custom Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={createForm.customDescription || ""}
              onChange={(e) => {
                onInputChange({
                  target: {
                    name: "description",
                    value: e.target.value
                  }
                });
              }}
            />
          )}
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date & Time"
            type="datetime-local"
            fullWidth
            value={createForm.startDate}
            onChange={onInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date & Time"
            type="datetime-local"
            fullWidth
            value={createForm.endDate}
            onChange={onInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleOpenMessageDialog} color="primary">
            Add Message
          </Button>
          <Button onClick={() => onCreate()} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onClose={handleCloseMessageDialog}>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add a Message
          <IconButton
            aria-label="close"
            onClick={handleCloseMessageDialog}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add a message that will be visible to admins.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={userMessage}
            onChange={handleMessageChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseMessageDialog}>Cancel</Button>
          <Button onClick={handleCreateWithMessage} variant="contained" color="primary">
            Create with Message
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEventDialog; 