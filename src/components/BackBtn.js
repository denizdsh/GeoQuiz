import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ElementsContext } from "../contexts/ElementsContext";

export default function BackBtn() {
    const navigate = useNavigate();
    const { displayBackBtn } = useContext(ElementsContext);

    return (displayBackBtn &&
        <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left"
            className='back-btn' onClick={() => navigate(-1)} />
    );
}