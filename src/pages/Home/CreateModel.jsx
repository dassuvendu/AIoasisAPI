import React from "react";
import {
  createFour,
  createOne,
  createThree,
  createTwo,
  imageFour,
  imageOne,
  imageThree,
  imageTwo,
} from "../../assets/images/images";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "../../assets/icons";

const CreateModel = () => {
  return (
    <div className="top_collection_section mt-6 mb-16">
      <div className="flex justify-between mb-10 md:mb-16">
        <h2 className="text-white text-xl md:text-3xl font-semibold">
          Create and Sell your AI Models
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-4">
        <div className="bg-[rgb(30,30,42,0.6)] rounded-md p-6 cursor-pointer relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500">
          <div className="absolute right-[-15px] top-[-20px]">
            <img src={createOne} className="w-[70px]" />
          </div>
          <div className="create_box">
            <p className="text-[#acacac] uppercase text-[15px] pb-8">Step-01</p>
            <h3 className="text-white text-[20px] font-medium pb-2">
              Connect your wallet
            </h3>
            <p className="text-[#acacac] pb-6">
              Powerful features and inclusions, which makes Nuron standout,
              easily customizable and scalable.
            </p>
            <AiOutlineArrowRight className="text-[#acacac] text-[20px] mb-4" />
          </div>
        </div>
        <div className="bg-[rgb(30,30,42,0.6)] rounded-md p-6 cursor-pointer relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500">
          <div className="absolute right-[-15px] top-[-20px]">
            <img src={createTwo} className="w-16" />
          </div>
          <div className="create_box">
            <p className="text-[#acacac] uppercase text-[15px] pb-8">Step-02</p>
            <h3 className="text-white text-[20px] font-medium pb-2">
              Create your models
            </h3>
            <p className="text-[#acacac] pb-6">
              A great collection of beautiful website templates for your need.
              Choose the best suitable template.
            </p>
            <AiOutlineArrowRight className="text-[#acacac] text-[20px] mb-4" />
          </div>
        </div>
        <div className="bg-[rgb(30,30,42,0.6)] rounded-md p-6 cursor-pointer relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500">
          <div className="absolute right-[-15px] top-[-20px]">
            <img src={createThree} className="w-16" />
          </div>
          <div className="create_box">
            <p className="text-[#acacac] uppercase text-[15px] pb-8">Step-03</p>
            <h3 className="text-white text-[20px] font-medium pb-2">
              List your models
            </h3>
            <p className="text-[#acacac] pb-6">
              We've made the template fully responsive, so it looks great on all
              devices: desktop, tablets and.
            </p>
            <AiOutlineArrowRight className="text-[#acacac] text-[20px] mb-4" />
          </div>
        </div>
        <div className="bg-[rgb(30,30,42,0.6)] rounded-md p-6 cursor-pointer relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500">
          <div className="absolute right-[-15px] top-[-20px]">
            <img src={createFour} className="w-16" />
          </div>
          <div className="create_box">
            <p className="text-[#acacac] uppercase text-[15px] pb-8">Step-04</p>
            <h3 className="text-white text-[20px] font-medium pb-2">
              Sell your models
            </h3>
            <p className="text-[#acacac] pb-6">
              I throw myself down among the tall grass by the stream as I lie
              close to the earth NFT's.
            </p>
            <AiOutlineArrowRight className="text-[#acacac] text-[20px] mb-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModel;
