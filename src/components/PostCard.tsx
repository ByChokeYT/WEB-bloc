import { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, BadgeCheck } from 'lucide-react';

export interface Post {
    id: string;
    author: {
        name: string;
        handle: string;
        avatar: string;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    category?: string;
}

interface PostProps {
    post: Post;
    index?: number;
    onDelete?: (id: string) => void;
}

const PostCard = ({ post, index = 0, onDelete }: PostProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const renderContent = (text: string) => {
        if (!text.includes('```')) return text;
        const parts = text.split(/```(\w+)?\n([\s\S]*?)```/);

        const elements = [];
        for (let i = 0; i < parts.length; i++) {
            if (i % 3 === 0) {
                if (parts[i]) elements.push(<span key={i}>{parts[i]}</span>);
            } else if (i % 3 === 1) {
                // This is the language tag (e.g., 'typescript')
            } else {
                // This is the code content
                elements.push(
                    <div key={i} className="my-3 rounded-xl bg-[#0d1117] dark:bg-black/80 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="bg-slate-100 dark:bg-slate-900/80 px-4 py-2 text-xs text-slate-500 font-mono flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="uppercase opacity-70 tracking-wider text-[10px]">{parts[i - 1] || 'code'}</span>
                        </div>
                        <pre className="p-4 text-[0.9rem] text-blue-400 dark:text-blue-300 font-mono overflow-x-auto leading-relaxed">
                            <code>{parts[i]}</code>
                        </pre>
                    </div>
                );
            }
        }
        return elements;
    };

    return (
        <article
            className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 md:p-6 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/10 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
        >
            <div className="flex gap-3 md:gap-4">
                {/* Avatar */}
                <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                />

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-900 dark:text-slate-100 hover:underline cursor-pointer truncate">
                                    {post.author.name}
                                </span>
                                {post.author.handle === '@bychoke' && (
                                    <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span className="truncate">{post.author.handle}</span>
                                <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span className="shrink-0">{post.timestamp}</span>
                            </div>

                            {post.category && (
                                <div className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide border border-blue-100 dark:border-blue-800/50">
                                    {post.category}
                                </div>
                            )}
                        </div>

                        {onDelete && post.author.handle === '@bychoke' && (
                            <button
                                onClick={() => onDelete(post.id)}
                                title="Eliminar publicación"
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors -mt-2 -mr-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                            </button>
                        )}
                    </div>

                    {/* Post Text */}
                    <div className="text-slate-800 dark:text-slate-200 text-base md:text-[1.05rem] leading-relaxed mb-4 whitespace-pre-wrap word-break">
                        {renderContent(post.content)}
                    </div>

                    {/* Attached Image */}
                    {post.image && (
                        <div className="mb-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 cursor-pointer">
                            <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-[500px]" loading="lazy" />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 max-w-md w-full">
                        <button className="flex items-center gap-2 group transition-colors hover:text-blue-500 text-slate-500 dark:text-slate-400">
                            <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors active:scale-75">
                                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-xs md:text-sm">{post.comments > 0 ? post.comments : ''}</span>
                        </button>

                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 group transition-all duration-300 ${isLiked ? 'text-pink-500' : 'hover:text-pink-500 text-slate-500 dark:text-slate-400'}`}
                        >
                            <div className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'bg-pink-100 dark:bg-pink-900/30' : 'group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20'} active:scale-75`}>
                                <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${isLiked ? 'fill-pink-500 scale-110' : 'scale-100'}`} />
                            </div>
                            <span className="text-xs md:text-sm tabular-nums">{likeCount > 0 ? likeCount : ''}</span>
                        </button>

                        <button className="flex items-center gap-2 group transition-colors hover:text-green-500 text-slate-500 dark:text-slate-400">
                            <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors active:scale-75">
                                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-xs md:text-sm">{post.shares > 0 ? post.shares : ''}</span>
                        </button>

                        <button
                            onClick={handleBookmark}
                            className={`flex items-center gap-2 group transition-all duration-300 ${isBookmarked ? 'text-blue-500' : 'hover:text-blue-500 text-slate-500 dark:text-slate-400'}`}
                        >
                            <div className={`p-2 rounded-full transition-all duration-300 ${isBookmarked ? 'bg-blue-100 dark:bg-blue-900/30' : 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'} active:scale-75`}>
                                <Bookmark className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${isBookmarked ? 'fill-blue-500 scale-110' : 'scale-100'}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
