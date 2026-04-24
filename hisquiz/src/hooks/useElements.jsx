import { useContext } from "react";
import { ElementsContext } from "../contexts/ElementsContext";

export const useElements = () => useContext(ElementsContext);