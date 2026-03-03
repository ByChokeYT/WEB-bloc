
import { Terminal, BookOpen, Rocket, Users, Monitor, Settings, PenSquare } from 'lucide-react';

interface SidebarProps {
    isAdmin?: boolean;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const Sidebar = ({ isAdmin = true, activeCategory, setActiveCategory }: SidebarProps) => {
    const navItems = [
        { icon: Terminal, label: 'Últimas Noticias' },
        { icon: BookOpen, label: 'Tutoriales' },
        { icon: Rocket, label: 'Lanzamientos' },
        { icon: Users, label: 'Comunidad' },
        { icon: Monitor, label: 'Mi Setup' },
        { icon: Settings, label: 'Configuración' },
    ];

    return (
        <div className="hidden md:flex flex-col w-56 xl:w-60 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-3 xl:p-4">
            <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">B</span>
                </div>
                <h1 className="text-base xl:text-lg font-bold tracking-tight">Blog BYCHOKE</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => {
                    const isActive = activeCategory === item.label;
                    return (
                        <a
                            key={index}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setActiveCategory(item.label); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <item.icon
                                className={`w-[18px] h-[18px] xl:w-5 xl:h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'fill-blue-100 dark:fill-blue-900/40' : ''
                                    }`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[14px] xl:text-[15px]">{item.label}</span>
                        </a>
                    );
                })}
            </nav>

            {isAdmin && (
                <button
                    onClick={() => document.getElementById('create-post-input')?.focus()}
                    className="mt-auto flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm xl:text-[15px]"
                >
                    <PenSquare className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    <span>Escribir Artículo</span>
                </button>
            )}

            <div className={`flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors ${isAdmin ? 'mt-6' : 'mt-auto'}`}>
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">BYCHOKE</p>
                    <p className="text-xs text-slate-500 truncate">@bychoke</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
