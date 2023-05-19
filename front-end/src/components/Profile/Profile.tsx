import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Grid, LinearProgress, TextField } from "@mui/material";
import { User } from "src/types/User";
import CreateLotCard from "../CreateLotCard/CreateLotCard";
import axios from "axios";
import UserLotSwiper from "../UserLotSwiper/UserLotSwiper";
import UserFavSwiper from "../UserFavSwiper/UserFavSwiper";

const getProfileInfo = async (token: string) => {
  try {
    const responce = await axios.get(
      "http://127.0.0.1:8000/api/users/profile",
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responce.data;
  } catch (e) {
    console.log(e);
  }
};

const Profile = () => {
  const LogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(undefined);
    navigate("/");
  };

  const Loading = () => {
    return <LinearProgress />;
  };

  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(token);
        const userData = await getProfileInfo(localStorage.getItem("token")!);
        setUser(userData);
        setLoading(false);
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [token, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                    defaultValue={`${user?.username}` ?? ""}
                    label="Username"
                    variant="standard"
                  ></TextField>
                  <TextField
                    defaultValue={`${user?.name}` ?? ""}
                    label="Name"
                    variant="standard"
                  ></TextField>
                  <TextField
                    defaultValue={`${user?.email}` ?? ""}
                    label="Email"
                    variant="standard"
                  ></TextField>
                  <TextField
                    defaultValue={`${user?.phone_number}` ?? ""}
                    label="Phone Number"
                    variant="standard"
                  ></TextField>
                  <TextField
                    defaultValue={`${user?.balance}` ?? ""}
                    label="Balance"
                    variant="standard"
                  ></TextField>
                  <Button onClick={LogOut}>Log out</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box>
                <CreateLotCard />
              </Box>
            </Grid>
          </Grid>
          <Box className={styles["lotsSwiper"]}>
            <UserLotSwiper />
          </Box>

          <Box className={styles["lotsSwiper"]}>
            <UserFavSwiper />
          </Box>
        </>
      )}
    </>
  );
};

export default Profile;
