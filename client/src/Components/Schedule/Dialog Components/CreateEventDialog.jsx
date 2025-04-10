import React from "react";
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
} from "@mui/material";

import { descriptionTypes } from "../constants";

const CreateEventDialog = ({
  open,
  onClose,
  selectedUser,
  createForm,
  onInputChange,
  onCreate,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event for {selectedUser?.name || 'User'}</DialogTitle>
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
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreate} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventDialog; 