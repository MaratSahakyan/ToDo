import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { SignalCellularNullTwoTone } from "@mui/icons-material";
import { CreateToDoContainer, InputField } from "./ToDoCss";
import { Button } from "@mui/material";
import ReceptionDialog from "./ReceptionDialog";

export default function CreateToDo({
  createNewToDo,
  objectForEditItemValue,
  setToDos,
  toDos,
  selectedTypeData,
}) {
  const [inputAutoFocus, setInputAutoFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showStaticDurationDialog, setShowStaticDurationDialog] =
    useState(false);

  useEffect(() => {
    if (inputValue.length === 0 && !!objectForEditItemValue) {
      setInputValue(objectForEditItemValue?.value);
      setToDos(toDos.filter((e) => e.id !== objectForEditItemValue?.id));
    }
  }, [objectForEditItemValue]);

  const sendNewToDo = () => {
    if (!!inputValue) {
      createNewToDo({
        id: new Date().getTime(),
        value: inputValue,
        type: "In-Progress",
      });
      setInputValue("");
    }
  };

  const sendNewToDoInEnter = (e) => {
    if (e.key === "Enter" && !!inputValue) {
      createNewToDo({
        id: new Date().getTime(),
        value: inputValue,
        type: "In-Progress",
      });
      setInputValue("");
    }
  };

  const activedInput = () => {
    setInputAutoFocus(true);
  };

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {selectedTypeData === "In-Progress" ? (
        <CreateToDoContainer onClick={activedInput}>
          <ControlPointIcon onClick={sendNewToDo} />
          <InputField
            type="text"
            placeholder="Create New Item Here"
            value={inputValue}
            onChange={(e) => changeInputValue(e)}
            onKeyDown={(e) => sendNewToDoInEnter(e)}
          />
          <Button
            variant="contained"
            onClick={() => setShowStaticDurationDialog(true)}
          >
            Time Spent
          </Button>
          {showStaticDurationDialog && (
            <ReceptionDialog
              toDos={toDos}
              setShowStaticDurationDialog={setShowStaticDurationDialog}
            />
          )}
        </CreateToDoContainer>
      ) : null}
    </>
  );
}
