import './Footer.css';

import { useElements } from '../../hooks/useElements';

export default function Footer() {
    const { displayNav } = useElements();

    return (
        <footer className='footer' style={displayNav ? {} : { display: 'none' }}>
            <h5>© HisQuiz 2024</h5>
        </footer>
    )
}