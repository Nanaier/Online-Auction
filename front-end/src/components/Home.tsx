import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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





SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Home = () => {
  const [lots, setLots] = useState<Lot[]>();
  useEffect(() => {
    const getLots = async () => {
      const {data} = await axios.get(
        'https://127.0.0.1:8000/api/lots/'
      )
      setLots(data);
      
    };getLots();})

  const featured = lots!.slice(0,5);
  return (
    <Box
      className="container"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      <div className="HomeImage">
        <div className="slide-effect">
          
            <h1>
              Shop Now
              <ArrowForwardIosIcon />
            </h1>
          
        </div>
      </div>

      <div className="homeSorter">
        <h1 className="featured">Featured:</h1>
      </div>
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
          {featured.map((item) => (
            <SwiperSlide key={item.id} tag="li">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img src={item.image} style={{ listStyle: "none" }} />
                <h3 className="font-link">{item.name}</h3>
                <div>
                  <h3 className="font-link">$ {item.price}.0</h3>
                </div>
                <NavLink to={`/lots/${item.id}`} className="link1">
                  Details
                </NavLink>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Box>
  );
};

export default Home;
