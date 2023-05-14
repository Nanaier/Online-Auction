import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./UserLotSwiper.module.css";
import { Lot } from "../../types/Lot";
import Card from "@mui/material/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";

const getUserLots = async (token: string) => {
  try {
    const responce = await axios.get("http://127.0.0.1:8000/api/users/lots", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return responce.data;
  } catch (e) {
    console.log(e);
  }
};

const UserLotSwiper = () => {
  const [token, setToken] = useState(null);
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    const fetchUserLots = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(token);
        const userLots = await getUserLots(localStorage.getItem("token")!);
        setLots(userLots);
      }
    };

    fetchUserLots();
  }, [token, lots]);

  const handleDeleteLot = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/lots/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box>
        <Box>
          <p className="featured"> YOUR LOTS: </p>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
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
                          Update
                        </NavLink>
                      </Button>
                      <Button
                        sx={{ fontSize: 16 }}
                        onClick={() => {
                          handleDeleteLot(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserLotSwiper;
