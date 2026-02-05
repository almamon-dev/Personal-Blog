import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Home,
    ChevronLeft,
    Save,
    Trash2,
    History,
    Info,
    Link2,
} from "lucide-react";

export default function Edit({ auth, category, parentCategories }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        parent_id: category.parent_id || "",
        is_active:
            category.is_active === undefined ? true : !!category.is_active,
        icon: category.icon || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.categories.update", category.id));
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this category?")) {
            destroy(route("admin.categories.destroy", category.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Category: ${category.name}`} />

            <div className="space-y-4 max-w-full mx-auto pb-10 px-4 md:px-8">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f0ff] flex items-center justify-center text-[#673ab7] border border-[#e9e3ff]">
                            <History size={20} />
                        </div>
                        <div>
                            <h1 className="text-[22px] font-bold text-[#2f3344] tracking-tight">
                                Edit Category
                            </h1>
                            <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-0.5 font-medium italic opacity-75">
                                UID Reference: {category.id}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDelete}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-[13px] hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                        <Link
                            href={route("admin.categories.index")}
                            className="bg-white border border-[#e3e4e8] text-[#727586] px-4 py-2 rounded-lg font-bold text-[13px] hover:text-[#2f3344] transition-all flex items-center gap-1.5"
                        >
                            <ChevronLeft size={16} /> Back
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Basic Details */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-left duration-500">
                            <div className="px-6 py-4 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2.5">
                                <Info size={16} className="text-[#2c8af8]" />
                                <h2 className="text-[16px] font-bold text-[#2f3344]">
                                    Modify Category Information
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Category Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f8f9fa] border ${errors.name ? "border-red-500" : "border-[#e3e4e8]"} rounded-[8px] text-[15px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all font-bold`}
                                        placeholder="Category name..."
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        SEO Summary & Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full p-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all min-h-[150px] resize-none font-medium"
                                        placeholder="Briefly describe this category..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* URL & Hierarchy */}
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right duration-500">
                            <div className="px-5 py-3 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2">
                                <Link2 size={16} className="text-[#673ab7]" />
                                <h2 className="text-[14px] font-bold text-[#2f3344]">
                                    Connectivity
                                </h2>
                            </div>
                            <div className="p-5 space-y-5">
                                {/* Slug */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        URL Permalink
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        className={`w-full h-[40px] px-4 bg-[#f8f9fa] border ${errors.slug ? "border-red-500" : "border-[#e3e4e8]"} rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all font-medium`}
                                    />
                                </div>

                                {/* Parent */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Category Hierarchy
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={data.parent_id}
                                            onChange={(e) =>
                                                setData(
                                                    "parent_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full h-[40px] px-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] appearance-none cursor-pointer font-medium"
                                        >
                                            <option value="">
                                                None (Root Category)
                                            </option>
                                            {parentCategories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronLeft
                                                size={14}
                                                className="-rotate-90"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Interface Icon
                                    </label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={(e) =>
                                            setData("icon", e.target.value)
                                        }
                                        className="w-full h-[40px] px-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all font-medium"
                                        placeholder="Lucide icon name..."
                                    />
                                </div>

                                {/* Status Toggle */}
                                <div className="pt-2 flex items-center justify-between bg-slate-50/80 p-3 rounded-lg border border-slate-100/50">
                                    <span className="text-[13px] font-bold text-[#2f3344]">
                                        Platform Visibility
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={data.is_active}
                                            onChange={(e) =>
                                                setData(
                                                    "is_active",
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                        <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#00b090]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-[#2f3344] p-6 rounded-[12px] shadow-sm text-white">
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="w-full bg-[#2c8af8] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#1a7ae8] transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                {processing ? "Saving..." : "Update Category"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
