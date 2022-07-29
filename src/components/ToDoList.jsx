import React from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReplayIcon from "@mui/icons-material/Replay";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoItemsContainer = styled.div`
  width: 100%;
  min-height: 200px;
  padding-top: 20px;
  margin-bottom: 50px;
`;

const ListStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 0;
  border-radius: 30px;
  font-family: "Roboto";
  font-size: 22px;
  box-shadow: ${(props) => (props.dragStyle ? "0 0 .4rem #666" : "none")};
  margin-bottom: 15px;

  &:hover {
    background-color: #fff;
  }
`;

const CeckBoxItemContainer = styled.div`
  display: flex;
  align-items: center;

  width: 90%;
`;

export default function ToDoList({
  data,
  selectedTypeData,
  changeTypeInToDoItem,
  returnDeletedData,
  editToDoValue,
  setToDos,
}) {
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
