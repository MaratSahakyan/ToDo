import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Tooltip } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function DatePicker({changeOrderCreatedTime}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: '250px' }}>
        <CalendarMonthIcon fontSize="large" color="primary" />
        <h3
          style={{
            // marginLeft: "50px",
            fontSize: "30px",
            fontWeight: "700",
            lineHeight: "21px",
            color: "#323232",
            fontFamily: "Roboto",
          }}
        >
          Today
        </h3>
        <div style={{display: 'flex', alignItems: "center"}}>
            <Tooltip title="created time">
                <ArrowDownwardIcon style={{cursor: "pointer"}} onClick={() => changeOrderCreatedTime("Down")}/>
            </Tooltip>
            <Tooltip title="created time reverse">
                <ArrowUpwardIcon style={{cursor: "pointer"}} onClick={() => changeOrderCreatedTime("Up")}/>
            </Tooltip>
        </div>
      </div>
    </div>
  );
}
