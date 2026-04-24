import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";


const style = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1
};

export default function useOnClickConfetti() {
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, event, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback((e) => {
        makeShot(0.25, e, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, e, {
            spread: 60
        });

        makeShot(0.18, e, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, e, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, e, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    return [<ReactCanvasConfetti refConfetti={getInstance} style={style} />, fire];
}