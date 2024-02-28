import React, { useRef, useEffect, useState } from "react";
import { Accordion } from "flowbite-react";

const Faq = () => {
  return (
    <div className="pt-24 pb-0 md:pt-0">
      <div className="max-w-6xl mx-auto">
        <div className="mt-6 mx-6">
          <h1 className="text-2xl font-medium pb-3 text-[#00a3ff]">FAQ</h1>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title className="bg-[#048fdf] hover:bg-[#191922] text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </Accordion.Title>
              <Accordion.Content className="bg-white">
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="bg-[#048fdf] hover:bg-[#191922] text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </Accordion.Title>
              <Accordion.Content className="bg-white">
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="bg-[#048fdf] hover:bg-[#191922] text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </Accordion.Title>
              <Accordion.Content className="bg-white">
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="bg-[#048fdf] hover:bg-[#191922] text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </Accordion.Title>
              <Accordion.Content className="bg-white">
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-black text-[15px] leading-[23px] pb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
