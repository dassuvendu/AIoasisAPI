import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Button,
  FileInput,
  Label,
  Modal,
  Radio,
  Select as SelectFlowbite,
  Textarea,
  TextInput,
  Toast,
  Tooltip,
} from "flowbite-react";
import { AiOutlineInfoCircle } from "../../assets/icons";
import { HiCheck, HiX, HiOutlineExclamationCircle } from "react-icons/hi";
import { useTagsList } from "../../hooks/useCharacter";
import { createCharacter } from "../../reducers/CharacterSlice";

const CreateCharacter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, isPaymentRequired } = useSelector(
    (state) => state.character
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [checkCharacterType, setCheckCharacterType] = useState(0);

  const { primaryTags, secondaryTags } = useTagsList();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const validateCharacterPhoto = (file) => {
    if (!file) {
      return "Character Photo is required";
    }

    const allowedFormats = ["image/png", "image/jpeg"];
    const fileType = file[0].type;

    if (!allowedFormats.includes(fileType)) {
      return "Invalid file format. Only PNG, JPG, and JPEG images are allowed.";
    }
    return null;
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("character_photo", data.character_photo[0]);
    formData.append("introduction", data.introduction);
    formData.append("visibility", data.visibility);
    // formData.append('tags', data.tags.map((x) => x.toString()).toString());
    formData.append(
      "tags",
      data.primaryTags
        // .concat(data.secondaryTags)
        .map((x) => x.toString())
        .toString()
    );
    formData.append("public_defination", data.public_defination);
    formData.append("gender", data.gender);
    formData.append("paid", parseInt(data.paid));
    formData.append("paid_url", parseInt(data.paid_url));
    formData.append("rating", data.rating);
    formData.append("scenario", data.scenario);
    formData.append("personality", data.personality);
    formData.append("example_conversation", data.example_conversation);
    formData.append("greeting", data.greeting);

    dispatch(createCharacter(formData));
    // reset();
  };

  useEffect(() => {
    if (isPaymentRequired) {
      setOpenModal(true);
      setErrorMessage(message);
    } else if (error && message) {
      setErrorMessage(message);
    } else {
      setSuccessMessage(message);
    }
  }, [message, error, isPaymentRequired]);
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue, "selectedValue");
    if (selectedValue == 1) {
      setCheckCharacterType(1);
    } else {
      setCheckCharacterType(0);
    }
  };
  return (
    <>
      <div className="create_character_wrap px-3 md:px-0 ml-0 md:ml-4">
        <h1 className="text-3xl text-[#00a3ff] font-medium mb-4">
          Create a Character
        </h1>
        <p className="text-[#acacac] font-medium pb-2">
          We do not allow the following:
        </p>
        <p className="text-[#acacac]">- Visible genital exposure</p>
        <p className="text-[#acacac]">
          - Characters under 18 or any depictions of children
        </p>
        <div className="py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Name<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm">
                  <span className="text-[#00a3ff] font-medium">
                    (3-20 characters)
                  </span>
                </p>
              </div>
              <TextInput
                placeholder="Give your character a wonderful name"
                type="text"
                sizing="md"
                {...register("name", { required: "Name is required" })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.name?.message && (
                <h6 className="text-red-500">{errors.name.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Character Photo
                </label>
                <p className="text-gray-500 text-sm">
                  The avatar can come in several formats
                  <span className="text-[#00a3ff] font-medium">
                    (png, gif, jpeg)
                  </span>{" "}
                  and should ideally be a square image
                  <span className="text-[#00a3ff] font-medium">512x512</span>.
                </p>
              </div>
              <FileInput
                label="Character Photo"
                {...register("character_photo", {
                  required: "Character Photo is required",
                  validate: validateCharacterPhoto,
                })}
              />
              {errors?.character_photo?.message && (
                <h6 className="text-red-500">
                  {errors.character_photo.message}
                </h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Introduction<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm">
                  How would your Character introduce themselves?
                </p>
                <p className="text-gray-500 text-sm">
                  This description will appear in your character's details but
                  won't affect the prompt or the character's behavior.
                </p>
                <p className="text-gray-500 text-sm flex">
                  For those considering making their character public, it's
                  advisable to fill this out.
                  <span className="text-[#00a3ff] font-medium flex">
                    (3-200 characters)
                    <Tooltip content="Tooltip content" animation="duration-500">
                      <AiOutlineInfoCircle className="text-xl" />
                    </Tooltip>
                  </span>
                </p>
              </div>
              <TextInput
                placeholder="Give your character a memorable introduction."
                type="text"
                sizing="md"
                {...register("introduction", {
                  required: "Introduction is required",
                })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.introduction?.message && (
                <h6 className="text-red-500">{errors.introduction.message}</h6>
              )}
            </div>
            {/* Primary */}
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Primary Tags
                </label>
              </div>

              {primaryTags && (
                <Controller
                  name="primaryTags[]"
                  control={control}
                  rules={{ required: "Primary Tag is required" }}
                  render={({ field, value, ref }) => (
                    <Select
                      isMulti
                      ref={ref}
                      options={primaryTags}
                      value={value}
                      onChange={(val) => {
                        field.onChange(val.map((v) => v.value));
                      }}
                    />
                  )}
                />
              )}
              {errors?.tags?.message && (
                <h6 className="text-red-500">{errors.tags.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Rating<span className="text-[#00a3ff]">*</span>
                </label>
              </div>
              <div className="flex">
                <div className="flex items-center gap-2 mb-1 mr-4">
                  <div className="flex items-center gap-2">
                    <Radio
                      className="text-[#00a3ff] focus:ring-[#00a3ff]"
                      id="s1"
                      name="rating"
                      value="SFW"
                      defaultChecked
                      {...register("rating")}
                    />
                    <Label htmlFor="s1" className="text-gray-500 text-sm">
                      SFW
                    </Label>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1 mr-4">
                  <div className="flex items-center gap-2">
                    <Radio
                      className="text-[#00a3ff] focus:ring-[#00a3ff]"
                      id="n1"
                      name="rating"
                      value="NSFW"
                      {...register("rating")}
                    />
                    <Label htmlFor="n1" className="text-gray-500 text-sm">
                      NSFW
                    </Label>
                  </div>
                </div>
                {errors?.rating?.message && (
                  <h6 className="text-red-500">{errors.rating.message}</h6>
                )}
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Gender<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm">
                  What is your Character’s gender?
                </p>
              </div>
              <SelectFlowbite
                {...register("gender", {
                  required: "Select one option",
                })}
              >
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non_binary">Non-binary</option>
              </SelectFlowbite>
              {errors?.gender?.message && (
                <h6 className="text-red-500">{errors.gender.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Character type<span className="text-[#00a3ff]">*</span>
                </label>
              </div>
              <SelectFlowbite
                {...register("paid", {
                  required: "Select one option",
                })}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="">Choose Character type</option>
                <option value="0">Public</option>
                <option value="1">Marketplace Exclusive</option>
              </SelectFlowbite>
              {errors?.gender?.message && (
                <h6 className="text-red-500">{errors.gender.message}</h6>
              )}
            </div>
            {checkCharacterType == 1 && (
              <div className="mb-5">
                <div className="mb-2 block">
                  <label className="text-lg font-medium text-[#acacac]">
                    Wallet Address<span className="text-[#00a3ff]">*</span>
                  </label>
                </div>
                <Textarea
                  id="paid_url"
                  placeholder="Input your wallet address (Oasis network)"
                  rows={3}
                  // {...register("payment-wallet-url", {
                  //   required: "Payment Wallet Url is required",
                  // })}
                />
                {errors?.greeting?.message && (
                  <h6 className="text-red-500">{errors.greeting.message}</h6>
                )}
              </div>
            )}
            <h2 className="text-2xl text-[#00a3ff] font-medium mb-4">
              Character Profile
            </h2>

            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Greeting<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm flex">
                  What would say to start a conversation?
                </p>
              </div>
              <Textarea
                id="comment"
                placeholder="e.g. Hello User Name, how are you today?"
                rows={3}
                {...register("greeting", { required: "Greeting is required" })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.greeting?.message && (
                <h6 className="text-red-500">{errors.greeting.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Personality<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm flex">
                  In just a few sentences, how would they describe themselves?
                </p>
              </div>
              <Textarea
                id="personality"
                placeholder="The Long Description allows you to have the Character describe themselves (traits, history, mannerisms, etc) and the kinds of things they want to talk about."
                rows={5}
                {...register("personality", {
                  required: "Personality is required",
                })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.personality?.message && (
                <h6 className="text-red-500">{errors.personality.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Scenario<span className="text-[#00a3ff]">*</span>
                </label>
                <p className="text-gray-500 text-sm flex">
                  The current circumstances and context of the conversation.
                </p>
              </div>
              <Textarea
                id="scenario"
                placeholder="Describe the environment the Character is in."
                rows={5}
                {...register("scenario", { required: "Scenario is required" })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.scenario?.message && (
                <h6 className="text-red-500">{errors.scenario.message}</h6>
              )}
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <label className="text-lg font-medium text-[#acacac]">
                  Example conversation
                </label>
                <p className="text-gray-500 text-sm flex">
                  Example conversations and information to define your
                  Character.
                  <span className="text-[#00a3ff] font-medium flex">*</span>
                </p>
              </div>
              <Textarea
                id="example_conversation"
                placeholder="Describe the environment the Character is in."
                rows={8}
                {...register("example_conversation", {
                  required: "Example Conversation is required",
                  // validate: validateConversation,
                })}
              />
              <p className="text-gray-400 text-sm">0 characters</p>
              {errors?.example_conversation?.message && (
                <h6 className="text-red-500">
                  {errors.example_conversation.message}
                </h6>
              )}
            </div>
            <Button className="create_character_btn w-full" type="submit">
              Submit
            </Button>
            {successMessage && (
              <Toast>
                <div className="p-4 mb-4 text-sm text-green-800 capitalize rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div
                  className="p-4 mb-4 text-sm text-green-800 capitalize rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">{successMessage}</span>
                </div>
              </Toast>
            )}
            {errorMessage && (
              <Toast>
                <div className="w-full p-4 mb-4 text-sm text-[#00a3ff] capitalize rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  <HiX className="h-5 w-5" />
                </div>
                <div
                  className="w-full p-4 mb-4 text-sm text-[#00a3ff] capitalize rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">{errorMessage}</span>
                </div>
              </Toast>
            )}
          </form>
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

export default CreateCharacter;
