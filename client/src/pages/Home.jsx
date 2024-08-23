import React from "react";
import heroImage from "../assets/heroImage.jpg";

const Home = () => {
  return (
    <div className="flex justify-end items-end">
      <img src={heroImage} alt="hero" className="mx-20 my-10" />
    </div>
  );
};

export default Home;
