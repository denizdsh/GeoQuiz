import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '../Common/Switch';
import { useTranslation } from '../../hooks/useTranslation';

import './GameOptions.css'

export default function GameOptions({ options, handlers, className = '', disabled = false }) {
    const { dict } = useTranslation();

    return (
        <article className={"game-options " + className}>
            <article className="option-container">
                <Switch name={"answers-option"}
                    isChecked={options.showAnswers}
                    onSwitch={handlers.switchShowAnswersHandler}
                    disabled={disabled}>
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" className='fas active green' title={dict.misc.SpeedrunModeTip} />
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" className='fas inactive' title={dict.misc.SpeedrunModeTip} />
                </Switch>
            </article>

            <article className="option-container">
                <Switch name={"stopwatch-option"}
                    isChecked={options.showStopwatch}
                    onSwitch={handlers.switchShowStopwatchHandler}
                    disabled={disabled}>
                    <FontAwesomeIcon icon="fa-solid fa-stopwatch" className='fas active stopwatch' title={dict.misc.StopwatchTip} />
                    <FontAwesomeIcon icon="fa-solid fa-stopwatch" className='fas inactive' title={dict.misc.StopwatchTip} />
                </Switch>
            </article>
        </article>
    )
}