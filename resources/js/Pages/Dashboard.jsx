import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { LayoutDashboard, FileText, FolderTree, Users, PlusCircle, ArrowUpRight, Clock, Eye, MessageSquare, ThumbsUp } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Insights</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-6 bg-[#F3F2EF] min-h-screen">
                <div className="max-w-[1128px] mx-auto sm:px-6 lg:px-8">
                    
                    {/* Welcome Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 leading-tight">Welcome back, {auth.user.name} 👋</h1>
                            <p className="text-sm font-bold text-gray-500 mt-1">Here's what's happening with your blog platform today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link 
                                href={route('admin.blogs.create')}
                                className="flex items-center bg-[#0a66c2] text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-[#004182] transition-all shadow-sm active:scale-95"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                New Article
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Total Articles', value: stats.total_blogs, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Categories', value: stats.total_categories, icon: FolderTree, color: 'text-purple-600', bg: 'bg-purple-50' },
                            { label: 'Total Users', value: stats.total_users, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h3>
                                    </div>
                                    <div className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs font-bold text-emerald-600">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    <span>+12% from last month</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Latest Blogs Table */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-2 text-[#0a66c2]" />
                                        Recently Published
                                    </h3>
                                    <Link href={route('admin.blogs.index')} className="text-[10px] font-bold text-[#0a66c2] hover:underline">View All</Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-wider">
                                            <tr>
                                                <th className="px-4 py-2">Article</th>
                                                <th className="px-4 py-2">Category</th>
                                                <th className="px-4 py-2">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {stats.latest_blogs.map((blog) => (
                                                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                                                <img src={blog.image} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[12px] font-bold text-gray-900 truncate group-hover:text-[#0a66c2]">{blog.title}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-[9px] font-black uppercase text-[#0a66c2] bg-blue-50 px-1.5 py-0.5 rounded">
                                                            {blog.category?.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-[10px] font-bold text-gray-500">
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions & Insights */}
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-4">Engagement</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Likes', value: '4.2k', icon: ThumbsUp, color: 'text-blue-500' },
                                        { label: 'Comments', value: '842', icon: MessageSquare, color: 'text-amber-500' },
                                        { label: 'Views', value: '12.5k', icon: Eye, color: 'text-purple-500' },
                                    ].map((insight, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`${insight.color} bg-current/10 p-1.5 rounded-lg`}>
                                                    <insight.icon className="w-3 h-3" />
                                                </div>
                                                <span className="text-[11px] font-bold text-gray-600">{insight.label}</span>
                                            </div>
                                            <span className="text-xs font-black text-gray-900">{insight.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#0a66c2] to-[#004182] p-4 rounded-xl shadow-lg relative overflow-hidden group">
                                <div className="relative z-10 text-white">
                                    <h4 className="font-black text-sm mb-1">Need help?</h4>
                                    <p className="text-blue-100 text-[10px] font-medium opacity-90 mb-3">Check our documentation for guides.</p>
                                    <button className="bg-white text-[#0a66c2] px-3 py-1.5 rounded-lg font-black text-[9px] hover:bg-gray-50 transition-all uppercase">
                                        Docs
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
