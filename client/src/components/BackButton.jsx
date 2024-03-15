/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function BackButton({ destination = '/' }) {
  return (
    <div className="flex items-center text-gray-800">
      <Link to={destination}>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </Link>
    </div>
  );
}
