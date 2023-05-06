import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import styles from "./CreateLotCard.module.css";
import { NavLink } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import BasicSelect from "../BasicSelect/BasicSelect";
import { Status } from "src/types/Lot";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const CreateLotCard = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timeStart, setTimeStart] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h4">Create Lot</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box className={styles["box"]}>
              <TextField
                label="Lot Name"
                itemID="name"
                variant="standard"
                sx={{ fontSize: 16 }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                label="Time_start"
                itemID="time_start"
                type="datetime-local"
                variant="standard"
                onChange={(e) => {
                  setTimeStart(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Image"
                itemID="image"
                type="file"
                variant="standard"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={styles["box"]}>
              <TextField
                id="filled-number"
                label="Price"
                type="number"
                variant="standard"
                sx={{ fontSize: 16 }}
                onChange={(e) => {
                  setPrice(+e.target.value);
                }}
              />
              <TextField
                label="Time_end"
                itemID="time_end"
                type="datetime-local"
                variant="standard"
                onChange={(e) => {
                  setTimeEnd(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextareaAutosize
                aria-label="description textarea"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button sx={{ fontSize: 16 }}>create</Button>
      </Card>
    </Box>
  );
};

export default CreateLotCard;
