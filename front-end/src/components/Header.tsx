import React from "react";
import "../styles/Header.css";
import firstimg from "../assets/environmentalBlog.jpg";
export const Header = () => {
  return (
    <div className="header-container">
      <div className="poster">
        <h1 className="header-text">Bid It To <a href="#" id="style-2" data-replace="Win"><span>Win</span></a> It</h1>
        <p className="header-description">Looking to buy or sell items easily and securely? Look no further than our online auction app! With a user-friendly interface and advanced security measures, you can bid, buy, and sell with confidence. Join our community of savvy buyers and sellers today and turn your unwanted items into cash or find your next great deal.</p>
      </div>
      <article className="card">
        <div className="temporary_text">
          <p className="temporary_text-inside">
            Is it possible that you have been feeling a bit overlooked recently?
          </p>
        </div>
        <div className="card_content">
          <span className="card_title"></span>
          <span className="card_subtitle"></span>
          <p className="card_description">
            You have our undivided attention here!
          </p>
        </div>
      </article>
    </div>
  );
};
