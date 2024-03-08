import { Button, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskIcon } from "../assets/images/images";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import {
  getCharacterById,
  transferCharacter,
} from "../reducers/CharacterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";

const PaymentFirst = ({
  openPaymentModal,
  setOpenPaymentModal,
  extraField,
  id,
}) => {
  const location = useLocation();

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
    // handleSubmit,
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
  // const handleTransfer = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (!sdk || !sdk.utils) {
  //       throw new Error("SDK or SDK utils are not available");
  //     }
  //     // Convert the amount to the appropriate units (e.g., Wei)
  //     // const amountInWei = sdk?.utils.toWei(amount.toString(), "ether");

  //     // // Send the transaction
  //     // const tx = await sdk?.sendTransaction({
  //     //   to: recipient,
  //     //   value: amountInWei,
  //     // });

  //     // // Wait for the transaction to be mined
  //     // await tx?.wait();

  //     console.log("Transaction successful:", tx);
  //     // Optionally update UI or show success message
  //   } catch (err) {
  //     console.error("Transaction failed:", err);
  //     // Optionally handle error and show error message
  //   }
  // };

  // Prompt users to connect to MetaMask

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
  };

  // const handleConnect = async () => {
  //   let accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   updateWallet(accounts);
  // };

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

  // const onSubmit = (data) => {
  //   data["character_id"] = id;
  //   dispatch(transferCharacter(data)).then((response) => {
  //     console.log("Transfer Character response: ", response?.payload);
  //     if (response?.payload?.status_code === 200) {
  //       navigate("/owned-character");
  //     } else {
  //       navigate("/character-details");
  //     }
  //   });
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     // Ensure the user is connected to MetaMask
  //     if (!connected || !sdk) {
  //       throw new Error("Not connected to MetaMask");
  //     }
  //     if (!sdk.utils || typeof sdk.utils.toWei !== "function") {
  //       throw new Error("SDK utils not available");
  //     }
  //     // Retrieve recipient address and amount from form data
  //     const { recipient, amount } = data;

  //     // Convert the amount to the appropriate units (e.g., Wei)
  //     const amountInWei = sdk.utils.toWei(amount.toString(), "ether");

  //     // Send the transaction
  //     const tx = await sdk.sendTransaction({
  //       to: recipient,
  //       value: amountInWei,
  //     });

  //     // Wait for the transaction to be mined
  //     await tx.wait();

  //     console.log("Transaction successful:", tx.hash);

  //     // Dispatch the transferCharacter action after the transaction is successful
  //     const transferResponse = dispatch(transferCharacter(data));

  //     console.log("Transfer Character response: ", transferResponse?.payload);

  //     // Check the status code and redirect accordingly
  //     if (transferResponse?.payload?.status_code === 200) {
  //       navigate("/owned-character");
  //     } else {
  //       navigate("/character-details");
  //     }
  //   } catch (err) {
  //     console.error("Transaction failed:", err);
  //     // Optionally handle error and show error message
  //     // You might want to inform the user about the failure
  //   }
  // };
  console.log("type: ", typeof window.ethereum);
  const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      // console.log("Hi");
      // const provider1 = await detectEthereumProvider();
      // if (!provider1) {
      //   throw new Error("MetaMask provider not found.");
      // }

      const demo = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("demo: ", demo);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer?.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether),
      });
      console.log({ ether, addr });
      // console.log("tx", tx);
      // setTxs([tx]);
    } catch (err) {
      console.log("something went wrong");
    }
  };

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr"),
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
            {/* <div className="space-y-6">
              <div className="first_payment_section mx-auto my-4 text-center">
                <div className="App">
                  <button
                    style={{ padding: 10, margin: 10 }}
                    onClick={connect}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                     disabled={connected}
                  >
                    Connect Your Meta Mask
                  </button>
                  {connected && (
                    <div>
                      <p>Connected chain: {chainId}</p>
                      <p>Connected account: {account}</p>
                    </div>
                  )}
                </div>
                commented
                 <div>
                  Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
                </div> 
                 <p className="text-base text-black font-medium pb-5">
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
                )} 

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
                       value="https://chat.openai.com/c/d96bb3a1-51ad-445a-a01d-42df7f63e47c"
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
                       value={characterDetails?.details?.price}
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
            </div> */}
            <form
              className="m-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                <main className="mt-4 p-4">
                  <h1 className="text-xl font-semibold text-gray-700 text-center">
                    Send ETH payment
                  </h1>
                  <div className="">
                    <div className="my-3">
                      <input
                        type="text"
                        name="addr"
                        className="input input-bordered block w-full focus:ring focus:outline-none"
                        placeholder="Recipient Address"
                      />
                    </div>
                    <div className="my-3">
                      <input
                        name="ether"
                        type="text"
                        className="input input-bordered block w-full focus:ring focus:outline-none"
                        placeholder="Amount in ETH"
                      />
                    </div>
                  </div>
                </main>
                <footer className="p-4">
                  <button
                    type="submit"
                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                  >
                    Pay now
                  </button>
                </footer>
              </div>
            </form>
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
