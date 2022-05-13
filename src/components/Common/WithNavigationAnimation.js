import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './WithNavigationAnimation.css';

export function WithNavigationAnimation({ children, locationKey, stop = false }) {
    const [start, setStart] = useState(false);

    useEffect(() => setStart(true), [])

    const component = () =>
        <CSSTransition in={stop ? false : start} key={locationKey} classNames='slide' timeout={{ enter: 400, exit: 200 }}>
            {children}
        </CSSTransition>

    return (
        <TransitionGroup component={component} />
    );
}