import { useState, useRef } from 'react';
import { Image, Code, Send, X } from 'lucide-react';
import { useToast } from './Toast';

interface CreatePostProps {
    onPostSubmit?: (content: string, image?: string, category?: string) => void;
    currentCategory?: string;
}

const CreatePost = ({ onPostSubmit, currentCategory = 'Últimas Noticias' }: CreatePostProps) => {
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

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
            onPostSubmit(content, imagePreview || undefined, selectedCategory);
            toast('Artículo publicado con éxito', 'success');
        }
        setContent('');
        setImagePreview(null);
        // Reseteamos a la categoría actual por defecto
        setSelectedCategory(currentCategory);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 pt-6 px-4 md:px-6">
            <div className="flex gap-3 sm:gap-4">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                />
                <div className="flex-1">
                    <textarea
                        id="create-post-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="¿Sobre qué tecnología escribirás hoy?"
                        className="w-full bg-transparent text-[15px] sm:text-base placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none outline-none min-h-[50px] max-h-[400px]"
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

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pb-2 border-t border-slate-100 dark:border-slate-800/60 pt-3 gap-3">
                        <div className="flex items-center gap-1 w-full sm:w-auto flex-wrap">
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
                                className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors shrink-0"
                            >
                                <Image className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                            </button>
                            <button title="Añadir bloque de código" className="p-1.5 sm:p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors hidden sm:block shrink-0">
                                <Code className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                            </button>

                            {/* Selector de Categoría */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="ml-1 sm:ml-2 bg-slate-100 dark:bg-slate-800 border-none text-[13px] sm:text-sm rounded-xl px-2 sm:px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-slate-700 dark:text-slate-300 font-medium max-w-[130px] sm:max-w-none truncate shrink-0"
                            >
                                <option value="Últimas Noticias">Últimas Noticias</option>
                                <option value="Tutoriales">Tutoriales</option>
                                <option value="Lanzamientos">Lanzamientos</option>
                                <option value="Comunidad">Comunidad</option>
                                <option value="Mi Setup">Mi Setup</option>
                                <option value="Configuración">Configuración</option>
                            </select>
                        </div>

                        <button
                            onClick={handlePublish}
                            className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full font-bold transition-all w-full sm:w-auto ${(content.trim() || imagePreview)
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
