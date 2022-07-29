import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function BasicMenu({ changeSelectedTypeData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            changeSelectedTypeData("Completed");
          }}
        >
          Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            changeSelectedTypeData("In-Progress");
          }}
        >
          In-Progress
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            changeSelectedTypeData("Removed");
          }}
        >
          Removed
        </MenuItem>
      </Menu>
    </div>
  );
}
