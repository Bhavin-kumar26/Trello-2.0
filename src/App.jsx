import React, { useContext, useState } from "react";
import SideBar from "./Components/SideBar";
import Main from "./Components/Main";

const App = () => {
  return (
    <div>
      <div className=" flex w-full">
        <SideBar />
        <Main />
      </div>
    </div>
  );
};

export default App;
