// import { createContext, useState } from "react";
// export const themes = createContext()
//  export function themesetter({children}){
//     const [dark, setdark] = useState(localStorage.getItem("dark") === "true");
//     // const [dark,setdark] = useState(JSON.parse(localStorage.getItem('dark')));
//     return(
//         <themes.Provider value={[dark,setdark]}>
//             {children}
//         </themes.Provider>
//     )
    
// }
import { createContext, useState } from "react";

export const themes = createContext();  // ✅ Remove default "siva"

export function Themesetter({ children }) {  // ✅ Fix props to children
    const [dark, setDark] = useState(localStorage.getItem("dark") === "true");

    return (
        <themes.Provider value={{ dark, setDark }}>
            {children} 
        </themes.Provider>
    );
}
