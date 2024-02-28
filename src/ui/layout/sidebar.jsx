import React from "react";
import { Link } from "react-router-dom";
import {
  allTagIcon,
  chatMemoriesIcon,
  editoChoiseIcon,
  mostpopularIcon,
  newIcon,
  recentHitsIcon,
  trendingIcon,
} from "../../assets/images/images";
import TagsList from "../../pages/Tags/TagsList";
import {
  AiFillBulb,
  AiFillCreditCard,
  BiSolidUser,
  BsPencilFill,
} from "../../assets/icons";
import { FilterType } from "../../Constants/Constants";

const Sidebar = () => {
  const token = localStorage.getItem("userToken");

  if (token) {
    return (
      <div className="sidebar_area px-3 md:px-0">
        <ul className="flex">
          <li className="mb-0 md:mb-3 text-center">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/create-character"
            >
              Create a Character
            </Link>
          </li>
          <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/edit-character"
            >
              Edit Character
            </Link>
          </li>
          <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/profile"
            >
              My Profile
            </Link>
          </li>
          {/* <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/pricing"
            >
              Pricing
            </Link>
          </li> */}
          {/* <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/subscription-history"
            >
              Subscription History
            </Link>
          </li> */}
          <li className="mb-0 md:mb-1 ml-2">
            <div className="group">
              <Link className="relative text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full">
                All tags
              </Link>
              <TagsList />
            </div>
          </li>
          <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/dashboard"
              state={{ filter: FilterType.POPULAR }}
            >
              Most Popular
            </Link>
          </li>
          <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/dashboard"
              state={{ filter: FilterType.POPULAR }}
            >
              Trending
            </Link>
          </li>
          <li className="mb-0 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/dashboard"
              state={{ filter: FilterType.EDITERS_CHOICE }}
            >
              Editors' Choice
            </Link>
          </li>
          <li className="mb-4 md:mb-3 text-center ml-2">
            <Link
              className="text-[12px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-4 rounded-full"
              to="/"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar_area px-3 md:px-0">
        <ul className="flex">
          <li className="mb-0 md:mb-3 float-left w-auto">
            <div className="group">
              <Link className="relative text-[15px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-3 rounded-full">
                All tags
              </Link>
              <TagsList />
            </div>
          </li>
          <li className="mb-0 md:mb-6 text-center ml-2">
            <Link
              className="text-[15px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-3 rounded-full"
              to="/"
              state={{ filter: FilterType.POPULAR }}
            >
              Most Popular
            </Link>
          </li>
          <li className="mb-0 md:mb-6 text-center ml-2">
            <Link
              className="text-[15px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-3 rounded-full"
              to="/"
              state={{ filter: FilterType.POPULAR }}
            >
              Trending
            </Link>
          </li>
          <li className="mb-0 md:mb-6 text-center ml-2">
            <Link
              className="text-[15px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-3 rounded-full"
              to="/"
              state={{ filter: FilterType.EDITERS_CHOICE }}
            >
              Editors' Choice
            </Link>
          </li>
          <li className="mb-4 md:mb-6 text-center ml-2">
            <Link
              className="text-[15px] font-normal border border-[#282831] text-[#acacac] bg-transparent hover:text-[#00a2fe] hover:bg-[#212e48] text-center py-2.5 px-3 rounded-full"
              to="/"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default Sidebar;
