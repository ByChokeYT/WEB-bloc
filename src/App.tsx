
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightPanel from './components/RightPanel';
import { Home, Compass, Bell, Settings, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Últimas Noticias');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center selection:bg-blue-500/30 overflow-x-hidden">
      <div className="w-full max-w-7xl flex flex-col md:flex-row relative">
        <Sidebar
          isAdmin={isAdmin}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <main className="flex-1 w-full flex justify-center lg:justify-start xl:justify-center">
          <Feed
            isAdmin={isAdmin}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </main>

        <RightPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around py-3 px-4 safe-area-bottom">
          {[
            { id: 'Últimas Noticias', icon: Home },
            { id: 'Tutoriales', icon: Compass },
            { id: 'Comunidad', icon: Bell },
            { id: 'Configuración', icon: Settings }
          ].map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`p-2 transition-colors flex flex-col items-center gap-1 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-blue-500'}`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'fill-blue-50 dark:fill-blue-900/30' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              </button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed bottom-[130px] right-4 md:bottom-24 md:right-8 bg-white dark:bg-slate-800 text-slate-800 dark:text-yellow-400 p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all z-50 flex items-center gap-2 border border-slate-200 dark:border-slate-700"
          title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
          {isDarkMode ? <Sun className="w-5 h-5 fill-yellow-400" /> : <Moon className="w-5 h-5 fill-slate-800" />}
        </button>

        {/* View Toggle */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all z-50 flex items-center gap-2 border border-slate-800 dark:border-slate-200"
          title={isAdmin ? 'Ver como Lector' : 'Ver como Admin'}
        >
          {isAdmin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default App;
