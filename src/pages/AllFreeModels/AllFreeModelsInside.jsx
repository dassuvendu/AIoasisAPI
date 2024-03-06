import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, TiHeart } from "../../assets/icons";

import { useEffect, useState } from "react";
import Pagination from "../../utils/Pagination";
import { RoseCriptoIcon } from "../../assets/images/images";
import { useCharacters } from "../../hooks/useCharacter";
import { getFreeCharacters } from "../../reducers/CharacterSlice";

const AllFreeModelsInside = () => {
  const [pageSection, setPageSection] = useState({
    page: 1,
    limit: 10,
    tag: "",
    entity: "",
    gender: "",
    sortTag: "",
  });
  const dispatch = useDispatch();
  const { isLoading, error, message, freeChars } = useSelector(
    (state) => state.character
  );
  console.log("freeCharss: ", freeChars);
  // useEffect(() => {
  //   dispatch(getFreeCharacters());
  // }, [dispatch]);
  const { characters, totalPages } = useCharacters(pageSection);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between mb-8">
        <h2 className="text-white text-xl md:text-3xl font-semibold">
          All Free Models
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-4">
        {characters?.length && Array.isArray(characters) ? (
          characters?.map((free) => (
            <div
              key={free.id}
              className="listing_box p-2 bg-[#242435] relative rounded-lg"
            >
              <Link to="/character-chat" state={{ id: free.id }}>
                <img
                  src={free.character_photo}
                  className="w-full h-[184px] overflow-hidden rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  alt={`Character ${free.name}`}
                />
                <div className="listing_box_cont">
                  <p className="text-[13px] font-medium text-[#00a3ff] pb-1">
                    {free.name}
                  </p>
                  <p className="text-white text-[12px] leading-[20px] pb-1">
                    {free.introduction.length > 42
                      ? free.introduction.substring(0, 42) + "..."
                      : free.introduction}
                  </p>
                </div>
              </Link>
              <div className="cursor-pointer flex justify-between items-center px-[5px]">
                <div className="flex items-center">
                  <img
                    src={RoseCriptoIcon}
                    alt="RoseCriptoIcon"
                    className="w-3.5 h-3.5 mr-[2px]"
                  />
                  <p className="text-white text-[12px] leading-[20px]">
                    {free.price}
                  </p>
                </div>
                <TiHeart
                  className="text-[#00a3ff] hover:text-white"
                  onClick={() => {
                    handlePopularity(free.id);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-blue-500">No data found</p>
          </div>
        )}
      </div>
      {/* {characters?.length > 10 && Array.isArray(characters) ? (
        <Pagination
          totalPages={totalPages}
          pageSection={pageSection}
          setPageSection={setPageSection}
        />
      ) : (
        ""
      )} */}
      <Pagination
        // currentPage={currentPage}
        totalPages={totalPages}
        // setCurrentPage={setCurrentPage}
        pageSection={pageSection}
        setPageSection={setPageSection}
      />
    </div>
  );
};

export default AllFreeModelsInside;
