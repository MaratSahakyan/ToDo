import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import ToDoHeader from "./components/ToDoHeader";
import ToDoList from "./components/ToDoList";
import CreateToDo from "./components/CreateToDo";
import { ToDoContainer } from "./components/ToDoCss";

function App() {
  const [toDos, setToDos] = useState([]);
  const [selectedTypeData, setSelectedTypeData] = useState("In-Progress");
  const [objectForEditItemValue, setObjectForEditItemValue] = useState();

  const createNewToDo = (toDoObject) => {
    if (!!toDoObject) {
      setToDos([toDoObject, ...toDos]);
    }
  };

  const changeSelectedTypeData = (value) => {
    if (!!value) {
      setSelectedTypeData(value);
    }
  };

  const changeTypeInToDoItem = (obj, val) => {
    if (!!obj && !!val) {
      obj.type = val;
      setToDos(
        toDos.map((e) => {
          if (e.id === obj.id) {
            return obj;
          } else return e;
        })
      );
    }
  };

  const returnDeletedData = (obj, val) => {
    if (!!obj && !val) {
      setToDos(toDos.filter((e) => e.id !== obj.id));
    }
    if (!!obj && !!val) {
      obj.type = val;
      setToDos(
        toDos.map((e) => {
          if (e.id === obj.id) {
            return obj;
          } else return e;
        })
      );
    }
  };

  const editToDoValue = (obj) => {
    if (!!obj) {
      setObjectForEditItemValue(obj);
    }
  };

  const sortToDoData = (val) => {
    if (val === "straight") {
      setToDos([...toDos.sort((a, b) => a.id - b.id)]);
    } else if (val === "reverse") {
      setToDos([...toDos.sort((a, b) => b.id - a.id)]);
    }
  };



  return (
    <div className="App">
      <ToDoContainer>
        <ToDoHeader
          sortToDoData={sortToDoData}
          changeSelectedTypeData={changeSelectedTypeData}
        />
        {selectedTypeData}
        <ToDoList
          setToDos={setToDos}
          editToDoValue={editToDoValue}
          returnDeletedData={returnDeletedData}
          changeTypeInToDoItem={changeTypeInToDoItem}
          selectedTypeData={selectedTypeData}
          data={toDos}
        />
        <CreateToDo
          selectedTypeData={selectedTypeData}
          toDos={toDos}
          setToDos={setToDos}
          objectForEditItemValue={objectForEditItemValue}
          createNewToDo={createNewToDo}
        />
      </ToDoContainer>
    </div>
  );
}

export default App;
