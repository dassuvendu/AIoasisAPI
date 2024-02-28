import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTagsList,
  setSelectedTagsList,
} from "../../reducers/CharacterSlice";
import { Button } from "flowbite-react";
import { AiFillCloseCircle, ImCancelCircle } from "../../assets/icons";

const TagsList = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.character);

  const [selectedTags, setSelectedTags] = useState("");

  // Function to handle click on a tag
  const handleTagClick = (tagId) => {
    // Update the string with the clicked tag value
    setSelectedTags((prevTags) =>
      prevTags
        ? prevTags.includes(tagId)
          ? `${prevTags}`
          : `${prevTags},${tagId}`
        : `${tagId}`
    );
  };

  // Function to unselect a tag
  const handleRemoveTag = (tagId) => {
    const previousSelectedTags = selectedTags.split(",");

    // Update the selectedTags array
    const updatedSelectedTags = previousSelectedTags.filter(
      (prevTag) => prevTag !== tagId.toString()
    );

    setSelectedTags(updatedSelectedTags.join(","));
  };

  useEffect(() => {
    dispatch(setSelectedTagsList(selectedTags));
  }, [selectedTags, dispatch]);

  useEffect(() => {
    dispatch(getTagsList());
  }, []);

  return (
    <div className="invisible h-0 group-hover:visible group-hover:h-auto">
      <ul className="mt-2 overflow-hidden absolute z-10 left-[100px] w-10/12">
        {Array.isArray(tags) && tags.length
          ? tags.map(
              (tag) =>
                tag.secondary_tag === 0 && (
                  <li
                    className="m-1 text-center float-left relative"
                    key={tag.id}
                  >
                    {selectedTags.includes(tag.id) && (
                      <button
                        className="absolute right-[-8px] top-[-5px]"
                        onClick={() => handleRemoveTag(tag.id)}
                      >
                        <AiFillCloseCircle className="mr-1 text-red-700" />
                      </button>
                    )}
                    <Link
                      className="bg-stone-800 rounded-full text-white font-medium text-xs px-3 py-2 block"
                      onClick={() => handleTagClick(tag.id)}
                    >
                      {tag.name}
                    </Link>
                  </li>
                )
            )
          : "No data found"}
      </ul>
    </div>
  );
};

export default TagsList;
