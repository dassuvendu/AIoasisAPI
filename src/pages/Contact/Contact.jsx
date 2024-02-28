import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BiSolidMapPin,
  BsEnvelope,
  BsFillTelephoneFill,
} from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { contactAdmin } from "../../reducers/ContactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error } = useSelector((state) => state.contact);
  const form = useForm({
    // defaultValue:{
    //     username:"Batman",
    //     email:"",
    //     channel:"",
    // },
  });
  const onSubmit = (data) => {
    dispatch(contactAdmin(data));
    console.log("fromsubmit", data);
    new Promise((resolve, reject) => {
      dispatch(contactAdmin(data))
        .then((response) => {
          // Resolve the promise if the dispatch is successful
          if (response.payload.status && response.payload.status_code === 200) {
            toast.success(response.payload.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error(
              response.payload.message
                ? response.payload.message
                : "Something went wrong"
            );
          }

          resolve();
        })
        .catch((error) => {
          console.log("reject", error);
          // Reject the promise if there's an error with the dispatch
          reject(error);
        });
    });
  };
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    isLoading,
    isSubmitted,
    submitCount,
  } = formState;
  // console.log(isSubmitting,"isSubmitting");
  // console.log(isSubmitSuccessful,"isSubmitSuccessful");
  return (
    <div className="create_character_wrap px-3 md:px-0 ml-0 md:ml-0">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
      {/* Contact section start here */}
      <div className="py-6">
        <div className="container mx-auto my-0">
          <div className="px-6 lg:flex">
            <div
              className="w-full lg:w-2/4 pr:0 lg:pr-16"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <div>
                <h1 className="text-2xl text-[#00a3ff] font-medium mb-6">
                  Contact Info
                </h1>
                <ul>
                  {/* <li className="flex items-center mb-6">
                    <BsFillTelephoneFill className="iconcolor" size={20} />
                    <p className="pl-2 text-lg">1234567890</p>
                  </li> */}
                  <li className="flex items-center mb-6">
                    <BsEnvelope className="iconcolor" size={22} />
                    <p className="pl-2 text-lg text-white">
                      support@aioasis.com
                    </p>
                  </li>
                  {/* <li className="items-start mb-4">
                    <BiSolidMapPin className="iconcolor float-left" size={22} />
                    <p className="pl-8 text-lg">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </li> */}
                </ul>
              </div>
            </div>
            <div
              className="w-full lg:w-2/4"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              <h2 className="text-2xl text-[#00a3ff] font-medium mb-6">
                Contact Us
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <input
                    type="text"
                    className="w-full h-12 px-5 mb-3 text-base text-gray-900 border border-solid rounded-full border-slate-400"
                    placeholder="Full Name"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    className="w-full h-12 px-5 mb-3 text-base text-gray-900 border border-solid rounded-full border-slate-400"
                    placeholder="Email Address"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full h-12 px-5 mb-3 text-base text-gray-900 border border-solid rounded-full border-slate-400"
                    placeholder="Phone"
                    id="Phone"
                    {...register("Phone", {})}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full h-12 px-5 mb-3 text-base text-gray-900 border border-solid rounded-full border-slate-400"
                    placeholder="Subject"
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                </div>
                {errors.subject && (
                  <p className="text-red-400">{errors.subject.message}</p>
                )}
                <div>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 mb-3 rounded-3xl border border-slate-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Message"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400">{errors.message.message}</p>
                  )}
                </div>
                <button
                  disabled={!isDirty}
                  type="submit"
                  className="create_character_btn w-full mb-0 text-sm text-white uppercase rounded-full h-11 "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Contact section ends here */}
    </div>
  );
};

export default Contact;
