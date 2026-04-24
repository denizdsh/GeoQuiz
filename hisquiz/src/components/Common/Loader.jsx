import './Loader.css';

export default function Loader({ className }) {
    return (
        <div className={"lds-ring " + className}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}