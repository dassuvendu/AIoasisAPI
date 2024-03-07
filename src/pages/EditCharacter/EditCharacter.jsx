import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCharactersListByUser } from "../../reducers/CharacterSlice";
import { Button } from "flowbite-react";
import { BsPencilFill } from "../../assets/icons";

const EditCharacter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, message, userCharacterList } = useSelector(
    (state) => state.character
  );

  // const handleEditClick = (id) => {
  //   navigate('/edit-characterPage/' + id);
  // };

  useEffect(() => {
    dispatch(fetchCharactersListByUser());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {userCharacterList?.length && Array.isArray(userCharacterList)
        ? userCharacterList?.map((character) => (
            <div key={character.id}>
              <div className="listing_box bg-neutral-900 h-[295px] relative rounded-lg overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <Link to="/chat/" state={{ id: character.id }}>
                  <img
                    src={character.character_photo}
                    className="w-full"
                    alt={`Character ${character.name}`}
                  />

                  <div className="listing_box_shadow absolute">&nbsp;</div>
                  <div className="listing_box_cont absolute">
                    <p className="text-white pb-1">
                      {character.name}:{" "}
                      <span>
                        {character.introduction.length > 30
                          ? character.introduction.substring(0, 30) + "..."
                          : character.introduction}
                      </span>
                    </p>
                  </div>
                  {/* show only primary tags */}
                  <div className="absolute left-1 bottom-[55px]">
                    <div className="grid grid-cols-2 gap-1 my-2 lg:grid-cols-2">
                      {character?.tags?.length &&
                        character?.tags?.map(
                          (tag, ind) =>
                            tag.secondary_tag === 0 && (
                              <div
                                key={`tag_id_${ind}`}
                                className="flex justify-center items-center px-2 border border-red-900 text-[12px] leading-[12px] text-center font-medium rounded-md text-red-900 py-1 bg-white hover:bg-[#f6ecec] cursor-pointer"
                              >
                                {tag.tag_name}
                              </div>
                            )
                        )}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex justify-center items-center mt-2">
                {/* <Button
                  className='create_character_btn text-white shadow-xl w-auto h-6 lg:w-auto lg:h-8 px-0 rounded-full text-sm lg:text-lg flex justify-center items-center transition ease-in-out'
                  onClick={() => handleEditClick(character.id)}
                >
                  <BsPencilFill className='mr-1' />
                  Edit
                </Button> */}
                <Link
                  className="create_character_btn text-white shadow-xl w-auto h-6 lg:w-auto lg:h-8 px-2 rounded-full text-sm lg:text-lg flex justify-center items-center transition ease-in-out capitalize"
                  to={`/edit-characterPage/${character.id}`}
                >
                  <BsPencilFill className="mr-1" />
                  Edit
                </Link>
              </div>
            </div>
          ))
        : "No data found"}
    </div>
  );
};

export default EditCharacter;
