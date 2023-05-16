import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import SnackBar from "../SnackBar/Snackbar";

const Register = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
  }, [navigate]);
  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    phone_number: string
  ) => {
    if (password !== repeatPassword) {
      setOpen(true);
    } else {
      try {
        const responce = await axios.post(
          "http://127.0.0.1:8000/api/users/register/",
          {
            name: name,
            email: email,
            password: password,
            phone_number: phone_number,
          }
        );
        const { token } = responce.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h3">Register</Typography>
        <Box className={styles["box"]}>
          <FormControl>
            <Box className={styles["column"]}>
              <TextField
                label="Name"
                itemID="name"
                variant="standard"
                required
                sx={{ fontSize: 18 }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                label="Email"
                itemID="email"
                variant="standard"
                required
                sx={{ fontSize: 18 }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                label="Telephone"
                itemID="telephone"
                type="tel"
                required
                variant="standard"
                sx={{ fontSize: 18 }}
                onChange={(e) => {
                  setTelephone(e.target.value);
                }}
              />
              <TextField
                label="Password"
                itemID="password"
                type="password"
                variant="standard"
                required
                sx={{ fontSize: 18 }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                label="Repeat password"
                itemID="password_repeat"
                type="password"
                required
                variant="standard"
                sx={{ fontSize: 18 }}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </Box>
            <Button
              sx={{ fontSize: 16 }}
              onClick={() => {
                handleRegister(
                  name,
                  email,
                  password,
                  repeatPassword,
                  telephone
                );
              }}
            >
              register
            </Button>
          </FormControl>
        </Box>
        <Box className={styles["register-box"]}>
          <Typography variant="caption">Have an account?</Typography>
          <NavLink to={`/login`}>
            <Typography variant="caption">Login here</Typography>
          </NavLink>
        </Box>
      </Card>
      <SnackBar
        setOpen={setOpen}
        open={open}
        message="Passwords do not match"
      />
    </Box>
  );
};

export default Register;
