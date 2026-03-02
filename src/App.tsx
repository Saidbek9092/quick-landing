import { useState } from 'react';
import { Animation1 } from './pages/Animation1';
import { Animation2 } from './pages/Animation2';
import './index.css';

type Page = 'animation1' | 'animation2';

const App = () => {
  const [activePage, setActivePage] = useState<Page>('animation1');

  return (
    <div className="h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            QuickTicketAI
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setActivePage('animation1')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activePage === 'animation1'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Animation 1
            </button>
            <button
              onClick={() => setActivePage('animation2')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activePage === 'animation2'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Animation 2
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-14 flex-1">
        {activePage === 'animation1' ? <Animation1 /> : <Animation2 />}
      </main>
    </div>
  );
};

export default App;
