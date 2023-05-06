import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Box className={styles["wraper"]}>
      <Card className={styles["card"]}>
        <Typography variant="h3">Login</Typography>
        <Box className={styles["box"]}>
          <Box className={styles["column"]}>
            <TextField
              label="Username"
              itemID="username"
              variant="standard"
              required
              sx={{ fontSize: 20 }}
              onChange={(e) => {
                setUsername(e.target.value);
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
          <Button sx={{ fontSize: 16 }}>login</Button>
        </Box>
        <Box className={styles["register-box"]}>
          <Typography variant="caption">Don't have an account yet?</Typography>
          <NavLink to={`/register`}>
            <Typography variant="caption">Register here</Typography>
          </NavLink>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
