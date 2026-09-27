import { createContext, useContext, useState, useEffect } from "react";
import { AxiosClient } from "../config/axiosClient";

export const mainContext = createContext({
  roses: [],
  fetchAllRoses() {},
});

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [roses, setRoses] = useState([]);

  const fetchAllRoses = async () => {
    try {
      const response = await AxiosClient.get("/rose/get-roses");

      const data = response.data;

      setRoses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRoses();
  }, []);

  return (
    <mainContext.Provider value={{ roses, fetchAllRoses }}>
      {children}
    </mainContext.Provider>
  );
};