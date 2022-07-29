import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import DurationOfCompleteToDo from "./DurationOfCompletedToDo";

export default function InputDialog({
  setShowInputDialog,
  data,
  durationObjectAddToDos,
  setSelectValue,
  selectValue,
}) {
  const [inputTimeValue, setInputTimeValue] = useState("");

  const handleClose = () => {
    setSelectValue("");
    setShowInputDialog(false);
  };

  const handleSubmit = () => {
    setShowInputDialog(false);
    if (!!selectValue) {
      if (data.hasOwnProperty("duration")) {
        data.duration += +selectValue;
      } else if (!!selectValue) {
        data.duration = +selectValue;
      }
    }
  };

  useEffect(() => {
    durationObjectAddToDos(data);
  }, [data]);

  return (
    <div>
      <Dialog
        maxWidth="xs"
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
          {
            "In this field you can indicate how much time this ToDo took from you..."
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            {data?.value}
          </DialogContentText>
          {data?.duration && (
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              Last time you spent {data?.duration} hours on this ToDo
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <DurationOfCompleteToDo setSelectValue={setSelectValue} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
