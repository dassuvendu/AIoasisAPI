import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  updateProfile,
  clearMessage,
} from "../../reducers/MyProfileSlice";
import { useForm } from "react-hook-form";
import { Toast } from "flowbite-react";

const Profile = () => {
  const dispatch = useDispatch();
  // const [userProfile,setUserProfile]=useState();
  const {
    loading,
    message,
    error,
    profile: data,
  } = useSelector((state) => state.profile);

  const [responseMessage, setResponseMessage] = useState({
    type: null,
    messageText: null,
  });

  useEffect(() => {
    dispatch(editProfile(data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (submit) => {
    let postData = {
      first_name: submit.first_name,
      email: submit.email,
      mobile: submit.mobile,
    };
    dispatch(updateProfile(postData));
  };

  useEffect(() => {
    let defaultValue = {
      first_name: data?.details?.first_name,
      email: data?.details?.email,
      mobile: data?.details?.mobile,
    };

    reset({ ...defaultValue });
  }, [data]);

  useEffect(() => {
    if (message) {
      if (error) {
        setResponseMessage({ type: "error", messageText: message });
      } else {
        setResponseMessage({ type: "success", messageText: message });
        setTimeout(() => {
          dispatch(clearMessage());
        }, 2000);
      }
    }
  }, [message, error]);

  // useEffect(()=>{
  //   if(Object.keys(profile).length){
  //     setUserProfile(profile)
  //   }
  //   console.log(userProfile)
  //   console.log("name:",userProfile?.details?.first_name);
  // },[profile]);

  // const [formData, setFormData] = useState({
  //   userName: userProfile?.details?.first_name || "",
  //   email: userProfile?.details?.email || "",
  //   phone: userProfile?.details?.mobile || "",
  //   plan: userPlan?.details?.plan?.name || "Free",
  // });

  // const onSubmit = (formData) => {
  //   dispatch(updateProfile(formData));
  // };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value });
  // };

  return (
    <div className="create_character_wrap px-3 md:px-0 ml-0 md:ml-4">
      <div className="py-8 lg:py-12">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {message && (
          <Toast>
            <div className="text-lg font-normal mb-3 py-1 rounded-lg text-center text-yellow-400 bg-red-900">
              {message}
            </div>
          </Toast>
        )}
        <div className="container mx-auto my-0">
          <div className="p-4 w-1/2 mx-auto my-0 bg-white rounded-2xl border border-[#00a3ff] shadow-xl">
            {!loading && data && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-xl font-medium mb-1"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="first_name"
                    autoComplete="off"
                    {...register("first_name", {
                      required: "Name is required",
                      maxLength: 30,
                    })}
                  />
                  {errors?.first_name?.message && (
                    <small className="text-red-600">
                      {errors.first_name.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-xl font-medium mb-1"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    autoComplete="off"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors?.email?.message && (
                    <small className="text-red-600">
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="phone"
                    className="block text-xl font-medium mb-1"
                  >
                    Mobile:
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="mobile"
                    {...register("mobile", {
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: "Only numbers are allowed",
                      },
                      required: "Mobile is required",
                    })}
                  />
                  {errors?.mobile?.message && (
                    <small className="text-red-600">
                      {errors.mobile.message}
                    </small>
                  )}
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="plan" className="block text-lg font-normal mb-1">
                    Plan:
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Free">Free</option>
                    <option value="Gold">Gold</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div> */}
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#00a3ff] text-white rounded"
                >
                  Update Profile
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
