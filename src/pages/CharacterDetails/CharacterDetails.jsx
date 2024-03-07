import { Link, useLocation } from "react-router-dom";
import {
  FcLock,
  TiHeart,
  FcBusinessman,
  FcReadingEbook,
  FcBusinesswoman,
  AiFillWechat,
  AiFillLike,
  AiFillDislike,
  PiContactlessPaymentFill,
} from "../../assets/icons";
import { Tooltip } from "flowbite-react";
import { Accordion } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacterById, popularity } from "../../reducers/CharacterSlice";
import { convertToReadableFormat } from "../../utils/DateFormatter";
import { userFace } from "../../assets/images/images";
import PageLoader from "../../ui/layout/loader/PageLoader";
import PaymentFirst from "../../auth/PaymentFirst";
import PaymentChat from "../../auth/PaymentChat";

const CharacterDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { characterDetails, isLoading } = useSelector(
    (state) => state.character
  );
  console.log("extra field: ", characterDetails?.details?.extraField);
  console.log("Character Details: ", characterDetails?.details?.user_id);
  const { error, message, profile } = useSelector((state) => state.profile);
  console.log("user Character: ", profile?.details);
  const [charDetails, setCharDetails] = useState();

  const id = location.state.id;

  const handlePopularity = (charId) => {
    dispatch(popularity(charId));
  };

  useEffect(() => {
    dispatch(getCharacterById(id));
  }, []);

  useEffect(() => {
    if (Object.keys(characterDetails).length) {
      setCharDetails(characterDetails);
    }
  }, [characterDetails]);

  //
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openChatPaymentModel, setOpenChatPaymentModel] = useState(false);
  return (
    <div className="create_character_wrap px-3 md:px-0 ml-0 md:ml-4">
      {/* CharacterDetails section start here */}
      <div className="py-0 lg:py-0">
        <div className="container mx-auto my-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="p-4 bg-white rounded-2xl border border-[#00a3ff] shadow-xl">
              <div className="flex justify-between items-center bg-[#00a3ff] p-4 rounded-tr-lg rounded-tl-lg">
                <h2 className="text-2xl font-medium text-white">
                  {" "}
                  {charDetails?.name}
                </h2>
                <Tooltip
                  content={charDetails?.details?.popularity}
                  animation="duration-500"
                >
                  <TiHeart
                    className="text-white text-3xl"
                    onClick={() => {
                      handlePopularity(id);
                    }}
                  />
                </Tooltip>
              </div>
              <img
                src={charDetails?.photo}
                className="w-full rounded-bl-lg rounded-br-lg"
              />
              <div className="my-2">
                <div className="bg-[#eceeef] p-4 mb-2 rounded-lg">
                  <p className="text-[#00a3ff] font-medium text-base">
                    {charDetails?.details?.introduction}
                  </p>
                </div>
                <p className="text-black font-bold text-sm">
                  Created at{" "}
                  {convertToReadableFormat(charDetails?.details?.created_at)}
                </p>

                <div className="grid grid-cols-2 gap-1 my-2 lg:grid-cols-2">
                  {charDetails &&
                    charDetails?.details?.tags?.length &&
                    charDetails?.details?.tags?.map((tag, ind) => (
                      <div
                        className="flex justify-center items-center border border-[#00a3ff] text-[15px] text-center font-medium rounded-md text-[#00a3ff] py-1 bg-white hover:bg-[#e9f7ff] cursor-pointer"
                        key={`tag_id_${ind}`}
                      >
                        {tag.tag_name}
                      </div>
                    ))}
                </div>
                {characterDetails?.details?.user_id === profile?.details?.id ? (
                  <>
                    <button className="flex justify-center items-center create_character_btn w-full mb-2 text-sm text-white uppercase rounded-full h-11 ">
                      You Already Owned the Character
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      // to="/chat"
                      onClick={() => {
                        setOpenChatPaymentModel(true);
                        // setOpenChatPaymentModel(id);
                      }}
                      state={{ id: id, charDetails: charDetails?.details }}
                      className="flex justify-center items-center create_character_btn w-full mb-2 text-sm text-white uppercase rounded-full h-11 "
                    >
                      <AiFillWechat className="text-xl mr-2" />
                      Buy {charDetails?.name} for Chat
                      <FcLock className="text-xl ml-2" />
                    </button>
                    <button
                      onClick={() => {
                        setOpenPaymentModal(true);
                        // setOpenPaymentModal(characterDetails?.details?.extraField);
                      }}
                      className="flex justify-center items-center create_character_btn2 w-full mb-0 text-sm text-white uppercase rounded-full h-11 "
                    >
                      <PiContactlessPaymentFill className="text-xl mr-2" />
                      Purchase this character
                    </button>
                  </>
                )}
                {/* <button
                  // to="/chat"
                  onClick={() => {
                    setOpenChatPaymentModel(true);
                    // setOpenChatPaymentModel(id);
                  }}
                  state={{ id: id, charDetails: charDetails?.details }}
                  className="flex justify-center items-center create_character_btn w-full mb-2 text-sm text-white uppercase rounded-full h-11 "
                >
                  <AiFillWechat className="text-xl mr-2" />
                  Buy {charDetails?.name} for Chat
                  <FcLock className="text-xl ml-2" />
                </button>
                <button
                  onClick={() => {
                    setOpenPaymentModal(true);
                    // setOpenPaymentModal(characterDetails?.details?.extraField);
                  }}
                  className="flex justify-center items-center create_character_btn2 w-full mb-0 text-sm text-white uppercase rounded-full h-11 "
                >
                  <PiContactlessPaymentFill className="text-xl mr-2" />
                  Purchase this character
                </button> */}
              </div>
            </div>
            <div className="px-4">
              <div className="p-3 my-4 bg-white rounded-md shadow-xl">
                <Accordion>
                  <Accordion.Panel>
                    <Accordion.Title className="p-3 text-sm font-medium bg-[#00a3ff] text-white hover:bg-black">
                      Personality
                    </Accordion.Title>
                    <Accordion.Content className="p-3 bg-gray-700">
                      <div className="bg-gray-800 rounded-md p-3">
                        <p className="text-white">
                          {charDetails?.details?.personality}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="p-3 text-sm font-medium bg-[#00a3ff] text-white hover:bg-black">
                      Introduction
                    </Accordion.Title>
                    <Accordion.Content className="p-3 bg-gray-700">
                      <div className="bg-gray-800 rounded-md p-3">
                        <p className="text-white">
                          {charDetails?.details?.introduction}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="p-3 text-sm font-medium bg-[#00a3ff] text-white hover:bg-black">
                      Tags
                    </Accordion.Title>
                    <Accordion.Content className="p-3 bg-gray-700">
                      <div className="bg-gray-800 rounded-md p-3">
                        {/* <p className='text-center text-zinc-500 font-medium text-xs mb-0'>
                          No public chat yet.
                        </p> */}
                        <p className="text-white">
                          {charDetails?.details?.tags.map(
                            (tag, ind) =>
                              tag.secondary_tag === 0 && (
                                <p key={`tag_${ind}`}>{tag.tag_name} &nbsp; </p>
                              )
                          )}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CharacterDetails section ends here */}
      {/* PaymentFirst Modal Starts */}
      <PaymentFirst
        openPaymentModal={openPaymentModal}
        setOpenPaymentModal={setOpenPaymentModal}
        extraField={characterDetails?.details?.extraField}
        id={id}
      />{" "}
      *
      {/* <PaymentFirstDemo
        openPaymentModal={openPaymentModal}
        setOpenPaymentModal={setOpenPaymentModal}
        extraField={characterDetails?.details?.extraField}
        id={id}
      /> */}
      {/* PaymentFirst Modal Ends */}
      <PaymentChat
        openChatPaymentModel={openChatPaymentModel}
        setOpenChatPaymentModel={setOpenChatPaymentModel}
        id={id}
      />
    </div>
  );
};

export default CharacterDetails;
