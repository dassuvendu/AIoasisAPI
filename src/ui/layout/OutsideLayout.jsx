/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Suspense } from "react";
import ScrollToTop from "../../pages/ScrollToTop/ScrollToTop";

const OutsideLayout = ({ children }) => {
  console.log("out ->", children);
  // // Checking if an user already logged in
  // const token = !!localStorage.getItem('userToken');
  // if (token) {
  //   return <Navigate to='/dashboard' />;
  // }
  return (
    <div className="container-fluid overflow-hidden p-0">
      <Header />
      <ScrollToTop />
      <div className="wrapper_section mb-8 pt-16 md:pt-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full">
            <Suspense fallback={"loading.."}>
              <Outlet />
              {/* {child} */}
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default OutsideLayout;
