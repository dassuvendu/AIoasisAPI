import { Button, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskIcon } from "../assets/images/images";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { transferCharacter } from "../reducers/CharacterSlice";
import { useNavigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";

const PaymentFirst = ({
  openPaymentModal,
  setOpenPaymentModal,
  extraField,
  id,
}) => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  console.log("paymentExtraField: ", extraField);
  console.log("firstpayment: ", id);
  const dispatch = useDispatch();
  const { characterDetails, isLoading } = useSelector(
    (state) => state.character
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    getProvider();
  }, []);
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      console.log("Hello");
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };
  const handleTransfer = async (event) => {
    event.preventDefault();
    try {
      if (!sdk || !sdk.utils) {
        throw new Error("SDK or SDK utils are not available");
      }
      // Convert the amount to the appropriate units (e.g., Wei)
      // const amountInWei = sdk?.utils.toWei(amount.toString(), "ether");

      // // Send the transaction
      // const tx = await sdk?.sendTransaction({
      //   to: recipient,
      //   value: amountInWei,
      // });

      // // Wait for the transaction to be mined
      // await tx?.wait();

      console.log("Transaction successful:", tx);
      // Optionally update UI or show success message
    } catch (err) {
      console.error("Transaction failed:", err);
      // Optionally handle error and show error message
    }
  };

  // Prompt users to connect to MetaMask

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  const modalCloseHandler = () => {
    setOpenPaymentModal(false);
  };
  useEffect(() => {
    setValue(
      "wallet_url",
      "https://chat.openai.com/c/d96bb3a1-51ad-445a-a01d-42df7f63e47c"
    );
    setValue("price", characterDetails?.details?.price);
    console.log("price:", characterDetails?.details?.price);
  }, []);
  const onSubmit = (data) => {
    data["character_id"] = id;
    dispatch(transferCharacter(data)).then((response) => {
      console.log("Transfer Character response: ", response?.payload);
      if (response?.payload?.status_code === 200) {
        navigate("/owned-character");
      } else {
        navigate("/character-details");
      }
    });
  };
  return (
    <div>
      <Modal
        show={openPaymentModal}
        onClose={() => modalCloseHandler()}
        size="2xl"
      >
        <Modal.Header className="border-0 p-0 absolute right-1 top-1">
          &nbsp;
        </Modal.Header>
        {extraField === 0 ? (
          <Modal.Body>
            <div className="space-y-6">
              <div className="first_payment_section mx-auto my-4 text-center">
                <div className="App">
                  <button
                    style={{ padding: 10, margin: 10 }}
                    onClick={connect}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                    // disabled={connected}
                  >
                    Connect Your Meta Mask
                  </button>
                  {connected && (
                    <div>
                      <p>Connected chain: {chainId}</p>
                      <p>Connected account: {account}</p>

                      {/* <form onSubmit={onSubmit}>
                        <input
                          type="text"
                          placeholder="Recipient Address"
                          value="https://chat.openai.com/c/d96bb3a1-51ad-445a-a01d-42df7f63e47c"
                          onChange={(e) => setRecipient(e.target.value)}
                          disabled
                        />
                        <input
                          type="number"
                          placeholder="Amount (ETH)"
                          value={characterDetails?.details?.price}
                          onChange={(e) => setAmount(e.target.value)}
                          disabled
                        />
                        <button type="submit">Transfer</button>
                      </form> */}
                    </div>
                  )}
                </div>
                {/* <div>
                  Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
                </div> */}
                {/* <p className="text-base text-black font-medium pb-5">
                  Please install{" "}
                  <span className="text-[#f78419]">
                    <img
                      className="inline-block w-6"
                      src={MetaMaskIcon}
                      alt="MetaMaskIcon"
                    />{" "}
                    MetaMask
                  </span>{" "}
                  extension and pay{" "}
                  <span className="text-[#00a3ff]">30 rose crypto</span>
                </p>
                {hasProvider && (
                  <button
                    className="bg-[#00a3ff] hover:bg-[#212e48] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2 rounded-md mr-4"
                    onClick={handleConnect}
                  >
                    Connect MetaMask
                  </button>
                )}
                {wallet.accounts.length > 0 && (
                  <div>Wallet Accounts: {wallet.accounts[0]}</div>
                )} */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <div className="mb-2 block">
                      <label className="text-lg font-medium text-black">
                        Payment Url<span className="text-red-800">*</span>
                      </label>
                    </div>
                    <TextInput
                      placeholder="URL"
                      type="text"
                      sizing="md"
                      // value="https://chat.openai.com/c/d96bb3a1-51ad-445a-a01d-42df7f63e47c"
                      {...register("wallet_url", {
                        required: "url is required",
                      })}
                      disabled
                    />
                    {errors?.name?.message && (
                      <h6 className="text-red-500">{errors.url.message}</h6>
                    )}
                    <div className="mb-2 block">
                      <label className="text-lg font-medium text-black">
                        Ammount<span className="text-red-800">*</span>
                      </label>
                    </div>
                    <TextInput
                      placeholder="URL"
                      type="text"
                      sizing="md"
                      // value={characterDetails?.details?.price}
                      {...register("price", {
                        required: "price is required",
                      })}
                      disabled
                    />
                    {errors?.name?.message && (
                      <h6 className="text-red-500">{errors.url.message}</h6>
                    )}
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Pay
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <div className="space-y-6">
              <div className="first_payment_section mx-auto my-4 text-center">
                {/* <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
              </div> */}
                <p className="text-base text-black font-medium pb-5">
                  You Can Not Buy This Character This is Private
                </p>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
};

export default PaymentFirst;
