import { createContext, useContext, useState, useEffect } from "react";

export const LangContext = createContext();

export const useLang = () => {
  return useContext(LangContext);
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const storedLang = localStorage.getItem("lang");
    return storedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const T = (ar, en) => (lang === "ar" ? ar : en);

  return (
    <LangContext.Provider value={{ lang, setLang, T }}>
      {children}
    </LangContext.Provider>
  );
};
