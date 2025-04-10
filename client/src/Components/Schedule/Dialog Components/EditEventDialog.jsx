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

const EditEventDialog = ({
  open,
  onClose,
  editForm,
  onInputChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={editForm.title}
          onChange={onInputChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="description-label">Description</InputLabel>
          <Select
            labelId="description-label"
            name="description"
            value={editForm.description}
            label="Description"
            onChange={onInputChange}
          >

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
        {editForm.description === "custom" && (
          <TextField
            margin="dense"
            name="customDescription"
            label="Custom Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editForm.customDescription || ""}
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
          value={editForm.startDate}
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
          value={editForm.endDate}
          onChange={onInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog; 