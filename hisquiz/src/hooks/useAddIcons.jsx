import { library } from '@fortawesome/fontawesome-svg-core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons/faVolumeXmark';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons/faGithubSquare'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons/faAnglesLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons/faAnglesRight';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

export default function useAddIcons() {
    library.add(faCircleCheck,
        faStopwatch,
        faCircleArrowLeft,
        faVolumeHigh,
        faVolumeXmark,
        faGithubSquare,
        faGithub,
        faAngleLeft,
        faAnglesLeft,
        faAngleRight,
        faAnglesRight,
        faMagnifyingGlass,
        faCopy,
        faCheck,
        faLock,
        faXmark
    );
}