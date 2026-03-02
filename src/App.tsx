
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightPanel from './components/RightPanel';
import { Home, Compass, Bell, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center selection:bg-blue-500/30">
      <div className="w-full max-w-7xl flex flex-col md:flex-row relative">
        <Sidebar isAdmin={isAdmin} />

        <main className="flex-1 w-full flex justify-center lg:justify-start xl:justify-center">
          <Feed isAdmin={isAdmin} />
        </main>

        <RightPanel />

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around py-3 px-4 safe-area-bottom">
          <button className="p-2 text-blue-600 group"><Home className="w-6 h-6 fill-blue-50" strokeWidth={2.5} /></button>
          <button className="p-2 text-slate-500 hover:text-blue-500"><Compass className="w-6 h-6" /></button>
          <button className="p-2 text-slate-500 hover:text-blue-500"><Bell className="w-6 h-6" /></button>
          <button className="p-2 text-slate-500 hover:text-blue-500"><Mail className="w-6 h-6" /></button>
        </div>

        {/* View Toggle */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all z-50 flex items-center gap-2"
          title={isAdmin ? 'Ver como Lector' : 'Ver como Admin'}
        >
          {isAdmin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default App;
