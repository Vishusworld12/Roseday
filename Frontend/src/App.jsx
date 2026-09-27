import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { MainContextProvider } from "./context/MainContext";
const App = () => {
  return (
    <MainContextProvider>
      <Header />

      <div className="w-full lg:w-[80%] mx-auto text-white">
        <Outlet />
      </div>
    </MainContextProvider>
  );
};

export default App;