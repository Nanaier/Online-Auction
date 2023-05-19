import { useState, useEffect } from "react";
import axios from "axios";
import { Lot } from "../../types/Lot";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FormControl, TextField, Button } from "@mui/material";
import { IconButton, LinearProgress, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import styles from "./Lot.module.css";
import { Bid } from "src/types/Bid";
import { User } from "src/types/User";
import SnackBar from "../SnackBar/Snackbar";

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

const SingleLot = () => {
  const Loading = () => {
    return <LinearProgress />;
  };
  const [openMoney, setOpenMoney] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [lot, setLot] = useState<Lot>();
  const [user, setUser] = useState<User>();
  const [bids, setBids] = useState<Bid[]>([]);
  const [isFavourited, setIsFavourited] = useState<boolean>(false);
  const [bidPrice, setBidPrice] = useState<number>(lot?.current_price!);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/lots/${id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLot(response.data);

        const bidsResponse = await axios.get(
          `http://127.0.0.1:8000/api/lots/${id}/bids/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBids(bidsResponse.data);
        if (localStorage.getItem("token")) {
          const responce = await getProfileInfo(localStorage.getItem("token")!);
          setUser(responce);
        }

        if (localStorage.getItem("token")) {
          const isFavouritedResponse = await axios.get(
            `http://127.0.0.1:8000/api/lots/${id}/isFavourite/`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setIsFavourited(isFavouritedResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handlePlaceBid = async () => {
    if (localStorage.getItem("token") && user?.balance! >= bidPrice) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/lots/${id}/bids/create/`,
          { price: bidPrice },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const bidsResponse = await axios.get(
          `http://127.0.0.1:8000/api/lots/${id}/bids/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedUser = await axios.put(
          `http://127.0.0.1:8000/api/balance/withdraw/?sum=${bidPrice}`,
          {},
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (localStorage.getItem("token")) {
          const responce = await getProfileInfo(localStorage.getItem("token")!);
          setUser(responce);
        }
        setBids(bidsResponse.data);
        console.log(response.data);
        setBidPrice(lot?.current_price!);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpenMoney(true);
    }
  };

  const handleAddFavourite = async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemoveFavourite = async () => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/lots/${id}/favourite/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsFavourited(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [fetchedUserIds, setFetchedUserIds] = useState<number[]>([]);

  const getUser = async (id: number) => {
    try {
      const response = await axios.get<{ name: string }>(
        `http://127.0.0.1:8000/api/users/${id}/`
      );
      const { name } = response.data;
      setUserNames((prevUserNames) => ({ ...prevUserNames, [id]: name }));
      setFetchedUserIds((prevUserIds) => [...prevUserIds, id]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserNames = async () => {
      const promises = bids?.map((item: Bid) => {
        if (!fetchedUserIds.includes(item.bidder_id)) {
          return getUser(item.bidder_id);
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
    };

    fetchUserNames();
  }, [bids, fetchedUserIds]);

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
              <FormControl>
                <TextField
                  id="filled-number"
                  label="Bid price"
                  type="number"
                  required
                  variant="standard"
                  sx={{ fontSize: 16 }}
                  onChange={(e) => {
                    setBidPrice(+e.target.value);
                  }}
                />

                <Button onClick={handlePlaceBid}>Place a bid</Button>
              </FormControl>

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

            <Box
              sx={{
                p: "2rem 0rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[...bids]?.reverse().map((item) =>
                bids?.length >= 1 && bids[0].id === item.id ? (
                  <Typography
                    variant="body2"
                    gap={"1rem"}
                    key={item.id}
                    color={"grey"}
                  >
                    The lot was initiallly created by{" "}
                    {userNames[item.bidder_id]} with a starting price of{" "}
                    {item.price}$
                  </Typography>
                ) : bids[bids?.length - 1].id !== item.id ? (
                  <Typography variant="body2" key={item.id} color={"grey"}>
                    The bid was placed by {userNames[item.bidder_id]} with a
                    price of {item.price}$
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" key={item.id}>
                    The last bid was placed by {userNames[item.bidder_id]} with
                    a price of {item.price}$
                  </Typography>
                )
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      <SnackBar
        setOpen={setOpenMoney}
        open={openMoney}
        message="Not enough money on balance"
      />
    </>
  );
};

export default SingleLot;
