import React, { useState, useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Settings,
    Save,
    Globe,
    User,
    ArrowLeft,
    Youtube,
    MapPin,
    Users,
    Zap,
    Image as ImageIcon,
    Hash,
    Feather,
    CloudUpload,
    Mail,
    Phone,
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Briefcase,
    Github,
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function General({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: settings?.site_name || "",
        site_headline: settings?.site_headline || "",
        site_about: settings?.site_about || "",
        site_keywords: settings?.site_keywords || [],
        location: settings?.location || "",
        support_email: settings?.support_email || "",
        contact_phone: settings?.contact_phone || "",
        monthly_visitors: settings?.monthly_visitors || "",
        successful_students: settings?.successful_students || "",
        youtube_handle: settings?.youtube_handle || "",
        youtube_url: settings?.youtube_url || "",
        facebook_url: settings?.facebook_url || "",
        twitter_url: settings?.twitter_url || "",
        instagram_url: settings?.instagram_url || "",
        linkedin_url: settings?.linkedin_url || "",
        github_url: settings?.github_url || "",
        fiverr_url: settings?.fiverr_url || "",
        portfolio_url: settings?.portfolio_url || "",
        profile_image: settings?.profile_image || "",
        banner_image: settings?.banner_image || "",
    });

    const [keywordInput, setKeywordInput] = useState("");
    const profileInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    const addKeyword = (e) => {
        if (e.key === "Enter" && keywordInput.trim()) {
            e.preventDefault();
            if (!data.site_keywords.includes(keywordInput.trim())) {
                setData("site_keywords", [
                    ...data.site_keywords,
                    keywordInput.trim(),
                ]);
            }
            setKeywordInput("");
        }
    };

    const removeKeyword = (tag) => {
        setData(
            "site_keywords",
            data.site_keywords.filter((k) => k !== tag),
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we're sending files, we use post
        post(route("admin.settings.update"), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="General Settings" />

            <div className="space-y-6 max-w-[1000px] mx-auto pb-20">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#f4f0ff] p-2.5 rounded-xl">
                            <Settings className="text-[#673ab7]" size={24} />
                        </div>
                        <div>
                            <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                                General Settings
                            </h1>
                            <p className="text-[13px] text-[#727586]">
                                Configure your platform's identity and landing
                                page content
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-8"
                >
                    {/* Branding Section */}
                    <div className="bg-white rounded-[16px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#f1f2f4] flex items-center gap-3 bg-[#fafbfc]">
                            <Globe size={18} className="text-[#673ab7]" />
                            <h3 className="text-[15px] font-bold text-[#2f3344]">
                                Platform Identity
                            </h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_name}
                                        onChange={(e) =>
                                            setData("site_name", e.target.value)
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="Enter site name"
                                    />
                                    {errors.site_name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.site_name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                                        Site Headline
                                    </label>
                                    <input
                                        type="text"
                                        value={data.site_headline}
                                        onChange={(e) =>
                                            setData(
                                                "site_headline",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="Enter headline"
                                    />
                                    {errors.site_headline && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.site_headline}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                                    About the Blog
                                </label>
                                <div className="prose-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.site_about}
                                        onChange={(content) =>
                                            setData("site_about", content)
                                        }
                                        placeholder="Tell the world about your platform..."
                                        className="bg-white rounded-[8px] overflow-hidden border border-[#e3e4e8]"
                                    />
                                </div>
                                {errors.site_about && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.site_about}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">
                                    Keywords / Tags
                                </label>
                                <div className="flex flex-wrap gap-2 p-3 bg-[#fafbfc] border border-[#e3e4e8] rounded-xl">
                                    {data.site_keywords.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-white border border-[#e3e4e8] text-[#673ab7] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeKeyword(tag)
                                                }
                                                className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) =>
                                            setKeywordInput(e.target.value)
                                        }
                                        onKeyDown={addKeyword}
                                        className="bg-transparent border-none focus:ring-0 text-[13px] flex-1 min-w-[120px]"
                                        placeholder="Type and press Enter..."
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    These tags appear on your landing page
                                    banner.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Social Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Landing Page Stats */}
                        <div className="bg-white rounded-[16px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#f1f2f4] flex items-center gap-3 bg-[#fafbfc]">
                                <Zap size={18} className="text-[#ffb000]" />
                                <h3 className="text-[15px] font-bold text-[#2f3344]">
                                    Landing Stats
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Briefcase size={14} /> Portfolio URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.portfolio_url}
                                        onChange={(e) =>
                                            setData(
                                                "portfolio_url",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="https://myportfolio.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Github size={14} /> GitHub URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.github_url}
                                        onChange={(e) =>
                                            setData(
                                                "github_url",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Globe size={14} /> Fiverr URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.fiverr_url}
                                        onChange={(e) =>
                                            setData(
                                                "fiverr_url",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="https://fiverr.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <MapPin size={14} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="e.g. Dhaka, Bangladesh"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Mail size={14} /> Support Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.support_email}
                                            onChange={(e) =>
                                                setData(
                                                    "support_email",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="support@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Phone size={14} /> Contact Phone
                                        </label>
                                        <input
                                            type="text"
                                            value={data.contact_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_phone",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="+880 1xxx xxx xxx"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            Monthly Visitors
                                        </label>
                                        <input
                                            type="text"
                                            value={data.monthly_visitors}
                                            onChange={(e) =>
                                                setData(
                                                    "monthly_visitors",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="100k+"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            Students
                                        </label>
                                        <input
                                            type="text"
                                            value={data.successful_students}
                                            onChange={(e) =>
                                                setData(
                                                    "successful_students",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="5k+"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* YouTube Integration */}
                        <div className="bg-white rounded-[16px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#f1f2f4] flex items-center gap-3 bg-[#fafbfc]">
                                <Youtube size={18} className="text-red-600" />
                                <h3 className="text-[15px] font-bold text-[#2f3344]">
                                    Social Proof
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                                        YouTube Handle
                                    </label>
                                    <input
                                        type="text"
                                        value={data.youtube_handle}
                                        onChange={(e) =>
                                            setData(
                                                "youtube_handle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="@yourhandle"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                                        YouTube URL
                                    </label>
                                    <input
                                        type="text"
                                        value={data.youtube_url}
                                        onChange={(e) =>
                                            setData(
                                                "youtube_url",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Facebook size={14} /> Facebook URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.facebook_url}
                                            onChange={(e) =>
                                                setData(
                                                    "facebook_url",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="https://facebook.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Linkedin size={14} /> LinkedIn URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.linkedin_url}
                                            onChange={(e) =>
                                                setData(
                                                    "linkedin_url",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="https://linkedin.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Instagram size={14} /> Instagram
                                            URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.instagram_url}
                                            onChange={(e) =>
                                                setData(
                                                    "instagram_url",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Twitter size={14} /> Twitter URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.twitter_url}
                                            onChange={(e) =>
                                                setData(
                                                    "twitter_url",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full bg-[#fafbfc] border-[#e3e4e8] rounded-xl px-4 py-3 text-[14px] focus:ring-2 focus:ring-[#673ab7]/20 focus:border-[#673ab7] transition-all"
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assets Section */}
                    <div className="bg-white rounded-[16px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#f1f2f4] flex items-center gap-3 bg-[#fafbfc]">
                            <ImageIcon size={18} className="text-[#00b090]" />
                            <h3 className="text-[15px] font-bold text-[#2f3344]">
                                Visual Assets
                            </h3>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Profile Image
                                    </label>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#fafbfc] border border-[#e3e4e8] flex-shrink-0 relative group">
                                            {data.profile_image ? (
                                                <img
                                                    src={
                                                        typeof data.profile_image ===
                                                        "string"
                                                            ? data.profile_image
                                                            : URL.createObjectURL(
                                                                  data.profile_image,
                                                              )
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <User size={32} />
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    profileInputRef.current?.click()
                                                }
                                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                            >
                                                <CloudUpload size={20} />
                                            </button>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="file"
                                                ref={profileInputRef}
                                                className="hidden"
                                                onChange={(e) =>
                                                    setData(
                                                        "profile_image",
                                                        e.target.files[0],
                                                    )
                                                }
                                                accept="image/*"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    profileInputRef.current?.click()
                                                }
                                                className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all"
                                            >
                                                Upload New Profile
                                            </button>
                                            <p className="text-[11px] text-slate-400">
                                                Square image recommended (JPG,
                                                PNG)
                                            </p>
                                        </div>
                                    </div>
                                    {errors.profile_image && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.profile_image}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Banner Image
                                    </label>
                                    <div className="flex flex-col gap-3">
                                        <div
                                            onClick={() =>
                                                bannerInputRef.current?.click()
                                            }
                                            className="w-full h-24 rounded-xl overflow-hidden bg-slate-50 border-2 border-dashed border-[#e3e4e8] hover:border-[#673ab7] hover:bg-[#f4f0ff]/20 transition-all cursor-pointer group flex items-center justify-center relative"
                                        >
                                            {data.banner_image ? (
                                                <img
                                                    src={
                                                        typeof data.banner_image ===
                                                        "string"
                                                            ? data.banner_image
                                                            : URL.createObjectURL(
                                                                  data.banner_image,
                                                              )
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-slate-300 group-hover:text-[#673ab7]">
                                                    <CloudUpload size={24} />
                                                    <span className="text-[10px] font-bold mt-1">
                                                        Click to upload banner
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={bannerInputRef}
                                            className="hidden"
                                            onChange={(e) =>
                                                setData(
                                                    "banner_image",
                                                    e.target.files[0],
                                                )
                                            }
                                            accept="image/*"
                                        />
                                        <p className="text-[11px] text-slate-400">
                                            Horizontal banner image (Max 2MB)
                                        </p>
                                    </div>
                                    {errors.banner_image && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.banner_image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-4 p-6 bg-white border border-[#e3e4e8] rounded-[16px] shadow-sm">
                        <button
                            type="button"
                            className="px-6 py-2.5 text-slate-500 font-bold text-[14px] hover:text-[#2f3344] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#673ab7] text-white px-8 py-2.5 rounded-[10px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {processing
                                ? "Saving..."
                                : "Save Platform Settings"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function X({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
