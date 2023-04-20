import React, { useState, useEffect } from "react";
import axios from "axios";
import { Lot } from "../types/Lot";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { CircularProgress, IconButton, LinearProgress, Stack } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "../styles/Lot.css";

const SingleLot = () => {
  const Loading = () => {
    return (
        <LinearProgress />
    );
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [lot, setLot] = useState<Lot>();
  useEffect(() => {
    const getLots = async () => {
      setLoading(true);
      const responce = await axios.get(`http://127.0.0.1:8000/api/lots/${id}`);
      setLot(responce.data);
      setLoading(false);
    };
    getLots();
    
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        
        <Grid
          container
          spacing={0}
          className="container"
          sx={{
            backgroundColor: "background.default",
            color: "#36395A",
            p: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={6}>
            <img
              src={`${lot?.image}`}
              alt="qwer"
              className="photoLot"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="containerDesc">
          
            <h1>{`${lot?.name}`}</h1>
            <h1>Start price: {`${lot?.price}`} $</h1>
            <p>{`${lot?.description}`}</p>
            
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5}}>
              <button className="button-30" role="button">Place a bid</button>
              <IconButton>
                  <BookmarkIcon sx={{color:'#36395A'}} />
              </IconButton>
            </Box> 
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SingleLot;