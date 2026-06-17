
import React, { useState, useEffect, useCallback } from 'react';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState<string>('');
  const [displayedMessage, setDisplayedMessage] = useState<string>('');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []); // Runs once on mount, cleans up on unmount

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    setDisplayedMessage(inputValue);
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-500 hover:scale-[1.01]">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
            即時時間與訊息展示
          </h1>
        </header>

        <section className="mb-8 text-center">
          <p className="text-slate-400 text-sm mb-2">目前時間</p>
          <div className="text-6xl font-mono font-bold text-sky-400 tracking-wider">
            {currentTime.toLocaleTimeString('zh-TW', { hour12: false })}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <label htmlFor="textInput" className="block text-sm font-medium text-slate-300 mb-1">
              輸入訊息
            </label>
            <input
              id="textInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="請在此輸入文字..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-slate-500"
            />
          </div>

          <button
            onClick={handleButtonClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 active:scale-95"
          >
            顯示輸入內容
          </button>
        </section>

        {displayedMessage && (
          <section className="mt-8 p-6 bg-slate-700 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-sky-400 mb-2">您輸入的是：</h2>
            <p className="text-slate-100 text-lg break-words">{displayedMessage}</p>
          </section>
        )}
         {!displayedMessage && (
          <section className="mt-8 p-6 bg-slate-700 rounded-lg shadow min-h-[7.5rem] flex items-center justify-center">
             <p className="text-slate-500 italic">點擊按鈕後，您輸入的內容將顯示於此。</p>
          </section>
        )}
      </div>
      <footer className="mt-12 text-center">
        <p className="text-slate-500 text-sm">
          React + TypeScript + Tailwind CSS 範例
        </p>
      </footer>
    </div>
  );
};

export default App;
