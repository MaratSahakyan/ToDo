import React, { useEffect, useState, memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ReplayIcon from "@mui/icons-material/Replay";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";

const ListStyle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
`

export default memo(function ToDoList({ data, newValue, editSelectedValue, setChooseOrderData, callChangeOrderData }) {
  const [inProgresData, setInProgresData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [removedData, setRemovedData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null)



  useEffect(() => {
    addInProgresData();
  }, [newValue]);

  useEffect(() => {
    callChangeOrderTimeData()
  }, [callChangeOrderData])

  const callChangeOrderTimeData = () => {
    if(callChangeOrderData === "Down"){
      setInProgresData(inProgresData.sort((a,b) => b.createdOrder - a.createdOrder))
    } else if(callChangeOrderData === "Up") {
      setInProgresData(inProgresData.sort((a,b) => a.createdOrder - b.createdOrder))
    }
  }



  const addInProgresData = () => {
    if (newValue) {
      setInProgresData([newValue, ...inProgresData]);
    }
  };

useEffect(() => setChooseOrderData(inProgresData), [inProgresData])


  const changePlaceCompletedData = (id) => {
    setCompletedData([
      inProgresData.find((e) => e.id === id),
      ...completedData,
    ]);
    
    setInProgresData(inProgresData.filter((e) => e.id !== id));
  };

  const changeDataInToRemoved = (id) => {
    if (!!inProgresData.find((e) => e.id === id)) {
      setRemovedData([inProgresData.find((e) => e.id === id), ...removedData]);
      setInProgresData(inProgresData.filter((e) => e.id !== id));
    } else if (!!completedData.find((e) => e.id === id)) {
      setRemovedData([completedData.find((e) => e.id === id), ...removedData]);
      setCompletedData(completedData.filter((e) => e.id !== id));
    }
  };

  const returnInToInProgres = (id) => {
    setInProgresData([removedData.find((e) => e.id === id), ...inProgresData]);
    setRemovedData(removedData.filter((e) => e.id !== id));
  };

  const irrevocableDelete = (id) => {
    setRemovedData(removedData.filter((e) => e.id !== id));
  };

  const returnInToInProgresFromCompleted = (id) => {
    setInProgresData([
      completedData.find((e) => e.id === id),
      ...inProgresData,
    ]);
    setCompletedData(completedData.filter((e) => e.id !== id));
  };

  const popEditValueInProgres = (id) => {
    setInProgresData(inProgresData.filter((e) => e.id !== id));
  };

  const dragStartHandler = (e, card) => {
    console.log("drag", card);
    setCurrentCard(card)
  }

  const dragEndHandler = (e) => {
    e.target.style.background = 'white'
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'lightgray'
    setInProgresData(inProgresData.sort(sortInProgresData))
  }

  function sortInProgresData (a,b) {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  const dropHandler = (e, card) => {
    e.preventDefault()
    setInProgresData(inProgresData.map((d) => {
      if(d.id === card.id){
        return {...d, order: currentCard?.order}
      }
      if(d.id === currentCard.id) {
        return {...d, order: card.order}
      }
      return d
    }))
    e.target.style.background = 'white'
    
  }





  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data === "In-Progres"
          ? inProgresData.map((e) => (
              <ListStyle
              draggable={true}
              onDragStart={(evt) => dragStartHandler(evt, e)}
              onDragLeave={(evt) => dragEndHandler(evt)}
              onDragEnd={(evt) => dragEndHandler(evt)}
              onDragOver={(evt) => dragOverHandler(evt)}
              onDrop={(evt) => dropHandler(evt, e)}
                key={e?.id}

              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox onClick={() => changePlaceCompletedData(e?.id)} />
                  <Tooltip title="Edit">
                    <span
                      onClick={() => {
                        editSelectedValue(e);
                        popEditValueInProgres(e.id);
                      }}
                    >
                      {e?.value}
                    </span>
                  </Tooltip>
                </div>
                <HighlightOffIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => changeDataInToRemoved(e.id)}
                />
              </ListStyle>
            ))
          : data === "Completed"
          ? completedData.map((e) => (
              <ListStyle
                key={e?.id}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ReplayIcon
                    onClick={() => returnInToInProgresFromCompleted(e.id)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <div className="lineThrough">{e?.value}</div>
                </div>
                <HighlightOffIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => changeDataInToRemoved(e.id)}
                />
              </ListStyle>
            ))
          : removedData.map((e) => (
              <li
                key={e.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ReplayIcon
                    onClick={() => returnInToInProgres(e.id)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  {e?.value}
                </div>
                <HighlightOffIcon
                  onClick={() => irrevocableDelete(e.id)}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
      </ul>
    </div>
  );
});
