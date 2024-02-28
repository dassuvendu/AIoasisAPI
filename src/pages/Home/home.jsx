import React, { useRef, useEffect, useState, Suspense } from "react";
import { Select } from "flowbite-react";
import { AiOutlineArrowRight, AiOutlineSearch } from "../../assets/icons";
import CharactersList from "../charactersList/charactersList";
import { useSelector } from "react-redux";
import debounce from "../../utils/useDebouncedSearch";
import { useCharacters } from "../../hooks/useCharacter";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  imageFour,
  imageOne,
  imageThree,
  imageTwo,
} from "../../assets/images/images";
import TopCollection from "./TopCollection";
import CreateModel from "./CreateModel";
import HomeBanner from "./HomeBanner";
import Sidebar from "../../ui/layout/sidebar";

const Home = () => {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState("");

  const { selectedTags } = useSelector((state) => state.character);

  // const [searchQuery, setSearchQuery] = useState({
  //   tag: '',
  //   entity: '',
  //   gender: '',
  //   sortTag: '',
  // });

  const [pageSection, setPageSection] = useState({
    page: 1,
    limit: 10,
    tag: "",
    entity: "",
    gender: "",
    sortTag: "",
  });

  useEffect(() => {
    const filterName = location.state && location.state.filter;
    setPageSection((prevState) => ({
      ...prevState,
      sortTag: filterName || "",
    }));
  }, [location.state]);

  const { characters, totalPages } = useCharacters(pageSection);

  // Search character with tags
  useEffect(() => {
    setPageSection((prevState) => ({
      ...prevState,
      tag: selectedTags,
    }));
  }, [selectedTags]);

  // Search character
  const searchCharacterListHandler = (e) => {
    let searchValue = e?.target?.value ? e?.target?.value.trim() : "";
    setPageSection((prevState) => ({
      ...prevState,
      entity: searchValue,
    }));
  };

  // search with debounce effect
  const searchHandler = debounce((e) => searchCharacterListHandler(e));

  // Search with gender
  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setPageSection((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  // Checking if an user already logged in
  const token = !!localStorage.getItem("userToken");
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="px-2">
      <HomeBanner />
      <TopCollection />
      <div className="listing_section mb-16">
        <div className="flex justify-between mb-8">
          <h2 className="text-white text-xl md:text-3xl font-semibold">
            Explore Free Models
          </h2>
          <Link
            to="/all-free-models"
            className="text-[#a1a1a1] hover:text-[#00a3ff] uppercase font-normal text-[13px] md:text-[15px] flex items-center"
          >
            VIEW ALL <AiOutlineArrowRight />
          </Link>
        </div>
        <CharactersList
          characters={characters}
          totalPages={totalPages}
          pageSection={pageSection}
          setPageSection={setPageSection}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
        />
      </div>
      <CreateModel />
    </div>
  );
};

export default Home;
