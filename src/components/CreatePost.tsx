import { useState, useRef } from 'react';
import { Image, Code, FileText, Link, Send, X } from 'lucide-react';

interface CreatePostProps {
    onPostSubmit?: (content: string, image?: string) => void;
}

const CreatePost = ({ onPostSubmit }: CreatePostProps) => {
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        if (!content.trim() && !imagePreview) return;
        if (onPostSubmit) {
            onPostSubmit(content, imagePreview || undefined);
        }
        setContent('');
        setImagePreview(null);
    };

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
                        id="create-post-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Sobre qué tecnología escribirás hoy?"
                        className="w-full bg-transparent text-lg md:text-xl placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none outline-none min-h-[60px] max-h-[400px]"
                        rows={content ? 3 : 1}
                    />

                    {imagePreview && (
                        <div className="relative mt-3 inline-block">
                            <img src={imagePreview} alt="Vista previa" className="max-h-60 rounded-xl object-cover border border-slate-200 dark:border-slate-800" />
                            <button
                                onClick={() => setImagePreview(null)}
                                className="absolute top-2 right-2 p-1.5 bg-slate-900/70 text-white rounded-full hover:bg-slate-900 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pb-2 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                        <div className="flex items-center gap-1 md:gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                title="Añadir imagen"
                                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors"
                            >
                                <Image className="w-5 h-5" />
                            </button>
                            <button title="Añadir bloque de código" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors hidden sm:block">
                                <Code className="w-5 h-5" />
                            </button>
                            <button title="Añadir documento" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors">
                                <FileText className="w-5 h-5" />
                            </button>
                            <button title="Añadir enlace" className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors hidden sm:block">
                                <Link className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            onClick={handlePublish}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${(content.trim() || imagePreview)
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                : 'bg-blue-100 text-blue-400 dark:bg-blue-900/30 dark:text-blue-800 cursor-not-allowed'
                                }`}
                            disabled={!content.trim() && !imagePreview}
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
