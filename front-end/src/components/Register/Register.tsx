import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h3">Register</Typography>
        <Box className={styles["box"]}>
          <Box className={styles["column"]}>
            <TextField
              label="Username"
              itemID="username"
              variant="standard"
              required
              sx={{ fontSize: 18 }}
              onChange={(e) => {
                setUsername(e.target.value);
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
          <Button sx={{ fontSize: 16 }}>register</Button>
        </Box>
        <Box className={styles["register-box"]}>
          <Typography variant="caption">Have an account?</Typography>
          <NavLink to={`/login`}>
            <Typography variant="caption">Login here</Typography>
          </NavLink>
        </Box>
      </Card>
    </Box>
  );
};

export default Register;
