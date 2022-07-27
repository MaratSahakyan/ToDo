import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";


const Title = styled.h2`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 25px;
  margin-left: 15px;
`

const FlexibleDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`


export default function CreateItem({
  newToDoFunction,
  data,
  selectedEditObject,
  chooseOrederInDragAndDrop
}) {
  const [showInputField, setShowInputField] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!!selectedEditObject) {
      setShowInputField(true);
      setInputValue(selectedEditObject.value);
    }
  }, [selectedEditObject]);

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      setShowInputField(false);
      if (inputValue) {
        newToDoFunction({
          value: inputValue,
          id: uuidv4(),
          createdTime: new Date().toDateString(),
          order: chooseOrederInDragAndDrop?.length,
          createdOrder: new Date().getTime()
        });
      }
      setInputValue("");
    }
  }

  const handleAddToDo = () => {
    setShowInputField(false);
    if (inputValue) {
      newToDoFunction({
        value: inputValue,
        id: uuidv4(),
        createdTime: new Date().toDateString(),
        order: chooseOrederInDragAndDrop?.length,
        createdOrder: new Date().getTime()
      });
    }
    setInputValue("");
  }
  return (
    <>
      {showInputField && data === "In-Progres" ? (
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            id="outlined-basic"
            label="Please Enter Your To Do"
            variant="outlined"
            defaultValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: "100%" }}
          />
          <Button
            style={{ padding: "18px" }}
            onClick={handleAddToDo}
          >
            ADD
          </Button>
        </Box>
      ) : null}
      {data === "In-Progres" ? (
        <FlexibleDiv onClick={() => setShowInputField(true)}>
          <AddCircleOutlineIcon />
          <Title>
            Create New To-Do
          </Title>
        </FlexibleDiv>
      ) : null}
    </>
  );
}
