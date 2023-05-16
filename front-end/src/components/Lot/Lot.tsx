import { useState, useEffect } from "react";
import axios from "axios";
import { Lot } from "../../types/Lot";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton, LinearProgress } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import styles from "./Lot.module.css";
import { Bid } from "src/types/Bid";

const SingleLot = () => {
  const Loading = () => {
    return <LinearProgress />;
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [lot, setLot] = useState<Lot>();
  const [bids, setBids] = useState<Bid[]>([]);
  const [isFavourited, setIsFavourited] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getLot = async () => {
      const responce = await axios.get(`http://127.0.0.1:8000/api/lots/${id}`);
      setLot(responce.data);
    };
    const getBids = async () => {
      try {
        const responce1 = await axios.get(
          `http://127.0.0.1:8000/api/lots/${id}/bids/`
        );
        setBids(responce1.data);
      } catch (error) {}
    };

    const checkIfFavourited = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/lots/${id}/isFavourite/`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setIsFavourited(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getLot();
    getBids();
    checkIfFavourited();
    setLoading(false);
  }, [id]);

  const handleAddFavourite = async () => {
    if (localStorage.getItem("token")) {
      try {
        const responce = await axios.post(
          `http://127.0.0.1:8000/api/lots/${id}/favourite/`,
          {},
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsFavourited(true);
        console.log(responce.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRemoveFavourite = async () => {
    if (localStorage.getItem("token")) {
      try {
        const responce = await axios.delete(
          `http://127.0.0.1:8000/api/lots/${id}/favourite/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsFavourited(false);
        console.log(responce.data);
      } catch (e) {
        console.log(e);
      }
    }
  };

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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src={`http://127.0.0.1:8000${lot?.image}`}
              alt="qwer"
              className={styles["photoLot"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="containerDesc">
            <h1>{`${lot?.name}`}</h1>

            <h1>Current price: {`${lot?.current_price}`} $</h1>
            <p>Initial price: {`${lot?.initial_price}`} $</p>
            <p>{`${lot?.description}`}</p>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <button
                className={styles["button-30"]}
                onClick={() => {
                  alert("bid was placed!");
                }}
              >
                Place a bid
              </button>
              {!isFavourited ? (
                <IconButton onClick={handleAddFavourite}>
                  <BookmarkIcon sx={{ color: "grey" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleRemoveFavourite}>
                  <BookmarkIcon sx={{ color: "#36395A" }} />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            {bids?.map((item) => (
              <p key={item.id}> {item.price}</p>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SingleLot;
