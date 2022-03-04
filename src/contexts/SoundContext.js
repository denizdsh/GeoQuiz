import { createContext, useState } from "react";
import useSound from "use-sound";

export const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [isSoundOn, setIsSoundOn] = useState(true);

    const [playAnswer] = useSound('/sounds/pop.flac');
    const [playSwitch] = useSound('/sounds/switch.flac');
    const [playBadScore] = useSound('/sounds/sad-trombone-bad-score.flac', { playbackRate: 1.25, interrupt: true });
    const [playExcellentScore] = useSound('/sounds/win-excellent-score.flac', { playbackRate: 1.1, interrupt: true });

    const sounds = {
        answer: () => { if (isSoundOn) return playAnswer() },
        switch: () => { if (isSoundOn) return playSwitch() },
        badScore: () => { if (isSoundOn) return playBadScore() },
        excellentScore: () => { if (isSoundOn) return playExcellentScore() },
    }

    const switchIsSoundOn = () => {
        setIsSoundOn(isSoundOn => !isSoundOn);
    }

    return (
        <SoundContext.Provider value={{ sounds, isSoundOn, switchIsSoundOn }}>
            {children}
        </SoundContext.Provider >
    )
}