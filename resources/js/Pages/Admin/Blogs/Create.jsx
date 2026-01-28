import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon, Video, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category_id: '',
        image: null,
        video_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Blog Post</h2>}
        >
            <Head title="Admin - Create Blog" />

            <div className="py-12 bg-[#F3F2EF] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex items-center justify-between">
                        <Link 
                            href={route('admin.blogs.index')}
                            className="flex items-center text-sm font-bold text-gray-500 hover:text-[#0a66c2] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Blog Management
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-l-4 border-[#0a66c2] pl-3 mb-4">Post Content</h3>
                                    
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Post Title</label>
                                        <input 
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:ring-0 focus:border-[#0a66c2] transition-colors"
                                            placeholder="Enter blog title (English or Bangla)"
                                            required
                                        />
                                        {errors.title && <p className="text-xs text-red-500 mt-1 font-bold">{errors.title}</p>}
                                    </div>

                                    <div className="bg-white ql-container-box">
                                        <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Blog Body Content</label>
                                        <ReactQuill 
                                            theme="snow"
                                            value={data.content}
                                            onChange={(content) => setData('content', content)}
                                            className="h-96 mb-12"
                                            modules={{
                                                toolbar: [
                                                    [{ 'header': [1, 2, 3, 4, false] }],
                                                    ['bold', 'italic', 'underline', 'strike'],
                                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                                    ['link', 'image', 'video'],
                                                    ['code-block'],
                                                    ['clean']
                                                ],
                                            }}
                                        />
                                        {errors.content && <p className="text-xs text-red-500 mt-1 font-bold">{errors.content}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Settings */}
                            <div className="space-y-6">
                                {/* Publishing Settings */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-l-4 border-orange-500 pl-3 mb-4">Publishing</h3>
                                    
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Category</label>
                                        <select 
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:ring-0 focus:border-[#0a66c2] transition-colors"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="text-xs text-red-500 mt-1 font-bold">{errors.category_id}</p>}
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-3 rounded-full font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{processing ? 'Publishing...' : 'Publish Blog'}</span>
                                    </button>
                                </div>

                                {/* Media Settings */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-l-4 border-purple-500 pl-3 mb-4">Media (Optional)</h3>
                                    
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Featured Image</label>
                                        <div className="mt-2 text-center">
                                            {data.image ? (
                                                <div className="relative group">
                                                    <img 
                                                        src={URL.createObjectURL(data.image)} 
                                                        alt="Preview" 
                                                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                                                    />
                                                    <button 
                                                        type="button"
                                                        onClick={() => setData('image', null)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md group-hover:scale-110 transition-transform"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Image</span>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        onChange={(e) => setData('image', e.target.files[0])}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-xs text-red-500 mt-1 font-bold">{errors.image}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Video URL (YouTube/Vimeo)</label>
                                        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                            <Video className="w-4 h-4 text-gray-400" />
                                            <input 
                                                type="url"
                                                value={data.video_url}
                                                onChange={(e) => setData('video_url', e.target.value)}
                                                className="bg-transparent border-none p-0 text-sm font-bold text-gray-900 focus:ring-0 w-full"
                                                placeholder="https://youtube.com/..."
                                            />
                                        </div>
                                        {errors.video_url && <p className="text-xs text-red-500 mt-1 font-bold">{errors.video_url}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
