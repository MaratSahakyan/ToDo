import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { SdCardAlert } from "@mui/icons-material";

export default function DurationOfCompleteToDo({ setSelectValue }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Fil in the duration
        </InputLabel>
        <NativeSelect
          onChange={(e) => setSelectValue(e.target.value)}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          {new Array(12)
            .fill()
            .map((_, i) => i + 1)
            .map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
