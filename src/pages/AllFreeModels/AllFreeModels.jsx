import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, TiHeart } from "../../assets/icons";

import { useState } from "react";
import Pagination from "../../utils/Pagination";
import { RoseCriptoIcon } from "../../assets/images/images";
import { useCharacters } from "../../hooks/useCharacter";

const AllFreeModelsInside = () => {
  const [pageSection, setPageSection] = useState({
    page: 1,
    limit: 3,
    tag: "",
    entity: "",
    gender: "",
    sortTag: "",
  });
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.character);

  const { characters, totalPages } = useCharacters(pageSection);
  console.log("characters: ", characters);
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
          characters?.map((character) => (
            <div
              key={character.id}
              className="listing_box p-2 bg-[#242435] relative rounded-lg"
            >
              <Link to="/character-details" state={{ id: character.id }}>
                <img
                  src={character.character_photo}
                  className="w-full h-[184px] overflow-hidden rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  alt={`Character ${character.name}`}
                />
                <div className="listing_box_cont">
                  <p className="text-[13px] font-medium text-[#00a3ff] pb-1">
                    {character.name}
                  </p>
                  <p className="text-white text-[12px] leading-[20px] pb-1">
                    {character.introduction.length > 42
                      ? character.introduction.substring(0, 42) + "..."
                      : character.introduction}
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
                  <p className="text-white text-[12px] leading-[20px]">5,000</p>
                </div>
                <TiHeart
                  className="text-[#00a3ff] hover:text-white"
                  onClick={() => {
                    handlePopularity(character.id);
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
      {characters?.length > 3 && Array.isArray(characters) ? (
        <>
          {console.log("Hello")}
          <Pagination
            totalPages={totalPages}
            pageSection={pageSection}
            setPageSection={setPageSection}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllFreeModelsInside;
