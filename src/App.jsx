import { useState, useEffect } from "react";
import EmailForm from "./components/EmailForm";

export default function App() {
  const [dark, setDark] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      {/* Dark mode toggle */}
      <button
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {dark ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.71.7a1 1 0 01-1.41-1.41l.7-.71zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM5.05 5.05a1 1 0 010 1.41l-.7.71A1 1 0 012.93 5.76l.71-.71a1 1 0 011.41 0zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zm13.66 5.66a1 1 0 01-1.41 0l-.71-.7a1 1 0 011.41-1.42l.71.71a1 1 0 010 1.41zM14 15a1 1 0 110 2h-1.5a.5.5 0 010-1H14zm-8 0a1 1 0 110 2H4.5a.5.5 0 010-1H6zm4-3a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <EmailForm />
    </>
  );
}
