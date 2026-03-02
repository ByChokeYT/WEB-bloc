import { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, Bookmark } from 'lucide-react';

interface PostProps {
    post: {
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
    }
}

const PostCard = ({ post }: PostProps) => {
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

    return (
        <article className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 md:p-6 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
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
                            <span className="font-bold text-slate-900 dark:text-slate-100 hover:underline cursor-pointer truncate">
                                {post.author.name}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span className="truncate">{post.author.handle}</span>
                                <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span className="shrink-0">{post.timestamp}</span>
                            </div>
                        </div>

                        <button className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-full transition-colors -mt-2 -mr-2">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Post Text */}
                    <p className="text-slate-800 dark:text-slate-200 text-base md:text-[1.05rem] leading-relaxed mb-4 whitespace-pre-wrap word-break">
                        {post.content}
                    </p>

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
