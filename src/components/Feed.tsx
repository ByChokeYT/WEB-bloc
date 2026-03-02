
import { useState } from 'react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

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
    }
];

const Feed = () => {
    const [posts, setPosts] = useState(initialPosts);

    const handleNewPost = (content: string) => {
        const newPost = {
            id: Date.now().toString(),
            author: {
                name: 'BYCHOKE',
                handle: '@bychoke',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            },
            content,
            timestamp: 'Ahora',
            likes: 0,
            comments: 0,
            shares: 0,
        };
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="flex-1 w-full max-w-2xl mx-auto min-h-screen border-r border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 md:px-6 md:py-4">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                    Últimas Noticias
                </h2>
            </header>

            <CreatePost onPostSubmit={handleNewPost} />

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
