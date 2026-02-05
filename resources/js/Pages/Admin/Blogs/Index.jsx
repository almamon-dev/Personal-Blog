import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Home,
    Plus,
    Search,
    X,
    Check,
    Eye,
    Trash2,
    SquarePen,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Image as ImageIcon,
    MessageSquare,
    ThumbsUp,
} from "lucide-react";

export default function Index({ blogs, filters = {}, auth }) {
    const [search, setSearch] = useState(filters.search || "");
    const [selectedIds, setSelectedIds] = useState([]);
    const [showPromo, setShowPromo] = useState(true);

    const handleSearch = (value) => {
        setSearch(value);
        updateFilters({ search: value, page: 1 });
    };

    const updateFilters = (newFilters) => {
        router.get(
            route("admin.blogs.index"),
            { ...filters, ...newFilters },
            { preserveState: true, replace: true },
        );
    };

    const handlePerPageChange = (e) => {
        updateFilters({ per_page: e.target.value, page: 1 });
    };

    const handlePageChange = (url) => {
        if (url) router.get(url, {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this blog?")) {
            router.delete(route("admin.blogs.destroy", id), {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === blogs.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(blogs.data.map((b) => b.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((i) => i !== id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    return (
        <AdminLayout>
            <Head title="Blogs Portfolio" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Top Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            Blog portfolio
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} className="text-[#727586]" />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Blog portfolio</span>
                        </div>
                    </div>
                    {auth.user.permissions.includes("blogs.create") && (
                        <Link
                            href={route("admin.blogs.create")}
                            className="inline-flex items-center bg-[#673ab7] text-white px-5 py-[10px] rounded-[8px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm"
                        >
                            <Plus size={18} className="mr-2" />
                            Add new blog
                        </Link>
                    )}
                </div>

                {/* Promo Banner */}
                {showPromo && (
                    <div className="relative bg-[#f4f0ff] rounded-[12px] p-6 border border-[#e9e3ff] overflow-hidden flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-[18px] font-bold text-[#2f3344] mb-1">
                                Share your knowledge with the world!
                            </h2>
                            <p className="text-[14px] text-[#727586]">
                                Every great article starts with a single word.
                                What's yours today?
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] h-[60px] relative hidden md:block">
                                <div className="absolute right-0 top-0 text-[#673ab7] opacity-20 transform rotate-12">
                                    <Plus size={40} />
                                </div>
                                <div className="absolute right-10 bottom-0 text-[#673ab7] opacity-20">
                                    <ImageIcon size={30} />
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPromo(false)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#e3e4e8] text-[#727586] hover:bg-slate-50 transition-all"
                            >
                                <ChevronDown size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content Card */}
                <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-7">
                        <div className="relative w-full">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a0a3af]">
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search blogs..."
                                className="w-full h-[52px] pl-14 pr-6 bg-white border border-[#e3e4e8] rounded-[8px] text-[15px] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] transition-all"
                            />
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#e3e4e8]">
                                    <th className="pl-7 pr-4 py-4 w-10">
                                        <div
                                            onClick={toggleSelectAll}
                                            className={`w-5 h-5 border-[2px] rounded cursor-pointer transition-all flex items-center justify-center ${
                                                selectedIds.length ===
                                                    blogs.data.length &&
                                                blogs.data.length > 0
                                                    ? "bg-[#673ab7] border-[#673ab7]"
                                                    : "border-[#c3c4ca] hover:border-[#673ab7]"
                                            }`}
                                        >
                                            {selectedIds.length ===
                                                blogs.data.length &&
                                                blogs.data.length > 0 && (
                                                    <Check
                                                        size={14}
                                                        className="text-white"
                                                    />
                                                )}
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 cursor-pointer hover:text-black group">
                                            Blog Info
                                            <ArrowUpDown
                                                size={14}
                                                className="text-[#a0a3af] group-hover:text-[#673ab7]"
                                            />
                                        </div>
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="text-left px-5 py-4 text-[13px] font-bold text-[#2f3344] uppercase tracking-wider">
                                        Stats
                                    </th>
                                    <th className="px-7 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f1f2f4]">
                                {blogs.data.length > 0 ? (
                                    blogs.data.map((blog) => (
                                        <tr
                                            key={blog.id}
                                            className={`hover:bg-[#fafbfc] transition-colors group ${selectedIds.includes(blog.id) ? "bg-[#f4f0ff]/50" : ""}`}
                                        >
                                            <td className="pl-7 pr-4 py-5">
                                                <div
                                                    onClick={() =>
                                                        toggleSelect(blog.id)
                                                    }
                                                    className={`w-5 h-5 border-[2px] rounded cursor-pointer transition-all flex items-center justify-center ${
                                                        selectedIds.includes(
                                                            blog.id,
                                                        )
                                                            ? "bg-[#673ab7] border-[#673ab7]"
                                                            : "border-[#c3c4ca] hover:border-[#673ab7]"
                                                    }`}
                                                >
                                                    {selectedIds.includes(
                                                        blog.id,
                                                    ) && (
                                                        <Check
                                                            size={14}
                                                            className="text-white"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-[#f8f9fa] flex items-center justify-center overflow-hidden border border-[#e3e4e8]">
                                                        {blog.image ? (
                                                            <img
                                                                src={blog.image}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <ImageIcon
                                                                size={20}
                                                                className="text-[#c3c4ca]"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-[#2f3344] group-hover:text-[#673ab7] transition-colors line-clamp-1">
                                                            {blog.title}
                                                        </p>
                                                        <p className="text-[12px] text-[#727586] font-normal tracking-wide truncate max-w-[200px]">
                                                            {blog.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f4f0ff] text-[#673ab7] border border-[#e9e3ff]">
                                                    {blog.category?.name ||
                                                        "General"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                                        <img
                                                            src={
                                                                blog.user
                                                                    ?.profile_photo_url
                                                            }
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-[13px] text-[#727586] font-medium">
                                                        {blog.user?.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-[12px] text-[#727586] font-bold">
                                                        <ThumbsUp
                                                            size={14}
                                                            className="text-[#378FE9]"
                                                        />
                                                        {blog.likes_count || 0}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[12px] text-[#727586] font-bold">
                                                        <MessageSquare
                                                            size={14}
                                                            className="text-[#673ab7]"
                                                        />
                                                        {blog.comments_count ||
                                                            0}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pr-7 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "blogs.show",
                                                            blog.slug,
                                                        )}
                                                        target="_blank"
                                                        className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#2f3344] bg-[#f1f3f5] hover:bg-green-500 hover:text-white transition-all shadow-sm border border-transparent hover:border-green-500"
                                                        title="View"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    {auth.user.permissions.includes(
                                                        "blogs.edit",
                                                    ) && (
                                                        <Link
                                                            href={route(
                                                                "admin.blogs.edit",
                                                                blog.slug,
                                                            )}
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#2f3344] bg-[#f1f3f5] hover:bg-[#673ab7] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#673ab7]"
                                                            title="Edit"
                                                        >
                                                            <SquarePen
                                                                size={16}
                                                            />
                                                        </Link>
                                                    )}
                                                    {auth.user.permissions.includes(
                                                        "blogs.delete",
                                                    ) && (
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    blog.id,
                                                                )
                                                            }
                                                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[#ef4444] bg-[#fee2e2]/50 hover:bg-[#ef4444] hover:text-white transition-all shadow-sm border border-transparent hover:border-[#ef4444]"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-7 py-20 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3 text-[#727586]">
                                                <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-2">
                                                    <Search
                                                        size={30}
                                                        className="text-[#c3c4ca]"
                                                    />
                                                </div>
                                                <p className="text-[16px] font-bold text-[#2f3344]">
                                                    No blogs found
                                                </p>
                                                <p className="text-[14px]">
                                                    Try adjusting your search to
                                                    find what you're looking
                                                    for.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end gap-8 px-8 py-5 border-t border-[#e3e4e8]">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-[#727586]">
                                Items per page:
                            </span>
                            <div className="relative">
                                <select
                                    value={filters.per_page || 10}
                                    onChange={handlePerPageChange}
                                    className="h-[38px] pl-4 pr-10 bg-white border border-[#e3e4e8] rounded-[6px] text-[13px] text-[#2f3344] font-medium appearance-none cursor-pointer focus:border-[#673ab7] outline-none"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#727586]">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-[13px] text-[#2f3344] font-medium">
                                {blogs.from || 0} - {blogs.to || 0} of{" "}
                                {blogs.total || 0}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(blogs.prev_page_url)
                                    }
                                    disabled={!blogs.prev_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() =>
                                        handlePageChange(blogs.next_page_url)
                                    }
                                    disabled={!blogs.next_page_url}
                                    className="w-[34px] h-[34px] flex items-center justify-center rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
