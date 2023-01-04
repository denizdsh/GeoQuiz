import { useContext, } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '../Common/Switch';

import './GameOptions.css'

export default function GameOptions({ options, handlers, renderAnswersIf = true, className = '', disabled = false }) {
    const { translate } = useContext(LanguageContext);

    return (
        <article className={"game-options " + className}>
            {renderAnswersIf ?
                <article className="option-container">
                    <Switch name={"answers-option"}
                        isChecked={options.showAnswers}
                        onSwitch={handlers.switchShowAnswersHandler}
                        disabled={disabled}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-check" className='fas active green' title={translate('Show answers ON', 'misc')} />
                        <FontAwesomeIcon icon="fa-solid fa-circle-check" className='fas inactive' title={translate('Show answers OFF', 'misc')} />
                    </Switch>
                </article> : null}

            <article className="option-container" style={renderAnswersIf ? {} : { margin: 'auto' }}>
                <Switch name={"stopwatch-option"}
                    isChecked={options.showStopwatch}
                    onSwitch={handlers.switchShowStopwatchHandler}
                    disabled={disabled}>
                    <FontAwesomeIcon icon="fa-solid fa-stopwatch" className='fas active stopwatch' title={translate('Stopwatch ON', 'misc')} />
                    <FontAwesomeIcon icon="fa-solid fa-stopwatch" className='fas inactive' title={translate('Stopwatch OFF', 'misc')} />
                </Switch>
            </article>
        </article>
    )
}