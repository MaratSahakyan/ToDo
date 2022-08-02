import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReplayIcon from "@mui/icons-material/Replay";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToDoItemsContainer, ListStyle, CeckBoxItemContainer } from "./ToDoCss";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import InputDialog from "./InputDialog";

export default function ToDoList({
  data,
  selectedTypeData,
  changeTypeInToDoItem,
  returnDeletedData,
  editToDoValue,
  setToDos,
}) {
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [inputDialogData, setInputDialogData] = useState({});
  const [selectValue, setSelectValue] = useState();

  const durationObjectAddToDos = (obj) => {
    if (!!obj) {
      setToDos(
        data.map((e) => {
          if (e.id === obj.id) {
            return obj;
          } else return e;
        })
      );
    }
  };
  return (
    <ToDoItemsContainer>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination.index;
          let currentValue = data[srcI];
          let currentObj = data.splice(srcI, 1);
          data.splice(desI, 0, ...currentObj);
          setToDos(data);
        }}
      >
        <ul>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((e, i) => {
                  if (e.type === selectedTypeData) {
                    return (
                      <Draggable
                        key={e.id}
                        draggableId={"dragable-" + e.id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <ListStyle
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            dragStyle={snapshot.isDragging}
                          >
                            <CeckBoxItemContainer>
                              {e.type === "In-Progress" ? (
                                <Checkbox
                                  onClick={() =>
                                    changeTypeInToDoItem(e, "Completed")
                                  }
                                />
                              ) : (
                                <ReplayIcon
                                  onClick={() =>
                                    changeTypeInToDoItem(e, "In-Progress")
                                  }
                                />
                              )}
                              <Tooltip title="Edit">
                                <div
                                  onClick={() => editToDoValue(e)}
                                  style={{
                                    textDecoration:
                                      e.type === "Completed"
                                        ? "lineThrough"
                                        : "none",
                                  }}
                                >
                                  {e.value}
                                </div>
                              </Tooltip>
                            </CeckBoxItemContainer>
                            <HighlightOffIcon
                              color="error"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (e.type === "Removed") {
                                  returnDeletedData(e, "");
                                } else {
                                  returnDeletedData(e, "Removed");
                                }
                              }}
                            />
                            <HourglassTopIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setInputDialogData(e);
                                setSelectValue("");
                                setShowInputDialog(true);
                              }}
                            />
                            {showInputDialog && (
                              <InputDialog
                                selectValue={selectValue}
                                setSelectValue={setSelectValue}
                                durationObjectAddToDos={durationObjectAddToDos}
                                data={inputDialogData}
                                setShowInputDialog={setShowInputDialog}
                              />
                            )}
                            {provided.placeholder}
                          </ListStyle>
                        )}
                      </Draggable>
                    );
                  }
                })}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
    </ToDoItemsContainer>
  );
}
