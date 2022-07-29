import React from "react";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Tooltip from "@mui/material/Tooltip";
import BasicMenu from "./BasicMenu";

const ToDoHeaderContainer = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderDateContainer = styled.div`
  width: 185px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleSelectedDay = styled.h3`
  font-family: "Roboto";
  font-weight: 700;
  font-size: 30px;
`;

const UpDownContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function ToDoHeader({ changeSelectedTypeData, sortToDoData }) {
  return (
    <ToDoHeaderContainer>
      <HeaderDateContainer style={{ width: "150px" }}>
        <CalendarMonthIcon
          fontSize="large"
          color="primary"
          style={{ cursor: "pointer" }}
        />
        <TitleSelectedDay>Today</TitleSelectedDay>
      </HeaderDateContainer>
      <HeaderDateContainer>
        <UpDownContainer>
          <Tooltip title="Sort By Date (older-newer)">
            <ArrowDownwardIcon
              style={{ cursor: "pointer" }}
              onClick={() => sortToDoData("straight")}
            />
          </Tooltip>
          <Tooltip title="Sort By Date (newer-older)">
            <ArrowUpwardIcon
              style={{ cursor: "pointer" }}
              onClick={() => sortToDoData("reverse")}
            />
          </Tooltip>
        </UpDownContainer>
        <BasicMenu changeSelectedTypeData={changeSelectedTypeData} />
      </HeaderDateContainer>
    </ToDoHeaderContainer>
  );
}
