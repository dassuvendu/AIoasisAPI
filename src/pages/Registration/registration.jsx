/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, verifyOtp } from "../../reducers/AuthSlice";
import { Link } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { Button, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "../../assets/icons";

const Registration = ({
  openRegisterModal,
  setOpenRegisterModal,
  setOpenLoginModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otp_verified } = useSelector((state) => state.auth.currentUser);

  const {
    error: validationErrors,
    currentUser,
    loading,
  } = useSelector((state) => state?.auth);

  // const [openLoginModal, setOpenLoginModal] = useState(false);
  // const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const loginHandler = () => {
    setOpenLoginModal(true);
    setOpenRegisterModal(false);
  };

  // const registerHandler = () => {
  //   setOpenLoginModal(false);
  //   setOpenRegisterModal(true);
  // };

  // useEffect(() => {
  //   setOpenLoginModal(true);
  // }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const fullname = data.name.split(" ");
    data.first_name = fullname[0];
    data.last_name = fullname[1];

    if (currentUser && Object.keys(currentUser).length) {
      dispatch(verifyOtp(data));
      navigate("/");
      setOpenRegisterModal(false);
      // location.href = '/';
    } else {
      dispatch(registerUser(data));
    }
  }

  useEffect(() => {
    if (validationErrors != null && Object.keys(validationErrors).length) {
      Object.keys(validationErrors).forEach((fieldname) => {
        setError(fieldname, {
          type: "manual",
          message: validationErrors[fieldname][0],
        });
      });
    }
  }, [validationErrors, setError]);

  useEffect(() => {
    if (
      currentUser &&
      Object.keys(currentUser).length &&
      currentUser.otp_verified
    ) {
      navigate("/");
    }
  }, [currentUser.otp_verified]);

  return (
    <>
      {/* Register Modal start here */}
      {openRegisterModal && (
        <Modal
          show={openRegisterModal}
          size="md"
          onClose={() => setOpenRegisterModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-2xl font-bold text-black">
                Register to <span className="text-[#00a3ff]">AI oasis</span>
              </h3>
              <form
                className="flex max-w-md flex-col gap-4 text-left"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <TextInput
                    id="name"
                    type="name"
                    placeholder="Your name"
                    autoComplete="off"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: 30,
                    })}
                  />
                  {errors?.name?.message && (
                    <small className="text-red-600">
                      {errors.name.message}
                    </small>
                  )}
                </div>
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
                {/* <div>
                  <TextInput
                    id="phone"
                    placeholder="Phone"
                    type="number"
                    name="mobile"
                    {...register("mobile", {
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: "Only numbers are allowed",
                      },
                      required: "Number is required",
                    })}
                  />
                  {errors?.mobile?.message && (
                    <small className="text-red-600">
                      {errors.mobile.message}
                    </small>
                  )}
                </div> */}
                {currentUser && Object.keys(currentUser).length ? (
                  <>
                    <p className="text-sm text-red-600 mb-3">
                      You will receive your OTP code in your email.
                    </p>
                    <div className="form-group">
                      <input
                        type="text"
                        name="otp"
                        {...register("otp", {
                          required: "Otp is required",
                        })}
                        className="w-full h-12 px-5 mb-3 text-base border border-solid rounded-full border-slate-400"
                        placeholder="Enter Your OTP"
                      />
                      {errors?.otp?.message && (
                        <small className="text-red-600">
                          {errors.otp.message}
                        </small>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-[14px] py-2.5 rounded-[8px] text-white font-medium create_character_btn"
                      disabled={loading}
                    >
                      {loading ? "Wait ..." : "Submit"}
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-[14px] py-2.5 rounded-[8px] text-white font-medium create_character_btn"
                    disabled={loading}
                  >
                    {loading ? "Wait ..." : "Get OTP"}
                  </button>
                )}
              </form>
              <p className="py-4">OR</p>
              <Link className="flex justify-center items-center bg-gray-100 border border-gray-300 w-full shadow-xl py-1.5 uppercase rounded-lg text-sm font-bold hover:bg-gray-200">
                <FcGoogle className="text-3xl mr-1" />
                Google
              </Link>
              <p className="py-4 text-sm font-medium text-black">
                If you have an account, please{" "}
                <Link
                  onClick={loginHandler}
                  // to="/login"
                  className="text-[#00a3ff] hover:text-black"
                >
                  Login
                </Link>{" "}
                here.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Register Modal ends here */}
    </>
  );
};

export default Registration;
