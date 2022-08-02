import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReceptionDialog({
  setShowStaticDurationDialog,
  toDos,
}) {
  const [open, setOpen] = React.useState(false);
  const [counterProgress, setCounterProgress] = React.useState({
    "In-Progress": 0,
    "Completed": 0,
    "Removed": 0,
  });

  const handleClose = () => {
    setShowStaticDurationDialog(false);
  };

  const sumAllDuration = () => {
    return toDos.reduce((a, e) => {
      if (e?.duration) return (a += e?.duration);
      return a;
    }, 0);
  };

  const countOfToDosProgress = () => {
    toDos.forEach((e) => {
      setCounterProgress({
        [e.type]: (counterProgress[e.type] += 1),
        ...counterProgress,
      });
    });
  };

  React.useEffect(() => {
    countOfToDosProgress();
  }, [toDos]);


  return (
    <div>
      <Dialog
        open
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The time spent on completed ToDo's"}</DialogTitle>
        <DialogContent style={{textAlign:'center'}}>
          <DialogContentText id="alert-dialog-slide-description">
            It took you {sumAllDuration()} hours to complete the ToDo's...
          </DialogContentText>
          <div>{`you currently have ${counterProgress["In-Progress"]} uncompleted, ${counterProgress["Completed"]} completed and ${counterProgress["Removed"]}, deleted ToDo's`}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
