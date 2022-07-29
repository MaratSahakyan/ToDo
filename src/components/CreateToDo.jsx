import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { SignalCellularNullTwoTone } from "@mui/icons-material";

const CreateToDoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const InputField = styled.input`
  border: none;
  background-color: #f5f5f5;
  padding: 5px;
  width: 100%;

  &::placeholder {
    font-size: 15px;
  }
`;

export default function CreateToDo({
  createNewToDo,
  objectForEditItemValue,
  setToDos,
  toDos,
  selectedTypeData,
}) {
  const [inputAutoFocus, setInputAutoFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
        </CreateToDoContainer>
      ) : null}
    </>
  );
}
