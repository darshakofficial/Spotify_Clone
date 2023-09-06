import { Link } from "react-router-dom";

const TextWithHover = ({ displayText, active, redirectText, onClick }) => {
  return (
    <Link to={redirectText}>
    <div className="flex items-center justify-start cursor-pointer"
    onClick={onClick}>
      <div
        className={`${
          active ? "text-white" : "text-gray-500"
        } text-base font-semibold hover:text-white font-size-22`}
      >
        {displayText}
      </div>
    </div>
    </Link>
  );
};

export default TextWithHover;
