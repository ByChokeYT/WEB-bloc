import { useState } from 'react';
import { Image, Video, Smile, MapPin, Send } from 'lucide-react';

const CreatePost = () => {
    const [content, setContent] = useState('');

    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 pt-6 px-4 md:px-6">
            <div className="flex gap-4">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Qué está pasando?"
                        className="w-full bg-transparent text-lg md:text-xl placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none outline-none min-h-[60px] max-h-[400px]"
                        rows={content ? 3 : 1}
                    />

                    <div className="flex items-center justify-between mt-4 pb-2 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                        <div className="flex items-center gap-1 md:gap-2">
                            <button title="Añadir multimedia" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors">
                                <Image className="w-5 h-5" />
                            </button>
                            <button title="Añadir video" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors hidden sm:block">
                                <Video className="w-5 h-5" />
                            </button>
                            <button title="Añadir emoji" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <button title="Añadir ubicación" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors hidden sm:block">
                                <MapPin className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${content.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                : 'bg-blue-100 text-blue-400 dark:bg-blue-900/30 dark:text-blue-800 cursor-not-allowed'
                                }`}
                            disabled={!content.trim()}
                        >
                            <span>Publicar</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
