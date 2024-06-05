import { useEffect, useState } from "react";

const useDarkSide = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const setMode = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    document.documentElement.classList.add(mode);
    document.documentElement.classList.remove(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    document.documentElement.classList.add(theme);
  }, [theme]);

  return [theme, setMode];
};

export default useDarkSide;
