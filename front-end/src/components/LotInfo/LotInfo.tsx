import { useState, useEffect } from "react";
import axios from "axios";
import { Lot } from "../../types/Lot";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";

import styles from "./LotInfo.module.css";

const LotInfo = () => {
  const Loading = () => {
    return <LinearProgress />;
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [lot, setLot] = useState<Lot>();
  const [bidNum, setBidNum] = useState<number>();

  useEffect(() => {
    setLoading(true);
    const getLot = async () => {
      const responce = await axios.get(`http://127.0.0.1:8000/api/lots/${id}`);
      setLot(responce.data);
      const bidNumResponce = await axios.get(
        `http://127.0.0.1:8000/api/lots/${id}/bids/count/`
      );
      setBidNum(bidNumResponce.data);
    };
    getLot();
    setLoading(false);
  }, [id]);

  const handleFinishBidding = async () => {
    if (localStorage.getItem("token")) {
      try {
        const responce = await axios.put(
          `http://127.0.0.1:8000/api/lots/${id}/end-bidding/`,
          {},
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
            <Grid item xs={12} sm={4}>
              <Box
                component="img"
                src={`http://127.0.0.1:8000${lot?.image}`}
                alt="qwer"
                className={styles["photoLot"]}
              />
            </Grid>

            <Grid item xs={12} sm={4} className="containerDesc">
              <h1>{`${lot?.name}`}</h1>

              <h2>Current price: {`${lot?.current_price}`} $</h2>
              <p>Initial price: {`${lot?.initial_price}`} $</p>
              <p>{`${lot?.description}`}</p>
              {bidNum && bidNum >= 1 ? (
                <h3>{`Bid number: ${bidNum}`}</h3>
              ) : (
                <h3>No bids for this lot yet</h3>
              )}
              <h2
                style={{
                  color: `${lot?.status === "active" ? "green" : "orange"}`,
                }}
              >
                Status: {`${lot?.status}`}
              </h2>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                {lot?.status === "active" &&
                bidNum !== undefined &&
                bidNum > 0 ? (
                  <button
                    className={styles["button-30"]}
                    onClick={() => {
                      handleFinishBidding();
                    }}
                  >
                    Finish bidding
                  </button>
                ) : bidNum === undefined || bidNum < 1 ? (
                  <button className={styles["button-30"]} disabled>
                    Finish bidding
                  </button>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default LotInfo;
