import React from "react";
import MarketDiffForm from "../components/MarketDiffForm";
import NavLayout from "../layouts/NavLayout";

const MarketDiff = () => {
  return (
    <NavLayout className="">
      <div className=' bg-darkbg w-full h-60 absolute'></div>
       <div className=" bg-lightbg h-screen ">
          <MarketDiffForm />
          
        </div>
    </NavLayout>
  );
};

export default MarketDiff;