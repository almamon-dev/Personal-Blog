import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Video, Eye } from 'lucide-react';

export default function Index({ auth, blogs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            destroy(route('admin.blogs.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Blogs</h2>}
        >
            <Head title="Admin - Blogs" />

            <div className="py-12 bg-[#F3F2EF] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">Blog Management</h1>
                            <p className="text-sm text-gray-500 font-bold mt-1">Create and manage your technical articles.</p>
                        </div>
                        <Link 
                            href={route('admin.blogs.create')}
                            className="bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-2.5 rounded-full font-black text-sm flex items-center space-x-2 transition-all shadow-md active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Blog</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">Blog Info</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest text-center">Language</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">Media</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                                    {blog.image ? (
                                                        <img src={blog.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-gray-900 group-hover:text-[#0a66c2] transition-colors line-clamp-1">{blog.title}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold truncate max-w-[200px]">{blog.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded-md border border-orange-100">
                                                {blog.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[10px] font-black px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                {/[a-zA-Z]/.test(blog.title) ? 'English' : 'Bangla/Other'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                {blog.image && <ImageIcon className="w-4 h-4 text-[#0a66c2]" />}
                                                {blog.video_url && <Video className="w-4 h-4 text-purple-500" />}
                                                {!blog.image && !blog.video_url && <span className="text-[10px] font-bold italic">No media</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link 
                                                    href={route('blogs.show', blog.slug)}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link 
                                                    href={route('admin.blogs.edit', blog.slug)}
                                                    className="p-2 text-gray-400 hover:text-[#0a66c2] hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(blog.slug)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {blogs.length === 0 && (
                            <div className="p-20 text-center">
                                <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold">No blogs found.</p>
                                <Link href={route('admin.blogs.create')} className="text-[#0a66c2] font-black text-sm mt-2 inline-block">Create your first blog</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
