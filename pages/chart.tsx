import React from "react";
import ChartForm from "../components/ChartForm";
import NavLayout from "../layouts/NavLayout";

const Chart = () => {
  return (
   
    <NavLayout className="">
    <div className=' bg-darkbg w-full h-60 absolute'></div>
     <div className=" bg-lightbg h-screen ">
     <ChartForm />
        
      </div>
  </NavLayout>
  );
};

export default Chart;