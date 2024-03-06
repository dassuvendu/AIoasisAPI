import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBuyCharacters,
  purchaseCharacter,
} from "../reducers/CharacterSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentChat = ({ openChatPaymentModel, setOpenChatPaymentModel, id }) => {
  const { purchase } = useSelector((state) => state?.character);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("id: ", id);
  const modalCloseHandler = () => {
    setOpenChatPaymentModel(false);
  };
  const handleSubmit = () => {
    dispatch(purchaseCharacter({ character_id: id }));
    setOpenChatPaymentModel(false);
    navigate("/owned-character");
  };

  return (
    <>
      <Modal
        show={openChatPaymentModel}
        onClose={() => modalCloseHandler()}
        size="2xl"
      >
        <Modal.Header className="border-0 p-0 absolute right-1 top-1">
          &nbsp;
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="first_payment_section mx-auto my-4 text-center">
              <div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PaymentChat;
