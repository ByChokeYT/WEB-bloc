
import { Search, TrendingUp, Users } from 'lucide-react';

interface RightPanelProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const RightPanel = ({ searchQuery, setSearchQuery }: RightPanelProps) => {
    const trendingTopics = [
        { tag: '#React19', posts: '124K' },
        { tag: '#TypeScript', posts: '45.2K' },
        { tag: '#AIAgents', posts: '89.1K' },
        { tag: '#WebPerformance', posts: '210K' },
    ];

    const suggestedUsers = [
        { name: 'Guillermo Rauch', handle: '@rauchg', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
        { name: 'Dan Abramov', handle: '@dan_abramov', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    ];

    return (
        <div className="hidden lg:block w-80 h-screen sticky top-0 border-l border-slate-200 dark:border-slate-800 p-6 overflow-y-auto">
            {/* Search */}
            <div className="relative mb-8 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/40 text-sm transition-all outline-none placeholder:text-slate-500"
                    placeholder="Buscar artículos..."
                />
            </div>

            {/* Trending Section */}
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-5 mb-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <h2 className="font-bold text-lg">Tendencias</h2>
                </div>
                <div className="space-y-4">
                    {trendingTopics.map((topic, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => setSearchQuery(topic.tag)}>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-0.5 group-hover:text-blue-500 transition-colors">Tema del Momento</p>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{topic.tag}</p>
                            <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{topic.posts} Publicaciones</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who to Follow */}
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-5">
                    <Users className="w-5 h-5 text-purple-500" />
                    <h2 className="font-bold text-lg">A quién seguir</h2>
                </div>
                <div className="space-y-5">
                    {suggestedUsers.map((user, i) => (
                        <div key={i} className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="truncate">
                                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate hover:underline cursor-pointer">{user.name}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{user.handle}</p>
                                </div>
                            </div>
                            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shrink-0">
                                Seguir
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 px-4">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    <a href="#" className="hover:underline">Términos</a>
                    <a href="#" className="hover:underline">Privacidad</a>
                    <a href="#" className="hover:underline">Cookies</a>
                    <a href="#" className="hover:underline">Anuncios</a>
                    <span>© 2026 Blog BYCHOKE</span>
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
