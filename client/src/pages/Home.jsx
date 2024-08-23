import React from "react";
import heroImage from "../assets/heroImage.jpg";
import bannerImage from "../assets/bannerImage.jpg";
import CategoriesSection from "../components/CategoriesSection";
import ProductsSection from "../components/ProductsSection";
import Button from "../components/Button";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="w-[80%] mx-auto ">
      <div className="flex justify-center items-center">
        <img src={heroImage} alt="hero" className="m-10" />
      </div>
      <hr className="mt-5 mb-10 opacity-30 text-button " />
      <CategoriesSection />
      <hr className="mt-10 mb-10 opacity-30 text-button " />
      <div className="flex justify-center items-center">
        <img src={bannerImage} alt="banner" className="m-10" />
      </div>
      <hr className="mt-5 mb-10 opacity-30 text-button " />
      <ProductsSection limit={8} />
      <div className="flex justify-center items-center my-10">
        <Button text={"View All Products"} href={"/shop"} />
      </div>
      <hr className="mt-10 mb-10 opacity-30 text-button " />
      <Features />
    </div>
  );
};

export default Home;
