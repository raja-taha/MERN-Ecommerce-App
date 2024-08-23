import React from "react";
import heartIcon from "../assets/heartIcon.png";
import eyeIcon from "../assets/eyeIcon.png";

const Product = ({ product }) => {
  // Destructure product details
  const { name, price, image } = product;

  return (
    <div className="flex flex-col justify-between relative font-poppins border border-button border-opacity-30 rounded-lg p-4 shadow-md">
      <div>
        {image && image.url ? (
          <img
            src={image.url}
            alt={name}
            className="w-48 object-cover rounded-lg mb-4 mx-auto"
          />
        ) : (
          <div className="w-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2 flex-col m-2">
          <button className="bg-text1 bg-opacity-30 p-2 rounded-full">
            <img src={heartIcon} alt="wishlist" width={20} />
          </button>
          <button className="bg-text1 bg-opacity-30 p-2 rounded-full">
            <img src={eyeIcon} alt="view" width={20} />
          </button>
        </div>
      </div>
      <div>
        <button className="bg-button text-text w-full p-2">Add to cart</button>
        <h3 className="text-[16px] font-semibold mt-4 mb-2">{name}</h3>
        <p className="text-secondary2 text-[16px] font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Product;
