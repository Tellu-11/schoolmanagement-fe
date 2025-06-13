"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50">
      <svg
        className="animate-spin h-20 w-20 text-gray-800 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
}
