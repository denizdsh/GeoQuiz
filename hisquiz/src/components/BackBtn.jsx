import { useNavigate } from "react-router-dom";
import { useElements } from "../hooks/useElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackBtn() {
    const navigate = useNavigate();
    const { displayBackBtn } = useElements();

    return (displayBackBtn &&
        <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left"
            className='back-btn' onClick={() => navigate(-1)} />
    );
}