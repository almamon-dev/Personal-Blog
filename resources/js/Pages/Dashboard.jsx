import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    FileText,
    FolderTree,
    Users,
    Plus,
    ArrowUpRight,
    Clock,
    Eye,
    MessageSquare,
    ThumbsUp,
    ChevronRight,
    Home,
    Zap,
    TrendingUp,
    BarChart3,
} from "lucide-react";

export default function Dashboard({ auth, stats }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Top Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            Platform Overview
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} className="text-[#727586]" />
                            <span className="text-[#c3c4ca]">-</span>
                            <span className="text-[#673ab7] font-semibold">
                                Dashboard
                            </span>
                        </div>
                    </div>
                    <Link
                        href={route("admin.blogs.create")}
                        className="inline-flex items-center bg-[#673ab7] text-white px-5 py-[10px] rounded-[8px] font-bold text-[14px] hover:bg-[#5e35b1] transition-all shadow-sm"
                    >
                        <Plus size={18} className="mr-2" />
                        New Article
                    </Link>
                </div>

                {/* Promo / Welcome Banner */}
                <div className="relative bg-[#f4f0ff] rounded-[16px] p-8 border border-[#e9e3ff] overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-[#673ab7] text-white p-1.5 rounded-lg shadow-sm">
                                    <Zap size={14} fill="currentColor" />
                                </div>
                                <span className="text-[12px] font-bold text-[#673ab7] uppercase tracking-wider">
                                    Active Insights
                                </span>
                            </div>
                            <h2 className="text-[24px] font-extrabold text-[#2f3344] mb-2">
                                Welcome back, {auth.user.name.split(" ")[0]}!
                            </h2>
                            <p className="text-[15px] text-[#727586] leading-relaxed">
                                Your platform is performing well. We've noticed
                                a significant increase in engagement on your
                                latest architectural guides. Keep up the great
                                work!
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#e9e3ff] flex items-center gap-6">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">
                                        Growth
                                    </span>
                                    <span className="text-[20px] font-black text-[#00b090]">
                                        +24%
                                    </span>
                                </div>
                                <div className="w-[1px] h-10 bg-slate-100" />
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] uppercase font-bold text-slate-400">
                                        Score
                                    </span>
                                    <span className="text-[20px] font-black text-[#673ab7]">
                                        98.2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Abstract design elements */}
                    <div className="absolute right-[-50px] top-[-50px] w-64 h-64 bg-[#673ab7] opacity-[0.03] rounded-full blur-3xl" />
                    <div className="absolute left-[-30px] bottom-[-30px] w-48 h-48 bg-[#673ab7] opacity-[0.05] rounded-full blur-2xl" />
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Total Articles",
                            value: stats.total_blogs,
                            icon: FileText,
                            color: "text-[#673ab7]",
                            bg: "bg-[#f4f0ff]",
                            dynamicTrend: "+Live",
                        },
                        {
                            label: "Platform Categories",
                            value: stats.total_categories,
                            icon: FolderTree,
                            color: "text-[#00b090]",
                            bg: "bg-[#e6fcf5]",
                            dynamicTrend: "+Ready",
                        },
                        {
                            label: "Registered Users",
                            value: stats.total_users,
                            icon: Users,
                            color: "text-[#ffb000]",
                            bg: "bg-[#fff9db]",
                            dynamicTrend: "+Active",
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-7 rounded-[14px] border border-[#e3e4e8] shadow-sm hover:shadow-md transition-all group lg:relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-[32px] font-extrabold text-[#2f3344] leading-tight">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div
                                    className={`${stat.bg} ${stat.color} p-4 rounded-[12px] group-hover:scale-110 transition-transform shadow-sm`}
                                >
                                    <stat.icon size={22} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between text-[13px] relative z-10">
                                <div className="flex items-center gap-1 font-bold text-[#00b090]">
                                    <TrendingUp size={14} />
                                    <span>{stat.dynamicTrend}</span>
                                </div>
                                <span className="text-slate-400 font-medium">
                                    Current total
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Second Stats Row for Engagement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            label: "Total Engagement (Likes)",
                            value: stats.total_likes,
                            icon: ThumbsUp,
                            color: "text-[#378FE9]",
                            bg: "bg-[#e8f2ff]",
                            description:
                                "Total positive reactions across articles",
                        },
                        {
                            label: "Community Discussion",
                            value: stats.total_comments,
                            icon: MessageSquare,
                            color: "text-[#673ab7]",
                            bg: "bg-[#f4f0ff]",
                            description: "Active comments and discussions",
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[14px] border border-[#e3e4e8] shadow-sm flex items-center gap-5 transition-all hover:border-[#673ab7]"
                        >
                            <div
                                className={`${stat.bg} ${stat.color} p-4 rounded-xl`}
                            >
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-[28px] font-black text-[#2f3344] leading-tight">
                                    {stat.value}
                                </h4>
                                <p className="text-[13px] font-bold text-slate-400">
                                    {stat.label}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Recent Activity Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-[16px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#f1f2f4] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-50 text-slate-400 p-2 rounded-lg">
                                        <Clock size={18} />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-[#2f3344]">
                                        Recently Published
                                    </h3>
                                </div>
                                <Link
                                    href={route("admin.blogs.index")}
                                    className="text-[13px] font-bold text-[#673ab7] hover:underline flex items-center gap-1"
                                >
                                    View Repository <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#fafbfc] border-b border-[#f1f2f4]">
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                Article Info
                                            </th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                                                Engagement
                                            </th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                                                Published At
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f1f2f4]">
                                        {stats.latest_blogs.map((blog) => (
                                            <tr
                                                key={blog.id}
                                                className="hover:bg-[#fafbfc] transition-colors group cursor-pointer"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                                            <img
                                                                src={blog.image}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[14px] font-bold text-[#2f3344] group-hover:text-[#673ab7] truncate">
                                                                {blog.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-[10px] font-bold text-[#673ab7] uppercase tracking-wider bg-[#f4f0ff] px-1.5 py-0.5 rounded">
                                                                    {
                                                                        blog
                                                                            .category
                                                                            ?.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-4 text-slate-400">
                                                        <div className="flex items-center gap-1 text-[12px] font-bold">
                                                            <ThumbsUp
                                                                size={14}
                                                                className="text-[#378FE9]"
                                                            />{" "}
                                                            {blog.likes_count ||
                                                                0}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[12px] font-bold">
                                                            <MessageSquare
                                                                size={14}
                                                                className="text-[#673ab7]"
                                                            />{" "}
                                                            {blog.comments_count ||
                                                                0}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-[12px] font-medium text-slate-500">
                                                        {new Date(
                                                            blog.created_at,
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Performance Insights Sidebar */}
                    <div className="space-y-6">
                        {/* Analytical Stats */}
                        <div className="bg-white p-6 rounded-[16px] border border-[#e3e4e8] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-[15px] font-bold text-[#2f3344]">
                                    Platform Health
                                </h3>
                                <BarChart3
                                    className="text-slate-300"
                                    size={18}
                                />
                            </div>
                            <div className="space-y-6">
                                {[
                                    {
                                        label: "Global Reach",
                                        value: "4.2k",
                                        percent: 75,
                                        color: "#673ab7",
                                    },
                                    {
                                        label: "System Uptime",
                                        value: "99.9%",
                                        percent: 99,
                                        color: "#00b090",
                                    },
                                    {
                                        label: "Media Optimization",
                                        value: "High",
                                        percent: 85,
                                        color: "#ffb000",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[12px] font-bold">
                                            <span className="text-slate-500">
                                                {item.label}
                                            </span>
                                            <span className="text-[#2f3344]">
                                                {item.value}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${item.percent}%`,
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Interaction Card */}
                        <div className="bg-[#2f3344] p-6 rounded-[16px] shadow-xl relative overflow-hidden group">
                            <div className="relative z-10 text-white">
                                <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <ThumbsUp
                                        size={18}
                                        fill="currentColor"
                                        className="text-white"
                                    />
                                </div>
                                <h4 className="text-[16px] font-bold mb-1">
                                    Scale your reach
                                </h4>
                                <p className="text-slate-300 text-[13px] font-medium opacity-80 mb-4 leading-relaxed">
                                    Publish optimized technical articles to grow
                                    your audience and platform authority.
                                </p>
                                <Link
                                    href={route("admin.blogs.create")}
                                    className="inline-flex h-10 items-center justify-center bg-white text-[#2f3344] px-5 rounded-lg font-bold text-[13px] hover:bg-slate-50 transition-all"
                                >
                                    Draft New Article
                                </Link>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white transform -rotate-12 group-hover:scale-125 transition-transform">
                                <FileText size={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
