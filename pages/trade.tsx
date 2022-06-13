import React from "react";
import Topbar from "../components/Topbar";
import TradeForm from "../components/TradeForm";
import NavLayout from "../layouts/NavLayout";

const trade = () => {
  return (
    <NavLayout>
        <TradeForm/>
    </NavLayout>
  );
};

export default trade;