import { useState, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./CreateLotCard.module.css";
import { FormControl, Grid, TextField } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import SnackBar from "../SnackBar/Snackbar";

const CreateLotCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCreateLot = async (
    name: string,
    price: number,
    image: File | undefined,
    description: string
  ) => {
    try {
      if (name !== "" && price !== 0) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("initial_price", price.toString());
        if (image) {
          formData.append("image", image, image.name);
        }
        formData.append("status", "active");
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
      } else {
        setOpen(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState<string>("");
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
                  required
                  sx={{ fontSize: 16 }}
                  onChange={(e) => {
                    setName(e.target.value);
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
                  required
                  variant="standard"
                  sx={{ fontSize: 16 }}
                  onChange={(e) => {
                    setPrice(+e.target.value);
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
          <Button
            type="submit"
            sx={{ fontSize: 16 }}
            onClick={() => {
              handleCreateLot(name, price, image!, description);
            }}
          >
            create
          </Button>
        </FormControl>
      </Card>
      <SnackBar
        setOpen={setOpen}
        open={open}
        message="Price and Name are required fields"
      />
    </Box>
  );
};

export default CreateLotCard;
