import { Link } from "react-router-dom";
import {
  BsChevronRight,
  BsEnvelope,
  FaInstagramSquare,
  FaTelegramPlane,
  FaTwitter,
  FaXTwitter,
  FaYoutube,
  PiDiscordLogoFill,
  SiLinktree,
} from "../../assets/icons";
import { DextoolsIcon, UniswapIcon, logo } from "../../assets/images/images";
const Footer = () => {
  const today = new Date();
  return (
    <div className="footer_container py-4 md:py-6 px-0 bg-[rgb(30,30,42,0.5)] mt-[70px]">
      <div className="footer_top_section border-b border-[#31313d] mb-6 pb-12 pt-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="md:flex">
            <div className="w-full md:w-4/12 pr-0 md:pr-10 lg:pr-20 flex justify-center items-center">
              <img src={logo} className="w-32 lg:w-40 mb-4" />
            </div>
            <div className="w-full md:w-4/12 pl-0 md:pl-20 py-4 md:py-0">
              <ul className="grid grid-cols-1 gap-1">
                <li>
                  <Link
                    to="/"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tokenomics"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    Tokenomics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roadmap"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[#ababab] hover:text-[#00a3ff] text-[14px] pb-2 flex items-center justify-center md:justify-start hover:translate-x-6 duration-700"
                  >
                    <BsChevronRight className="mr-1" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-4/12 pl-0 md:pl-10 text-center md:text-left">
              <h3 className="text-white text-xl font-semibold mb-4">
                Information
              </h3>

              <ul className="flex justify-center md:justify-start gap-1 mr-1 md:mr-4 mb-6">
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

              <div className="text-[14px] text-[#acacac] flex items-center justify-center md:justify-start">
                <BsEnvelope className="text-[#00a3ff] mr-2" />{" "}
                support@aioasis.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex text-center justify-center w-full max-w-6xl mx-auto">
        <div className="mb-1 md:mb-0">
          <ul className="md:flex items-center justify-center">
            <li className="px-2 text-[14px] text-[#acacac]">
              AI oasis © {today.getFullYear()}. All Rights Reserved.
            </li>
            <li className="text-[#30303c] hidden md:block">|</li>
            <li className="px-2">
              <Link
                to="/Terms-of-Use"
                className="text-[14px] text-[#acacac] hover:text-[#00a3ff]"
              >
                Terms
              </Link>
            </li>
            <li className="px-2">
              <Link
                to="/privacy-policy"
                className="text-[14px] text-[#acacac] hover:text-[#00a3ff]"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
