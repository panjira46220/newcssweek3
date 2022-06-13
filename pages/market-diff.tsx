import React from "react";
import MarketDiffForm from "../components/MarketDiffForm";
import NavLayout from "../layouts/NavLayout";

const MarketDiff = () => {
  return (
    <NavLayout>
       <div className="  relative mb-14 max-h-screen">
          <MarketDiffForm />
          
        </div>
    </NavLayout>
  );
};

export default MarketDiff;