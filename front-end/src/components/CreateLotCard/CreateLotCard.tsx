import { useState, useEffect, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import styles from "./CreateLotCard.module.css";
import { NavLink } from "react-router-dom";
import { FormControl, Grid, TextField } from "@mui/material";
import BasicSelect from "../BasicSelect/BasicSelect";
import { Status } from "src/types/Lot";
import axios from "axios";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const CreateLotCard = () => {

  const handleCreateLot = async (
    name: string,
    price: number,
    image: File | undefined,
    description: string,
    timeStart: string,
    timeEnd: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("initial_price", price.toString());
      if (image) {
        formData.append("image", image, image.name);
      }
      formData.append("status", "active");
      formData.append("bidding_start_time", timeStart);
      formData.append("bidding_end_time", timeEnd);
      formData.append("description", description);
  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/lots/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };



  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [timeStart, setTimeStart] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h4">Create Lot</Typography>
        <FormControl>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setImage(e.target.files![0]);
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
        <Button sx={{ fontSize: 16 }} onClick={() => {handleCreateLot(name, price, image!, description, timeStart, timeEnd)}}>create</Button>
        </FormControl>
      </Card>
    </Box>
  );
};

export default CreateLotCard;
