
import { useState } from 'react';
import { Search, TrendingUp, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';

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


    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubscribing(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubscribing(false);
            setIsSubscribed(true);
            toast('¡Gracias por suscribirte al boletín!', 'success');
            setEmail('');
        }, 1500);
    };

    return (
        <div className="hidden lg:block w-72 xl:w-80 h-screen sticky top-0 border-l border-slate-200 dark:border-slate-800 p-5 xl:p-6 overflow-y-auto">
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

            {/* Newsletter Subscription */}
            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-5 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <h2 className="font-bold text-lg">Boletín Semanal</h2>
                </div>
                {isSubscribed ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in-up">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">¡Suscripción Exitosa!</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Revisa tu bandeja de entrada pronto.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                            Recibe los mejores artículos sobre desarrollo web y tecnología directamente en tu correo. ¡Cero spam!
                        </p>
                        <form className="space-y-3" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubscribing}
                                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50 transition-all"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="w-full flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-2 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm disabled:opacity-70 disabled:cursor-not-allowed h-10"
                            >
                                {isSubscribing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    "Suscribirse"
                                )}
                            </button>
                        </form>
                    </>
                )}
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
