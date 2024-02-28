import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { chatHistory, sendMessage } from "../../reducers/CharacterSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "../../assets/icons";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { logo } from "../../assets/images/images";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    response,
    history,
    isHistoryChatLoding,
    isPaymentRequired,
    error,
    message,
    currentTimeStamp,
  } = useSelector((state) => state.character);

  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const messageCounter = useRef(0);
  const bottomRef = useRef(null);

  const { id, charDetails } = location.state;

  // name and img of bot and user
  const BOT_IMG = charDetails?.character_photo;
  const PERSON_IMG = logo;
  const BOT_NAME = charDetails?.name;
  const PERSON_NAME = "You";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = useCallback((data, e) => {
    setMessages((prev) => [
      ...prev,
      {
        id: messageCounter.current++,
        name: PERSON_NAME,
        img: PERSON_IMG,
        side: "right",
        text: data.userInput,
        timestamp: formatDate(new Date()),
      },
    ]);
    // /Calling api to get bot response
    dispatch(sendMessage({ id, user_input: data.userInput, name: BOT_NAME }));
    reset();
  }, []);

  //   date
  function formatDate(date) {
    const h = ("0" + date.getHours()).slice(-2);
    const m = ("0" + date.getMinutes()).slice(-2);
    return `${h}:${m}`;
  }

  useEffect(() => {
    // Appending the bot response into messages
    if (response) {
      setMessages((prev) => [
        ...prev,
        {
          id: messageCounter.current++,
          name: BOT_NAME,
          img: BOT_IMG,
          side: "left",
          text: response,
          timestamp: formatDate(new Date()),
        },
      ]);
      // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTimeStamp, response]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    dispatch(chatHistory(id));
  }, []);

  useEffect(() => {
    // Reset messages when the location changes (e.g., when navigating to another page)
    setMessages([]);
    if (history && !history?.length && !isHistoryChatLoding) {
      dispatch(sendMessage({ id, user_input: "who are you?", name: BOT_NAME }));
    } else {
      history?.map((msg) => {
        const isUserMessage = msg.identify_chat === 1;
        setMessages((prev) => [
          ...prev,
          {
            id: messageCounter.current++,
            name: isUserMessage ? PERSON_NAME : BOT_NAME,
            img: isUserMessage ? PERSON_IMG : BOT_IMG,
            side: isUserMessage ? "right" : "left",
            text: msg.chat,
            timestamp: formatDate(new Date(msg?.created_at)),
          },
        ]);
      });
    }
  }, [location.pathname, history]);

  useEffect(() => {
    if (isPaymentRequired && error) {
      setOpenModal(true);
      setErrorMessage(message);
    }
  }, [message, error, isPaymentRequired]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        <div className="py-4 flex justify-between items-center px-3 md:px-0">
          <Link to="/character-details" state={{ id: id }}>
            <FaAngleLeft className="text-4xl text-[#00a3ff] hover:text-black" />
          </Link>
          <h1 className="text-xl font-bold text-white">{charDetails?.name}</h1>
        </div>
        <div className="px-3 md:px-0">
          <section className="msger">
            {/* Display chat starts */}
            <main className="msger-chat" id="chat-section">
              {messages?.map((message, index) => (
                <div className={`msg ${message?.side}-msg`} key={index}>
                  {message?.img && (
                    <img className="msg-img" src={message?.img} />
                  )}
                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">
                        {message?.name ? message?.name : ""}
                      </div>
                      <div className="msg-info-time">
                        {message?.timestamp ? message?.timestamp : ""}
                      </div>
                    </div>
                    <div className="msg-text">{message?.text}</div>
                  </div>
                  <div ref={bottomRef} />
                </div>
              ))}
            </main>
            {/* Display chat ends */}
            {/* user sending messages */}
            <form className="msger-inputarea" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="msger-input"
                type="text"
                name="input"
                placeholder="Type your message..."
                {...register("userInput")}
              />
              <button className="msger-send-btn" id="submit-chat" type="submit">
                Send
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* Subscription Modal */}
      {setOpenModal && message && (
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {errorMessage}
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    setOpenModal(false);
                    navigate("/pricing");
                  }}
                >
                  Subscribe Now
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Chat;
