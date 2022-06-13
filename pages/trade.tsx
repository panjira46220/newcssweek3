import React from "react";
import Topbar from "../components/Topbar";
import TradeForm from "../components/TradeForm";
import NavLayout from "../layouts/NavLayout";

const trade = () => {
  return (
    <NavLayout className="">
    <div className=' bg-darkbg w-full h-60 absolute'></div>
     <div className=" bg-lightbg h-screen ">
        <TradeForm/>
        
      </div>
  </NavLayout>
  );
};

export default trade;