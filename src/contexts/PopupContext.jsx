import { createContext, useState, useEffect } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupsEnabled, setPopupsEnabled] = useState(
    JSON.parse(localStorage.getItem("popupsEnabled")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("popupsEnabled", JSON.stringify(popupsEnabled));
  }, [popupsEnabled]);

  const togglePopups = () => setPopupsEnabled((prev) => !prev);

  return (
    <PopupContext.Provider value={{ popupsEnabled, togglePopups }}>
      {children}
    </PopupContext.Provider>
  );
};
