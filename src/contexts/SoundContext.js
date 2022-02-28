import { createContext, useState, useEffect } from "react";
import useSound from "use-sound";

export const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [isSoundOn, setIsSoundOn] = useState(true);

    const [playAnswer] = useSound('/sounds/switch.flac');
    const [playSwitch] = useSound('/sounds/pop.flac');
    const [playBadScore] = useSound('/sounds/sad-trombone-bad-score.flac', { interrupt: true });
    const [playExcellentScore] = useSound('/sounds/win-excellent-score.flac', { interrupt: true });

    const sounds = {
        answer: () => { if (isSoundOn) return playAnswer() },
        switch: () => { if (isSoundOn) return playSwitch() },
        badScore: () => { if (isSoundOn) return playBadScore() },
        excellentScore: () => { if (isSoundOn) return playExcellentScore() }
    }


    return (
        <SoundContext.Provider value={sounds}>
            {children}
        </SoundContext.Provider >
    )
}