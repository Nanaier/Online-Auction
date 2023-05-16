import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import SnackBar from "../SnackBar/Snackbar";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigation("/profile");
  }, [navigation]);
  const handleLogin = async (email: string, password: string) => {
    try {
      const responce = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        { username: email, password: password }
      );
      const { token } = responce.data;
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (e) {
      setOpen(true);
      //console.log(e);
    }
  };

  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h3">Login</Typography>
        <Box className={styles["box"]}>
          <FormControl>
            <Box className={styles["column"]}>
              <TextField
                label="Username"
                itemID="username"
                variant="standard"
                required
                sx={{ fontSize: 20 }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                label="Password"
                itemID="password"
                type="password"
                variant="standard"
                required
                sx={{ fontSize: 20 }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <Button
              sx={{ fontSize: 16 }}
              onClick={() => {
                handleLogin(email, password);
              }}
            >
              login
            </Button>
          </FormControl>
        </Box>
        <Box className={styles["register-box"]}>
          <Typography variant="caption">Don't have an account yet?</Typography>
          <NavLink to={`/register`}>
            <Typography variant="caption">Register here</Typography>
          </NavLink>
        </Box>
      </Card>
      <SnackBar
        setOpen={setOpen}
        open={open}
        message="Password and username don't match "
      />
    </Box>
  );
};

export default Login;
