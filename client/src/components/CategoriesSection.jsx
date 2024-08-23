import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import leftIcon from "../assets/leftIcon.png";
import rightIcon from "../assets/rightIcon.png";
import Spinner from "../components/Spinner";

// Helper function to capitalize the first letter of each word
const capitalizeWords = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/categories`
        );
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`); // Navigate to a page based on category ID
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="border-secondary2 border-l-8 ">
        <span className="text-[16px] font-poppins font-semibold text-secondary2 ml-3">
          Categories
        </span>
      </h3>
      <div className="flex justify-between items-center">
        <h2 className="text-[36px] font-inter font-semibold my-3">
          Browse By Category
        </h2>
        <div className="flex gap-3">
          <button>
            <img
              src={leftIcon}
              alt="left"
              className="bg-text1 bg-opacity-40 p-2 rounded-full"
            />
          </button>
          <button>
            <img
              src={rightIcon}
              alt="right"
              className="bg-text1 bg-opacity-40 p-2 rounded-full"
            />
          </button>
        </div>
      </div>
      <div>
        {categories.length === 0 ? (
          <p>No categories available</p>
        ) : (
          <div className="grid grid-cols-6 gap-3">
            {categories.map((category) => (
              <button
                key={category._id}
                className="w-[150px] h-[150px] text-[20px] font-poppins font-bold border-2 border-opacity-30 border-button hover:border-secondary2 hover:text-text hover:bg-secondary2"
                onClick={() => handleCategoryClick(category._id)}
              >
                {capitalizeWords(category.name)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
