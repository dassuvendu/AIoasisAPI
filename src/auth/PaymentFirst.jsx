import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskIcon } from "../assets/images/images";

const PaymentFirst = ({ openPaymentModal, setOpenPaymentModal }) => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    getProvider();
  }, []);

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
        <Modal.Body>
          <div className="space-y-6">
            <div className="first_payment_section mx-auto my-4 text-center">
              {/* <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
              </div> */}
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentFirst;
