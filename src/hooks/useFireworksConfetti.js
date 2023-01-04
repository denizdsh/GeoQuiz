import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

function getAnimationSettings(originXA, originXB) {
    return {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 50,
        origin: {
            x: randomInRange(originXA, originXB),
            y: Math.random() - 0.2
        }
    };
}

export default function useFireworksConfetti() {
    const refAnimationInstance = useRef(null);
    const [intervalId, setIntervalId] = useState();

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
            refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
    }, []);

    const start = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 400));
        }
    }, [intervalId, nextTickAnimation]);

    /*
    const pause = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

    const stop = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        refAnimationInstance.current && refAnimationInstance.current.reset();
    }, [intervalId]);
    */

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);


    return [<ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />, start];
}