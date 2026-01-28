import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, ChevronRight, Folder, FolderPlus, Tag } from 'lucide-react';

export default function Index({ auth, categories, parentCategories }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        name: '',
        parent_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => {
                    setEditingCategory(null);
                    reset();
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    setShowCreateModal(false);
                    reset();
                }
            });
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            parent_id: category.parent_id || '',
        });
        setShowCreateModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category? All subcategories and associated blogs will be affected.')) {
            destroy(route('admin.categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Categories</h2>}
        >
            <Head title="Admin - Categories" />

            <div className="py-12 bg-[#F3F2EF] min-h-screen font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Action */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">Category Hierarchy</h1>
                            <p className="text-sm text-gray-500 font-bold mt-1">Create and organize your technical tags and sub-tags.</p>
                        </div>
                        <button 
                            onClick={() => { reset(); setEditingCategory(null); setShowCreateModal(true); }}
                            className="bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-2.5 rounded-full font-black text-sm flex items-center space-x-2 transition-all shadow-md active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Category</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Categories List */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">Name & Hierarchy</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest text-center">Sub-categories</th>
                                            <th className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {categories.map((category) => (
                                            <tr key={category.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`p-2 rounded-lg ${category.parent_id ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-[#0a66c2]'}`}>
                                                            {category.parent_id ? <Tag className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-gray-900 group-hover:text-[#0a66c2] transition-colors">{category.name}</div>
                                                            {category.parent && (
                                                                <div className="text-[10px] text-gray-400 font-bold flex items-center mt-0.5">
                                                                    <span>Sub of</span>
                                                                    <ChevronRight className="w-2.5 h-2.5 mx-1" />
                                                                    <span className="text-gray-500">{category.parent.name}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {!category.parent_id ? (
                                                        <span className="bg-blue-50 text-[#0a66c2] text-[11px] font-black px-2.5 py-1 rounded-full border border-blue-100">
                                                            {category.children_count} items
                                                        </span>
                                                    ) : (
                                                        <span className="text-[11px] text-gray-400 font-bold">—</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button 
                                                            onClick={() => handleEdit(category)}
                                                            className="p-2 text-gray-400 hover:text-[#0a66c2] hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(category.id)}
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
                                {categories.length === 0 && (
                                    <div className="p-20 text-center">
                                        <FolderPlus className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-500 font-bold">No categories created yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary Widget */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-l-4 border-[#0a66c2] pl-3 mb-6">Hierarchy Insight</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                                        <div className="text-[11px] text-gray-500 font-black uppercase tracking-tighter mb-1">Total Categories</div>
                                        <div className="text-3xl font-black text-[#0a66c2]">{categories.length}</div>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        Organize your blogs into top-level categories (e.g., Laravel) and specific sub-categories (e.g., Laravel 12) for a professional LinkedIn-style filtering experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create/Edit Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-black text-gray-900">{editingCategory ? 'Update Category' : 'Create New Category'}</h2>
                                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>
                            <form onSubmit={submit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Category Name</label>
                                    <input 
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:ring-0 focus:border-[#0a66c2] transition-colors"
                                        placeholder="e.g. Laravel 12"
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-red-500 mt-1 font-bold">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 px-1">Parent Category (Optional)</label>
                                    <select 
                                        value={data.parent_id}
                                        onChange={(e) => setData('parent_id', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:ring-0 focus:border-[#0a66c2] transition-colors"
                                    >
                                        <option value="">None (Top Level)</option>
                                        {parentCategories.filter(pc => pc.id !== editingCategory?.id).map((pc) => (
                                            <option key={pc.id} value={pc.id}>{pc.name}</option>
                                        ))}
                                    </select>
                                    {errors.parent_id && <p className="text-xs text-red-500 mt-1 font-bold">{errors.parent_id}</p>}
                                </div>

                                <div className="pt-4 flex space-x-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-full font-black text-sm text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 px-4 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-black text-sm shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {editingCategory ? 'Update Hierarchy' : 'Create Category'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
