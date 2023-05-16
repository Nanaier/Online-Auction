import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./UserFavSwiper.module.css";
import { Lot } from "../../types/Lot";
import Card from "@mui/material/Card";
import { NavLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { IconButton } from "@mui/material";
import AlertDialog from "../Dialog/Dialog";

const getUserFavs = async (token: string) => {
  try {
    const responce = await axios.get("http://127.0.0.1:8000/api/favourites/", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return responce.data;
  } catch (e) {
    //console.log(e);
  }
};

const UserFavSwiper = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>();
  const [token, setToken] = useState(null);
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    const fetchUserFavs = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(token);
        const userLots = await getUserFavs(localStorage.getItem("token")!);
        setLots(userLots);
      }
    };

    fetchUserFavs();
  }, [token, lots]);

  const handleAlertDialog = async (id: number) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleDeleteFav = async (id: number) => {
    setOpen(true);
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
      setLots((prevLots) => prevLots.filter((lot) => lot.id !== id));
      return responce.data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box>
        <Box>
          <p className="featured"> YOUR FAVOURITES: </p>
        </Box>

        <Box
          className="container"
          sx={{ backgroundColor: "background.default", color: "text.primary" }}
        >
          <Box className="swiperHome">
            <Swiper
              style={{}}
              id="main"
              tag="section"
              wrapperTag="ul"
              navigation
              spaceBetween={50}
              slidesPerView={4}
            >
              {lots?.map((item) => (
                <SwiperSlide key={item.id} tag="li">
                  <Card>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <IconButton
                        sx={{
                          fontSize: 16,
                          display: "flex",
                          flexDirection: "row",
                          alignSelf: "flex-end",
                          m: "0rem 1rem",
                        }}
                        onClick={() => {
                          handleAlertDialog(item.id);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                      <Box
                        component="img"
                        className={styles["swiperImages"]}
                        src={`http://127.0.0.1:8000${item.image}`}
                      />
                      <section>{item.name}</section>
                      <section>{item.current_price} $</section>
                      <Button className="btn btn-light">
                        <NavLink
                          to={`/lots/${item.id}`}
                          className={styles["link"]}
                        >
                          Go to
                        </NavLink>
                      </Button>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
      <AlertDialog
        setOpen={setOpen}
        open={open}
        message="Are you sure you want to delete this lot from your favourites?"
        handleOpen={handleDeleteFav}
        id={idToDelete!}
      />
    </>
  );
};

export default UserFavSwiper;
