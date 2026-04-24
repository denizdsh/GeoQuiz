import { useContext } from "react";
import { MultiplayerContext } from "../contexts/MultiplayerContext";

export const useMultiplayer = () => useContext(MultiplayerContext);