import { useContext } from "react";
import { themes } from "../contexts/context";
export function useTheme(){
    const {dark,setDark} = useContext(themes);
    return {dark,setDark}
}