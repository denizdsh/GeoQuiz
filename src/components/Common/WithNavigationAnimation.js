import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './WithNavigationAnimation.css';

export function WithNavigationAnimation({ children, locationKey }) {
    const [start, setStart] = useState(false);

    useEffect(() => setStart(true), [])

    const component = () =>
        <CSSTransition in={start} key={locationKey} classNames='slide' timeout={400}>
            {children}
        </CSSTransition>

    return (
        <TransitionGroup component={component} />
    );
}