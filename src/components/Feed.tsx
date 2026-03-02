
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const mockPosts = [
    {
        id: '1',
        author: {
            name: 'Vercel',
            handle: '@vercel',
            avatar: 'https://images.unsplash.com/photo-1614680376593-902f74a9cb0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "¡Estamos emocionados de anunciar Next.js 15! 🚀\n\nCon pre-renderizado parcial avanzado, tiempos de compilación mejorados y un sistema de caché totalmente renovado. Revisa nuestro blog para todos los detalles.",
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        timestamp: '2h',
        likes: 4231,
        comments: 324,
        shares: 892,
    },
    {
        id: '2',
        author: {
            name: 'Alex Rivera',
            handle: '@alexrivera',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Acabo de terminar de rediseñar mi portafolio usando Tailwind CSS y Framer Motion. La nueva estética está fuertemente inspirada en productos SaaS minimalistas modernos. ¿Qué opinan?\n\n¡Estaré compartiendo las plantillas la próxima semana! 🔥",
        timestamp: '5h',
        likes: 856,
        comments: 42,
        shares: 115,
    },
    {
        id: '3',
        author: {
            name: 'Design Digest',
            handle: '@designdigest',
            avatar: 'https://images.unsplash.com/photo-1627843563095-f6e94676ec83?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Consejo de Tipografía💡: Deja de usar negro puro (#000000) para tu texto. Causa fatiga visual contra fondos blancos. \n\nIntenta usar un color pizarra oscuro (#0f172a) o carbón oscuro (#1c1c1c) para un aspecto más suave y premium.",
        timestamp: '8h',
        likes: 12054,
        comments: 890,
        shares: 4320,
    }
];

const Feed = () => {
    return (
        <div className="flex-1 w-full max-w-2xl mx-auto min-h-screen border-r border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 md:px-6 md:py-4">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                    Inicio
                </h2>
            </header>

            <CreatePost />

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
