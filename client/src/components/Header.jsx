import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart from "../assets/cartIcon.png";
import account from "../assets/userIcon.png";
import accountWhite from "../assets/userIconWhite.png";
import wishlist from "../assets/wishlistIcon.png";
import searchIcon from "../assets/searchIcon.png";
import logoutIcon from "../assets/logoutIcon.png";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Access the user data from Redux store
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);

  // Close dropdown when user logs out
  useEffect(() => {
    setDropdown(false);
  }, [user]); // Only runs when user changes (e.g., after login or logout)

  const handleProfile = () => {
    setDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="bg-button h-[40px] flex justify-center items-center font-poppins">
        <p className="text-text text-[14px]">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to={"/shop"}>
            <span className="text-text text-[14px] font-semibold underline ml-3">
              Shop Now
            </span>
          </Link>
        </p>
      </div>
      <header className="border-b-2 border-opacity-30 border-b-button h-[80px] flex items-center relative">
        <div className="w-[80%] mx-auto flex justify-between items-center">
          <Link
            to={"/"}
            className="font-inter text-[24px] font-bold tracking-wide"
          >
            Exclusive
          </Link>
          <nav className="font-poppins text-[16px] space-x-6">
            <Link to={"/"}>Home</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/about"}>About</Link>
            {user ? (
              <Link to={"/shop"}>Shop</Link>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </nav>
          <div className="flex space-x-3 items-center">
            <form className="bg-secondary flex items-center py-2 px-3 rounded-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-secondary w-[180px] text-[13px] text-text2 h-full focus:outline-none"
              />
              <button type="submit" className="pl-2">
                <img src={searchIcon} alt="search" />
              </button>
            </form>
            {user && (
              <div className="relative flex space-x-3 items-center">
                <Link to={"/user/wishlist"}>
                  <img src={wishlist} alt="wishlist" />
                </Link>
                <Link to={"/user/cart"}>
                  <img src={cart} alt="cart" />
                </Link>
                <button
                  onClick={handleProfile}
                  aria-expanded={dropdown}
                  aria-controls="dropdown-menu"
                >
                  <img src={account} alt="account" />
                </button>
                {dropdown && (
                  <div
                    id="dropdown-menu"
                    className="absolute right-0 top-full mt-2 w-[250px] bg-button bg-opacity-60 backdrop-blur-md py-3 rounded-md"
                  >
                    <Link
                      to={"/user/profile"}
                      className="flex items-center text-text p-2 hover:bg-opacity-70"
                    >
                      <img src={accountWhite} alt="profile" width={30} />
                      <span className="ml-2">Manage My Account</span>
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="flex items-center text-text p-2 hover:bg-opacity-70"
                    >
                      <img src={logoutIcon} alt="logout" width={30} />
                      <span className="ml-2">Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
