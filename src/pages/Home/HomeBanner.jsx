import React from "react";
import { Carousel } from "flowbite-react";
import { bannerOne, bannerThree, bannerTwo } from "../../assets/images/images";
import { Link } from "react-router-dom";
const HomeBanner = () => {
  return (
    <div className="mt-6 mb-12 h-auto md:h-[476px] bg-[#13131d] p-3">
      <Carousel slideInterval={3000} className="slider_area">
        <div className="relative">
          <img src={bannerOne} className="w-full relative z-0 object-cover" />
          <div className="banner_cont">
            <div className="banner_cont_area">
              <div className="w-11/12 md:w-7/12 pl-12 md:pl-20">
                <h2 className="text-white font-medium text-[16px] leading-[22px] md:text-[35px] md:leading-[40px] lg:text-[45px] lg:leading-[55px] pb-2 md:pb-4">
                  The way to find any Digital content
                </h2>
                <p className="text-[#acacac] text-[12px] md:text-[16px] pb-4 md:pb-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolores expedita beatae exercitationem quasi ullam esse?
                </p>
                <div className="flex">
                  <div>
                    <Link className="bg-[#00a3ff] hover:bg-[#212e48] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-4">
                      Sign up
                    </Link>
                  </div>
                  <div>
                    <Link className="bg-[#212e48] hover:bg-[#00a3ff] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-2">
                      Create new model
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={bannerTwo} className="w-full relative z-0 object-cover" />
          <div className="banner_cont">
            <div className="banner_cont_area">
              <div className="w-11/12 md:w-7/12 pl-12 md:pl-20">
                <h2 className="text-white font-medium text-[16px] leading-[22px] md:text-[35px] md:leading-[40px] lg:text-[45px] lg:leading-[55px] pb-2 md:pb-4">
                  The way to find any Digital content
                </h2>
                <p className="text-[#acacac] text-[12px] md:text-[16px] pb-4 md:pb-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolores expedita beatae exercitationem quasi ullam esse?
                </p>
                <div className="flex">
                  <div>
                    <Link className="bg-[#00a3ff] hover:bg-[#212e48] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-4">
                      Sign up
                    </Link>
                  </div>
                  <div>
                    <Link className="bg-[#212e48] hover:bg-[#00a3ff] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-2">
                      Create new model
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={bannerThree} className="w-full relative z-0 object-cover" />
          <div className="banner_cont">
            <div className="banner_cont_area">
              <div className="w-11/12 md:w-7/12 pl-12 md:pl-20">
                <h2 className="text-white font-medium text-[16px] leading-[22px] md:text-[35px] md:leading-[40px] lg:text-[45px] lg:leading-[55px] pb-2 md:pb-4">
                  The way to find any Digital content
                </h2>
                <p className="text-[#acacac] text-[12px] md:text-[16px] pb-4 md:pb-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolores expedita beatae exercitationem quasi ullam esse?
                </p>
                <div className="flex">
                  <div>
                    <Link className="bg-[#00a3ff] hover:bg-[#212e48] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-4">
                      Sign up
                    </Link>
                  </div>
                  <div>
                    <Link className="bg-[#212e48] hover:bg-[#00a3ff] text-[12px] md:text-[16px] text-white px-3 md:px-4 lg:px-8 py-1.5 md:py-2.5 rounded-md mr-2">
                      Create new model
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;
