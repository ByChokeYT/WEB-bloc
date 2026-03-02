
import { Terminal, BookOpen, Rocket, Users, Monitor, Settings, PenSquare } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: Terminal, label: 'Últimas Noticias', active: true },
        { icon: BookOpen, label: 'Tutoriales', active: false },
        { icon: Rocket, label: 'Lanzamientos', active: false },
        { icon: Users, label: 'Comunidad', active: false },
        { icon: Monitor, label: 'Mi Setup', active: false },
        { icon: Settings, label: 'Configuración', active: false },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-3 px-4 py-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">Blog BYCHOKE</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${item.active
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        <item.icon
                            className={`w-6 h-6 transition-transform duration-200 group-hover:scale-110 ${item.active ? 'fill-blue-100 dark:fill-blue-900/40' : ''
                                }`}
                            strokeWidth={item.active ? 2.5 : 2}
                        />
                        <span className="text-[1.05rem]">{item.label}</span>
                    </a>
                ))}
            </nav>

            <button
                onClick={() => document.getElementById('create-post-input')?.focus()}
                className="mt-auto flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-2xl font-semibold shadow-[0_8px_16px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
            >
                <PenSquare className="w-5 h-5" />
                <span>Escribir Artículo</span>
            </button>

            <div className="mt-6 flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
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
