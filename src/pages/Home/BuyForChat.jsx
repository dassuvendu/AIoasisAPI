import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, TiHeart } from "../../assets/icons";
import { getBuyCharacters, popularity } from "../../reducers/CharacterSlice";
import Pagination from "../../utils/Pagination";
import { RoseCriptoIcon } from "../../assets/images/images";
import { useTopCharacters } from "../../hooks/usePaidCharacter";
const BuyForChat = () => {
  const [pageSection, setPageSection] = useState({
    page: 1,
    limit: 16,
    tag: "",
    entity: "",
    gender: "",
    sortTag: "",
  });
  const dispatch = useDispatch();
  const { isLoading, error, message, buyCharacter } = useSelector(
    (state) => state.character
  );
  const { profile } = useSelector((state) => state.profile);
  //   console.log("buyCharschat: ", buyCharacter);
  // useEffect(() => {
  //   dispatch(getBuyCharacters());
  // }, [dispatch]);

  const { paidCharacters, totalPages } = useTopCharacters(pageSection);
  console.log("Buy Chars chat: ", paidCharacters);
  const filteredPaidCharacters = paidCharacters.filter(
    (buyCharac) => buyCharac?.user_id !== profile?.details?.id
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  //   const handlePopularity = (charId) => {
  //     dispatch(popularity(charId));
  //   };

  return (
    <div className="top_collection_section mt-6 mb-16">
      <div className="flex justify-between mb-8">
        <h2 className="text-white text-xl md:text-3xl font-semibold">
          Buy For Chat Characters
        </h2>
        {/* <Link
          to="/all-top-models-inside"
          className="text-[#a1a1a1] hover:text-[#00a3ff] uppercase font-normal text-[13px] md:text-[15px] flex items-center"
        >
          VIEW ALL <AiOutlineArrowRight />
        </Link> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-4">
        {filteredPaidCharacters?.length &&
        Array.isArray(filteredPaidCharacters) ? (
          filteredPaidCharacters?.map((buyCharac) => (
            <div
              key={buyCharac.id}
              className="listing_box p-2 bg-[#242435] relative rounded-lg"
            >
              <Link to="/character-chat" state={{ id: buyCharac.id }}>
                <img
                  src={buyCharac.character_photo}
                  className="w-full h-[184px] overflow-hidden rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  alt={`Character ${buyCharac.name}`}
                />
                <div className="listing_box_cont">
                  <p className="text-[13px] font-medium text-[#00a3ff] pb-1">
                    {buyCharac.name}
                  </p>
                  <p className="text-white text-[12px] leading-[20px] pb-1">
                    {buyCharac.introduction.length > 42
                      ? buyCharac.introduction.substring(0, 42) + "..."
                      : buyCharac.introduction}
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
                    {buyCharac.price}
                  </p>
                </div>
                <TiHeart
                  className="text-[#00a3ff] hover:text-white"
                  onClick={() => {
                    handlePopularity(buyCharac.id);
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
      {/* {paidCharacters?.length > 1 && Array.isArray(paidCharacters) ? (
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
      )} */}
      <Pagination
        totalPages={totalPages}
        pageSection={pageSection}
        setPageSection={setPageSection}
      />
    </div>
  );
};

export default BuyForChat;
