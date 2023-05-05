import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { Grid, LinearProgress, TextField } from "@mui/material";
import { User } from "src/types/User";
import CreateLotCard from "../CreateLotCard/CreateLotCard";

const Profile = () => {
  const Loading = () => {
    return <LinearProgress />;
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: 1,
    username: "nanaier",
    first_name: "anastasiia",
    last_name: "lysenko",
    email: "nanaier@gmail.com",
    is_staff: true,
    is_active: true,
    phone_number: "123456789",
    balance: 120,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={0}
          className={styles["container"]}
          sx={{
            backgroundColor: "background.default",
            color: "#36395A",
            p: 5,
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={3}>
            <Box className={styles["wraper"]}>
            <Typography variant="h4">User Profile</Typography>
            <Box className={styles["wraper"]}>
              <TextField
                defaultValue={`${user.username}`}
                label="Username"
                variant="standard"
              ></TextField>
              <TextField
                defaultValue={`${user.first_name}`}
                label="First Name"
                variant="standard"
              ></TextField>
              <TextField
                defaultValue={`${user.last_name}`}
                label="Last Name"
                variant="standard"
              ></TextField>
              <TextField
                defaultValue={`${user.email}`}
                label="Email"
                variant="standard"
              ></TextField>
              <TextField
                defaultValue={`${user.phone_number}`}
                label="Phone Number"
                variant="standard"
              ></TextField>
              <Button>Update</Button>
            </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box>
              <CreateLotCard/>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
