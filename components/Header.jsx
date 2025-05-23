
import { useContext } from "react";
import { themes } from "../contexts/context";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const {dark,setDark} = useTheme();
 // const { dark, setDark } = useContext(themes);   ✅ Correct Destructuring

  if (dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <header className={`header-container ${dark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
         <i className="fa-sharp fa-solid fa-globe"></i>
          <a href="/">  Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={() => {
          setDark(!dark); // ✅ Correct setter function usage
          localStorage.setItem("dark", !dark);
        }}>
          <i className={`fa-solid fa-${dark ? "sun" : "moon"}`} />
          &nbsp;&nbsp;{dark ? "LightMode" : "DarkMode"}
        </p>
      </div>
    </header>
  );
}
