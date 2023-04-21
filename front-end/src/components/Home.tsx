import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
import { Lot } from "../types/Lot";
import { Header } from "./Header";
import "../App.css";



SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Home = () => {
  const [lots, setLots] = useState<Lot[]>([]);
  useEffect(() => {
    const getLots = async () => {
      const responce = await axios.get("http://127.0.0.1:8000/api/lots/");
      setLots(responce.data);
    };
    getLots();
  }, []);

  
  return (
    <>
      <Header/>
      <div>
        <p className="featured">Check out the latest lots on our website:</p>
      </div>
      <Box
        className="container"
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <div className="swiperHome">
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
                    <img className="swiperImages" src={`http://127.0.0.1:8000${item.image}`} />
                    <section>{item.name}</section>
                    <section>{item.current_price} $</section>
                    <Button className="btn btn-light">
                      <NavLink to={`/lots/${item.id}`} className="link">
                        Bid now
                      </NavLink>
                    </Button>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Box>
    </>
  );
};

export default Home;
