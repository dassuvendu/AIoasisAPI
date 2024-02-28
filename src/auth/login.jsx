/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { AiOutlineGoogle, AiOutlineLogin, FcGoogle } from "../assets/icons";
import { login, resetAfterLoggedIn } from "../reducers/AuthSlice";
import Registration from "../pages/Registration/registration";
import { useGoogleLogin } from "@react-oauth/google";
import AgeRestrictionModal from "../pages/Registration/AgeRestrictionModal";
import PaymentFirst from "./PaymentFirst";

const Login = ({ openLoginModal, setOpenLoginModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, isLoggedIn, error, loading } = useSelector(
    (state) => state.auth
  );
  const [errorMessage, setErrorMessage] = useState(null);

  // const [openLoginModal, setOpenLoginModal] = useState(false);
  // const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openAgeRestrictionModal, setOpenAgeRestrictionModal] = useState(false);

  const registerHandler = () => {
    setOpenLoginModal(false);
    setOpenAgeRestrictionModal(true);
    // setOpenRegisterModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  // google login button
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("googleAccessToken", codeResponse.access_token);
      navigate("/google-redirect");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (error && message) {
      setErrorMessage(message);
      const timeoutId = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    } else if (isLoggedIn) {
      dispatch(resetAfterLoggedIn());
      navigate("/dashboard");
      setOpenLoginModal(false);
      //setOpenPaymentModal(true);
    }
  }, [message, error, isLoggedIn]);

  return (
    <>
      {/* Login Modal start here */}
      {openLoginModal && (
        <Modal
          show={openLoginModal}
          size="md"
          onClose={() => setOpenLoginModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <AiOutlineLogin className="mx-auto mb-4 h-14 w-14 text-gray-400" />
              <h3 className="mb-5 text-xl font-bold text-black">
                Welcome to <span className="text-[#00a3ff]">AI oasis</span>
              </h3>
              <form
                className="flex max-w-md flex-col gap-4 text-left"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <TextInput
                    id="email1"
                    type="email"
                    placeholder="Your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors?.email?.message && (
                    <h6 className="text-danger">{errors.email.message}</h6>
                  )}
                </div>
                <div>
                  <TextInput
                    id="password1"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors?.password?.message && (
                    <h6 className="text-danger">{errors.password.message}</h6>
                  )}
                </div>
                <Button className="create_character_btn w-full" type="submit">
                  Login
                </Button>
              </form>
              <p className="py-4">OR</p>
              <Link
                className="flex justify-center items-center bg-gray-100 border border-gray-300 w-full shadow-xl py-1.5 uppercase rounded-lg text-sm font-bold hover:bg-gray-200"
                onClick={() => googleLogin()}
              >
                <FcGoogle className="text-3xl mr-1" />
                Google
              </Link>
              <p className="py-4 text-sm font-medium text-black">
                If you have not an account, please{" "}
                <Link
                  onClick={registerHandler}
                  // to="/registration"
                  className="text-[#00a3ff] hover:text-black"
                >
                  Register
                </Link>{" "}
                here.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Login Modal ends here */}

      {/* Age Restriction Modal Starts */}
      <AgeRestrictionModal
        openAgeRestrictionModal={openAgeRestrictionModal}
        setOpenAgeRestrictionModal={setOpenAgeRestrictionModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      {/* Age Restriction Modal Ends */}
    </>
  );
};

export default Login;
