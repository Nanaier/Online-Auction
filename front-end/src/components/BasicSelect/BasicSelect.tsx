import { Dispatch } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Status } from "src/types/Lot";
import styles from "./BasicSelect.module.css";

const BasicSelect = (props: {
  status: Status;
  setStatus: Dispatch<React.SetStateAction<Status>>;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setStatus(event.target.value as Status);
  };

  const statusValues: [string, Status][] = [
    ["Active", "active"],
    ["Placed", "placed"],
    ["Sold", "sold"],
  ];

  return (
    <Box className={styles["box"]}>
      <FormControl fullWidth>
        <InputLabel id="simple-select">Status</InputLabel>
        <Select
          labelId="simple-select"
          id="simple-select-id"
          value={props.status}
          label="Status"
          variant="standard"
          onChange={handleChange}
        >
          {statusValues.map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default BasicSelect;