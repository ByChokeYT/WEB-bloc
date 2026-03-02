
import { useState, useEffect } from 'react';
import CreatePost from './CreatePost';
import PostCard, { type Post } from './PostCard';

const initialPosts = [
    {
        id: '1',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "El nuevo compilador de React ya está disponible en beta abierta ⚛️\n\nA partir de hoy, puedes probar el React Compiler en tus proyectos. Este compilador memoiza automáticamente tus componentes, eliminando la necesidad de usar useMemo y useCallback de forma manual.\n\nInstala las dependencias y pruébalo con: \nnpm install babel-plugin-react-compiler",
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        timestamp: '2h',
        likes: 8431,
        comments: 624,
        shares: 1192,
        category: 'Lanzamientos',
    },
    {
        id: '2',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Migrando de Tailwind v3 a v4: Mi experiencia 💻\n\nAcabo de migrar la base de este blog a la nueva versión de Tailwind CSS. La directiva @theme y la compilación basada en JS eliminan muchísima configuración innecesaria de postcss.\n\n¿Alguien más ya ha hecho el cambio en producción?",
        timestamp: '5h',
        likes: 856,
        comments: 42,
        shares: 115,
        category: 'Tutoriales',
    },
    {
        id: '3',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Patrón de Arquitectura: Inversión de Dependencias en TypeScript 💡\n\nNo acoples tus servicios directamente en tus componentes de React. Pasa tus dependencias como props o mediante Contexto. Esto facilita enormemente el testing unitario y la refactorización.\n\n```typescript\ninterface Props {\n  userService: IUserService;\n}\n```",
        timestamp: '8h',
        likes: 3054,
        comments: 290,
        shares: 720,
        category: 'Tutoriales',
    },
    {
        id: '4',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Nuevos modelos de razonamiento (o1) ahora disponibles en la API 🧠\n\nHemos lanzado la nueva familia de modelos o1 diseñados para pensar antes de responder. Son ideales para tareas complejas de código, matemáticas y ciencia.\n\nYa puedes integrarlos usando el SDK de Node.js actualizando a la versión v4.60.0.",
        timestamp: '12h',
        likes: 15420,
        comments: 1205,
        shares: 5430,
        category: 'Últimas Noticias',
    },
    {
        id: '5',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "¡Hola Comunidad! 👋\n\n¿Qué frameworks están utilizando para sus proyectos web este año? Estuve probando Next.js 15 y me parece increíble lo rápido que es el Turbopack. ¡Dejen sus opiniones en los comentarios! 👇",
        timestamp: '1d',
        likes: 420,
        comments: 156,
        shares: 23,
        category: 'Comunidad',
    },
    {
        id: '6',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Renovando el Setup de Desarrollo 🚀\n\nPor fin llegó el nuevo monitor ultrawide y el teclado mecánico custom. La productividad sube un 200% solo por tener más espacio para el código. Mañana subo fotos completas.",
        timestamp: '2d',
        likes: 1205,
        comments: 89,
        shares: 45,
        category: 'Mi Setup',
    },
    {
        id: '7',
        author: {
            name: 'BYCHOKE',
            handle: '@bychoke',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        },
        content: "Nueva actualización de configuración de VSCode ⚙️\n\nPara los que preguntan por mi tema y tipografía:\nTema: 'One Dark Pro'\nFuente: 'Fira Code' con ligaduras activadas.\n\nPueden ver mis dotfiles completos en mi cuenta de GitHub.",
        timestamp: '3d',
        likes: 672,
        comments: 34,
        shares: 112,
        category: 'Configuración',
    }
];

interface FeedProps {
    isAdmin?: boolean;
    searchQuery: string;
    activeCategory: string;
}

const Feed = ({ isAdmin = true, searchQuery, activeCategory }: FeedProps) => {
    // Inicializar desde localStorage si existe, usar mockPosts como fallback
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('techsphere-posts-v2');
        if (savedPosts) {
            try {
                return JSON.parse(savedPosts);
            } catch (e) {
                console.error("No se pudieron cargar los posts locales:", e);
                return initialPosts;
            }
        }
        return initialPosts;
    });

    // Guardar en localStorage cada vez que posts cambien
    useEffect(() => {
        localStorage.setItem('techsphere-posts-v2', JSON.stringify(posts));
    }, [posts]);

    const formatTimestamp = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `Hoy a las ${hours}:${minutes}`;
    };

    const handleNewPost = (content: string, image?: string) => {
        const newPost = {
            id: Date.now().toString(),
            author: {
                name: 'BYCHOKE',
                handle: '@bychoke',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            },
            content,
            image,
            timestamp: formatTimestamp(),
            likes: 0,
            comments: 0,
            shares: 0,
            category: activeCategory,
        };
        setPosts([newPost, ...posts]);
    };

    const handleDelete = (id: string) => {
        setPosts(posts.filter((post: Post) => post.id !== id));
    };

    const filteredPosts = posts.filter((post: Post) => {
        // 1. Filtrar por búsqueda
        const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Filtrar por categoría (Sidebar)
        const matchesCategory = activeCategory === 'Últimas Noticias' ? true : post.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex-1 w-full max-w-2xl mx-auto min-h-screen border-r border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 md:px-6 md:py-4">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                    {activeCategory}
                </h2>
            </header>

            {isAdmin && <CreatePost onPostSubmit={handleNewPost} />}

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredPosts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        {searchQuery || activeCategory !== 'Últimas Noticias'
                            ? "No se encontraron posts con esos filtros."
                            : "No hay artículos aún. ¡Sé el primero en compartir!"}
                    </div>
                ) : (
                    filteredPosts.map((post: any, index: number) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            index={index}
                            onDelete={isAdmin ? handleDelete : undefined}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
