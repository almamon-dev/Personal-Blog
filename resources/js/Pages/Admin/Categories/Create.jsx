import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Home,
    ChevronLeft,
    Save,
    LayoutGrid,
    Link2,
    Info,
    ToggleRight,
} from "lucide-react";

export default function Create({ parentCategories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
        description: "",
        parent_id: "",
        is_active: true,
        icon: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"));
    };

    return (
        <AdminLayout>
            <Head title="Create Category" />

            <div className="space-y-4 max-w-full mx-auto pb-10 px-4 md:px-8">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[22px] font-bold text-[#2f3344] tracking-tight">
                            Categories
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={14} />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Content</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <span className="font-medium text-[#2f3344]">
                                Create Category
                            </span>
                        </div>
                    </div>
                    <Link
                        href={route("admin.categories.index")}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Basic Details */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-left duration-500">
                            <div className="px-6 py-4 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#f0f7ff] flex items-center justify-center text-[#2c8af8]">
                                    <Info size={16} />
                                </div>
                                <h2 className="text-[16px] font-bold text-[#2f3344]">
                                    Category Details
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Category Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f8f9fa] border ${errors.name ? "border-red-500" : "border-[#e3e4e8]"} rounded-[8px] text-[15px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] transition-all placeholder:text-slate-400 font-bold`}
                                        placeholder="E.g. Technology, Lifestyle..."
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1 ml-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* SEO Description */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full p-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all min-h-[120px] resize-none placeholder:text-slate-400 font-medium"
                                        placeholder="Describe this category for SEO and users..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Configuration */}
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right duration-500">
                            <div className="px-5 py-3 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2">
                                <Link2 size={16} className="text-[#673ab7]" />
                                <h2 className="text-[14px] font-bold text-[#2f3344]">
                                    Configuration
                                </h2>
                            </div>
                            <div className="p-5 space-y-5">
                                {/* Slug */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        className={`w-full h-[40px] px-4 bg-[#f8f9fa] border ${errors.slug ? "border-red-500" : "border-[#e3e4e8]"} rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all placeholder:text-slate-400 font-medium`}
                                        placeholder="auto-generated-slug"
                                    />
                                </div>

                                {/* Parent */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Parent Category
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
                                                None (Root)
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
                                        Icon Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.icon}
                                        onChange={(e) =>
                                            setData("icon", e.target.value)
                                        }
                                        className="w-full h-[40px] px-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all font-medium"
                                        placeholder="e.g. globe, monitor"
                                    />
                                </div>

                                {/* Status */}
                                <div className="pt-2 flex items-center gap-3">
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
                                    <span className="text-[13px] font-bold text-[#2f3344]">
                                        Active Platform Status
                                    </span>
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
                                {processing ? "Creating..." : "Create Category"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
