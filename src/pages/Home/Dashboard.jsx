import React, { useRef, useEffect, useState, Suspense } from "react";
import { Select } from "flowbite-react";
import { AiOutlineArrowRight, AiOutlineSearch } from "../../assets/icons";
import CharactersList from "../charactersList/charactersList";
import { useSelector } from "react-redux";
import debounce from "../../utils/useDebouncedSearch";
import { useCharactersAfterLogin } from "../../hooks/useCharacter";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../ui/layout/sidebar";
import HomeBanner from "./HomeBanner";
import TopCollection from "./TopCollection";
import TopCollectionInside from "./TopCollectionInside";
import CharactersListInside from "../CharactersList/CharacterListInside";
// import TopCollectionInside from "./TopCollectionInside";
// import CharacterListInside from "./CharacterListInside";

const Dashboard = () => {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState("");

  const { selectedTags } = useSelector((state) => state.character);

  // const [searchQuery, setsearchQuery] = useState({
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

  const { characters, totalPages } = useCharactersAfterLogin(pageSection);

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

  return (
    <div className="px-2">
      <HomeBanner />
      {/* <TopCollection /> */}
      <div className="mb-8 flex justify-between">
        <div className="search_area w-1/2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="text-2xl text-[#00a3ff]" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2.5 pl-10 rounded-full bg-white focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search..."
              required
              autoComplete="off"
              onKeyUp={(e) => searchHandler(e)}
            />
          </div>
        </div>
        <div className="select_area w-28 md:w-48">
          <Select
            required
            value={selectedValue}
            onChange={handleSelectionChange}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
      </div>
      <div className="listing_section">
        <div className="flex justify-between mb-8">
          {/* <h2 className="text-white text-3xl font-semibold">Explore Product</h2> */}
          <div>
            <Sidebar />
            <TopCollectionInside />
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <h2 className="text-white text-xl md:text-3xl font-semibold">
            Explore Free Models
          </h2>
          <Link
            to="/all-free-models-inside"
            className="text-[#a1a1a1] hover:text-[#00a3ff] uppercase font-normal text-[13px] md:text-[15px] flex items-center"
          >
            VIEW ALL <AiOutlineArrowRight />
          </Link>
        </div>
        <CharactersListInside
          characters={characters}
          totalPages={totalPages}
          pageSection={pageSection}
          setPageSection={setPageSection}
        />
      </div>
    </div>
  );
};

export default Dashboard;
