import React, { useRef, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Button, Modal, Label, TextInput } from "flowbite-react";
import logo from "../../assets/imagesource/logo.png";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  FaFacebookF,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
  FaInstagramSquare,
  PiDiscordLogoFill,
  AiOutlineGoogle,
  FaXTwitter,
  SiLinktree,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/AuthSlice";
import Login from "../../auth/login";
import { editProfile } from "../../reducers/MyProfileSlice";
import { DextoolsIcon, UniswapIcon } from "../../assets/images/images";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const { profile } = useSelector((state) => state.profile);

  const loginHandler = () => {
    setOpenLoginModal(true);
    setOpenRegisterModal(false);
  };

  const token = !!localStorage.getItem("userToken");

  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const handleMenuItemClick = (menuItem, flag = null) => {
    setActiveMenuItem(menuItem);
    console.log("nenuItem", menuItem);
    if (flag == "blog") {
      location.href = "https://aioasis.com/blog/";
    }
  };

  // logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      dispatch(editProfile());
    }
  }, [token]);

  return (
    <>
      <div className="header_section w-full bg-[rgb(25,25,34,0.9)] border-b border-[#2b2b34] mb-20">
        <div className="pt-0 pb-0 px-3 md:px-3 md:py-2 flex max-w-6xl mx-auto">
          <div className="w-full">
            <div className="header_top flex justify-between flex-row-reverse md:flex-row xl:flex">
              <div className="hidden md:block w-1/12 md:w-2/12 lg:w-1/12">
                <Link to="/">
                  <img src={logo} className="md:w-10 lg:w-16 my-0" />
                </Link>
              </div>

              <div className="main_menu w-1/12 md:w-full lg:w-7/12">
                <Navbar fluid rounded className="bg-transparent">
                  <div className="flex md:order-2">
                    <Navbar.Toggle className="text-white p-0 bg-transparent hover:bg-transparent" />
                  </div>
                  <Navbar.Collapse className="w-80 rounded-xl border border-gray-700 md:border-0 absolute right-6 top-16 z-10 bg-white md:bg-transparent md:static px-4 pb-2 md:px-0 md:pb-0 lg:bg-transparent">
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item1"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item1")}
                        active
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item2"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item2")}
                        // to={token ? '/inside-about-us' : '/about-us'}
                        to="/about-us"
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item6"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item8")}
                        to="/tokenomics"
                      >
                        Tokenomics
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item6"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item8")}
                        to="/roadmap"
                      >
                        Roadmap
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item6"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item8")}
                        to="/faq"
                      >
                        FAQ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={
                          activeMenuItem === "item6"
                            ? "active"
                            : "text-[#acacac]"
                        }
                        onClick={() => handleMenuItemClick("item8")}
                        to="/contact"
                      >
                        Contact
                      </NavLink>
                    </li>
                  </Navbar.Collapse>
                </Navbar>
              </div>
              <div className="flex items-center justify-end w-4/5 md:w-5/12 lg:w-4/12 mt-0 lg:mt-0">
                <ul className="flex justify-end gap-1 mr-1 md:mr-4">
                  <li>
                    <Link
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-black text-sm lg:text-lg text-white flex justify-center items-center transition ease-in-out"
                      to="#"
                      target="_blank"
                    >
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#00a3ff] text-sm lg:text-lg text-white flex justify-center items-center transition ease-in-out"
                      to="#"
                      target="_blank"
                    >
                      <FaTelegramPlane />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#42e45f] text-sm lg:text-lg text-black flex justify-center items-center transition ease-in-out"
                      to="#"
                      target="_blank"
                    >
                      <SiLinktree />
                    </Link>
                  </li>
                  <li>
                    <Link className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-pink-500 text-sm lg:text-lg text-white flex justify-center items-center transition ease-in-out">
                      <img
                        src={DextoolsIcon}
                        alt="DextoolsIcon"
                        className="rounded-full"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-red-700 text-sm lg:text-lg text-white flex justify-center items-center transition ease-in-out"
                      to="#"
                      target="_blank"
                    >
                      <img
                        src={UniswapIcon}
                        alt="UniswapIcon"
                        className="rounded-full"
                      />
                    </Link>
                  </li>
                </ul>
                <ul className="flex justify-end items-center gap-1 md:ml-2">
                  {!token && (
                    <li>
                      <Button
                        onClick={loginHandler}
                        className="create_character_btn shadow-xl w-auto h-6 lg:w-auto lg:h-8 px-0 rounded-full text-sm lg:text-lg flex justify-center items-center transition ease-in-out"
                      >
                        <AiOutlineLogin className=" hover:text-white mr-1" />{" "}
                        <p className="text-[10px] md:text-[12px] lg:text-sm capitalize">
                          Login/Register
                        </p>
                      </Button>
                    </li>
                  )}
                  {token && (
                    <>
                      {profile?.details?.first_name && (
                        <li className="mr-2">
                          <p>
                            Welcome,{" "}
                            <span className="font-bold text-red-800">
                              {profile.details.first_name}
                            </span>
                          </p>
                        </li>
                      )}
                      <li>
                        <Button
                          onClick={() => handleLogout()}
                          className="create_character_btn shadow-xl w-auto h-6 lg:w-auto lg:h-8 px-0 rounded-full text-sm lg:text-lg flex justify-center items-center transition ease-in-out"
                        >
                          <AiOutlineLogout className=" hover:text-white mr-1" />
                          <p className="text-sm">Logout</p>
                        </Button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="block md:hidden w-1/12">
                <Link to="/">
                  <img src={logo} className="w-full md:w-10 lg:w-16 my-3" />
                </Link>
              </div>
            </div>
            {/* <div className="header_bottom md:mt-6 lg:mt-0">
              <h1 className="text-base md:text-3xl lg:text-6xl md:pr-20 lg:pr-40 font-medium text-black pl-3">
                Create character ai chatbot <span>with your custom story</span>
              </h1>
            </div> */}
          </div>
        </div>
        {/* Login Modal start here */}
        <Login
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      </div>
    </>
  );
};

export default Header;
