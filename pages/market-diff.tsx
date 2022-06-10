import React from "react";
import MarketDiffForm from "../components/MarketDiffForm";
import NavLayout from "../layouts/NavLayout";

const MarketDiff = () => {
  return (
    <NavLayout>
      
          <MarketDiffForm />
          <div className="bg-darkbg h-full w-full  -top-20" />
    </NavLayout>
  );
};

export default MarketDiff;