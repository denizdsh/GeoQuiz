import { useContext } from "react";
import { SoundContext } from "../contexts/SoundContext";

export const useSounds = () => useContext(SoundContext);