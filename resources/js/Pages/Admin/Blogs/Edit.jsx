import React, { useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Home,
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Video,
    LayoutGrid,
    History,
    CloudUpload,
    Feather,
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Edit({ auth, blog, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: blog.title || "",
        content: blog.content || "",
        category_id: blog.category_id || "",
        image: null,
        video_url: blog.video_url || "",
        _method: "PUT",
    });

    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.blogs.update", blog.slug));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Blog: ${blog.title}`} />

            <div className="space-y-4 max-w-full mx-auto pb-10 px-4 md:px-8">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f0ff] flex items-center justify-center text-[#673ab7] border border-[#e9e3ff]">
                            <History size={20} />
                        </div>
                        <div>
                            <h1 className="text-[22px] font-bold text-[#2f3344] tracking-tight">
                                Edit Blog
                            </h1>
                            <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-0.5">
                                <span className="text-[#673ab7] font-semibold text-[11px] bg-[#f4f0ff] px-2 py-0.5 rounded tracking-wide">
                                    SLUG: {blog.slug}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Link
                        href={route("admin.blogs.index")}
                        className="flex items-center gap-2 text-[#727586] hover:text-[#2f3344] font-bold text-[14px] bg-white border border-[#e3e4e8] px-4 py-2 rounded-lg"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                    {/* Left Column: Content Editor (Main) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-left duration-500">
                            <div className="px-6 py-4 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#f0f7ff] flex items-center justify-center text-[#2c8af8]">
                                    <Feather size={16} />
                                </div>
                                <h2 className="text-[16px] font-bold text-[#2f3344]">
                                    Story Body
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Blog Title */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5 flex items-center gap-1.5">
                                        Blog Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f8f9fa] border ${errors.title ? "border-red-500" : "border-[#e3e4e8]"} rounded-[8px] text-[15px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] transition-all placeholder:text-slate-400 font-bold tracking-tight`}
                                        placeholder="Enter a compelling title..."
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1 ml-1">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Blog Content */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Content Body
                                    </label>
                                    <div className="prose-editor">
                                        <ReactQuill
                                            theme="snow"
                                            value={data.content}
                                            onChange={(content) =>
                                                setData("content", content)
                                            }
                                            modules={{
                                                toolbar: [
                                                    [
                                                        {
                                                            header: [
                                                                1,
                                                                2,
                                                                3,
                                                                false,
                                                            ],
                                                        },
                                                    ],
                                                    [
                                                        "bold",
                                                        "italic",
                                                        "underline",
                                                        "strike",
                                                        "blockquote",
                                                    ],
                                                    [
                                                        { list: "ordered" },
                                                        { list: "bullet" },
                                                    ],
                                                    ["link", "image", "video"],
                                                    ["code-block"],
                                                    ["clean"],
                                                ],
                                            }}
                                            formats={[
                                                "header",
                                                "bold",
                                                "italic",
                                                "underline",
                                                "strike",
                                                "blockquote",
                                                "list",
                                                "bullet",
                                                "link",
                                                "image",
                                                "video",
                                                "code-block",
                                            ]}
                                            placeholder="Update your content..."
                                            className="bg-white rounded-[8px] overflow-hidden border border-[#e3e4e8]"
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1 ml-1">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Metadata & Settings */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Featured Media */}
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right duration-500">
                            <div className="px-5 py-3 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2">
                                <ImageIcon
                                    size={16}
                                    className="text-[#673ab7]"
                                />
                                <h2 className="text-[14px] font-bold text-[#2f3344]">
                                    Featured Media
                                </h2>
                            </div>
                            <div className="p-5 space-y-4">
                                {/* Image Update */}
                                <div className="space-y-1.5">
                                    <div
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className={`w-full aspect-video flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed ${errors.image ? "border-red-300" : "border-[#e3e4e8]"} rounded-xl cursor-pointer hover:border-[#673ab7] hover:bg-[#f4f0ff]/20 transition-all group p-4 relative overflow-hidden`}
                                    >
                                        {blog.image && !data.image && (
                                            <img
                                                src={blog.image}
                                                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                                                alt="background"
                                            />
                                        )}
                                        <CloudUpload
                                            size={24}
                                            className="text-slate-400 group-hover:text-[#673ab7] transition-colors mb-2 z-10"
                                        />
                                        <span className="text-[12px] font-bold text-slate-600 group-hover:text-[#673ab7] text-center z-10">
                                            {data.image
                                                ? data.image.name
                                                : "Replace Header Image"}
                                        </span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={(e) =>
                                                setData(
                                                    "image",
                                                    e.target.files[0],
                                                )
                                            }
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="text-[10px] text-slate-400 text-center font-medium italic">
                                        Click to browse or drag and drop new
                                        asset
                                    </div>
                                    {errors.image && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                {/* Video URL */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5 flex items-center gap-1.5">
                                        <Video size={13} /> Video Reference
                                    </label>
                                    <input
                                        type="text"
                                        value={data.video_url}
                                        onChange={(e) =>
                                            setData("video_url", e.target.value)
                                        }
                                        className="w-full h-[40px] px-4 bg-[#f8f9fa] border border-[#e3e4e8] rounded-[8px] text-[13px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all placeholder:text-slate-400 font-medium"
                                        placeholder="Paste link here..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Classification */}
                        <div className="bg-white rounded-[12px] border border-[#e3e4e8] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right duration-500 delay-75">
                            <div className="px-5 py-3 border-b border-[#e3e4e8] bg-slate-50/50 flex items-center gap-2">
                                <LayoutGrid
                                    size={16}
                                    className="text-[#00b090]"
                                />
                                <h2 className="text-[14px] font-bold text-[#2f3344]">
                                    Classification
                                </h2>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-[#727586] uppercase tracking-wider ml-0.5">
                                        Target Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full h-[45px] px-4 bg-white border border-[#e3e4e8] rounded-[8px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7] appearance-none cursor-pointer transition-all"
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.category_id && (
                                        <p className="text-red-500 text-[11px] font-medium mt-1">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-[#2f3344] p-6 rounded-[12px] shadow-sm text-white space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-[15px] font-bold">
                                    Update Article
                                </h3>
                                <p className="text-[11px] text-slate-400">
                                    Save changes to publish the updated version.
                                </p>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="w-full bg-[#2c8af8] text-white py-3 rounded-[8px] font-bold text-[14px] hover:bg-[#1a7ae8] transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                {processing ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
