import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  type Swiper as SwiperRef,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { Lot } from "../../types/Lot";
import { Preview } from "../Preview/Preview";
import styles from "./HomePage.module.css";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { fetchLots } from "src/redux/reducers/lot";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLots());
  }, [dispatch]);
  const lots: Lot[] = useAppSelector((state) => state.lotsReducer);
  return (
    <>
      <Preview/>
      <Box>
        <p className="featured">Check out the latest lots on our website:</p>
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
                    <Box component="img" className={styles['swiperImages']} src={`http://127.0.0.1:8000${item.image}`} />
                    <section>{item.name}</section>
                    <section>{item.current_price} $</section>
                    <Button className="btn btn-light">
                      <NavLink to={`/lots/${item.id}`} className={styles['link']}>
                        Bid now
                      </NavLink>
                    </Button>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </>
  );
};

export default Home;
