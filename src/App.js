import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import MenuListComposition from "./components/MenuListComposition";
import DatePicker from "./components/DatePicker";
import ToDoList from "./components/ToDoList";
import CreateItem from "./components/CreateItem";
import { ChromeReaderModeRounded } from "@mui/icons-material";

function App() {
  const [selectedToDoData, setSelectedToDoData] = useState("In-Progres");
  const [newToDoValue, setNewToDoValue] = useState("");
  const [selectedEditObject, setSelectedEditObject] = useState();
  const [chooseOrederInDragAndDrop, setChooseOrederInDragAndDrop] = useState([]);
  const [callChangeOrderData, setCallChangeOrderData] = useState("")
  useMemo(() => {
    return newToDoValue;
  });
  
  const setChooseOrderData = (data) => {
    if(!!data) { 
      setChooseOrederInDragAndDrop(data)
    }
  }

  const changeOrderCreatedTime = (call) => {
    if(!!call) {
      setCallChangeOrderData(call)
    }
  }


  const chengeSelectedToDoData = (value) => {
    setSelectedToDoData(value);
  };

  const newToDo = (obj) => {
    if (obj) {
      setNewToDoValue(obj);
    }
  };



  const editSelectedValue = (obj) => {
    if (!!obj) {
      setSelectedEditObject(obj);
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <div className="header">
          <DatePicker  changeOrderCreatedTime={changeOrderCreatedTime}/>
          <MenuListComposition
            chengeSelectedToDoData={chengeSelectedToDoData}
          />
        </div>
        <div className="todo-section">
          {selectedToDoData}
          <ToDoList
            callChangeOrderData={callChangeOrderData}
            setChooseOrderData={setChooseOrderData}
            editSelectedValue={editSelectedValue}
            newValue={newToDoValue}
            data={selectedToDoData}
          />
          <CreateItem
            chooseOrederInDragAndDrop={chooseOrederInDragAndDrop}
            selectedEditObject={selectedEditObject}
            newToDoFunction={newToDo}
            data={selectedToDoData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
