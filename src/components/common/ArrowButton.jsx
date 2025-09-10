import "./ArrowButton.css";
import buttonIcon from "/icon/Icon/-_.svg";

export default function ArrowButton({ text = "See all", onClick, className = "" }) {
  return (
    <button className={`arrow-button ${className}`} onClick={onClick}>
      <span className="arrow-button-text text-4">{text}</span>
      <img src={buttonIcon} alt="arrow" className="arrow-button-icon arrow-button-icon-1" />
      <img src={buttonIcon} alt="arrow" className="arrow-button-icon arrow-button-icon-2" />
    </button>
  );
}