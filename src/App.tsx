import { useState } from 'react';
import { Animation1 } from './pages/Animation1';
import { Animation2 } from './pages/Animation2';
import { Animation3 } from './pages/Animation3';
import './index.css';

type Page = 'animation1' | 'animation2' | 'animation3';

const NAV_ITEMS: ReadonlyArray<{ key: Page; label: string }> = [
  { key: 'animation1', label: 'Animation 1' },
  { key: 'animation2', label: 'Animation 2' },
  { key: 'animation3', label: 'Animation 3' },
] as const;

const PageComponent: Record<Page, React.FC> = {
  animation1: Animation1,
  animation2: Animation2,
  animation3: Animation3,
};

const App = () => {
  const [activePage, setActivePage] = useState<Page>('animation1');

  const ActiveComponent = PageComponent[activePage];

  return (
    <div className="h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            QuickTicketAI
          </span>
          <div className="flex gap-1">
            {NAV_ITEMS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActivePage(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activePage === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-14 flex-1">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default App;
