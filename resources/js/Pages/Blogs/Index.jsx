import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Footer from '@/Components/Landing/Footer';
import { Bookmark, Share2, MoreHorizontal, ThumbsUp, MessageSquare, ExternalLink, Globe, Layout, Code, Zap, Clock, Calendar, Send, BookOpen, GraduationCap, ChevronDown, ArrowRight, Repeat2 } from 'lucide-react';

export default function Index({ blogs, currentCategory, otherTutorials, auth, currentSort }) {
    const [isSortOpen, setIsSortOpen] = React.useState(false);
    const [sort, setSort] = React.useState(currentSort ? (currentSort.charAt(0).toUpperCase() + currentSort.slice(1)) : 'Recent');

    const handleSort = (type) => {
        setSort(type);
        setIsSortOpen(false);
        router.get(route('blogs.index'), { category: currentCategory, sort: type.toLowerCase() }, { preserveState: true });
    };

    return (
        <div className="min-h-screen font-['-apple-system,_system-ui,_BlinkMacSystemFont,_Segoe_UI,_Roboto,_Helvetica_Neue,_Arial,_sans-serif'] text-[rgba(0,0,0,0.9)]">
            <Head title={`Savanihd Blogs - ${currentCategory || 'All Tutorials'}`} />
            
            <Navbar auth={auth} />

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Left Sidebar - LinkedIn Profile */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="bg-white rounded-lg overflow-hidden border border-[#e0e0e0] shadow-sm sticky top-24">
                                <div className="h-20 bg-gradient-to-r from-[#0073B1] to-[#014E7A]"></div>
                                <div className="px-5 pb-5">
                                    <div className="relative -mt-10 mb-4 flex justify-center">
                                        <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                                            <img 
                                                src="https://avatars.githubusercontent.com/u/12028608?v=4" 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center pb-5 border-b border-[#f0f0f0]">
                                        <h3 className="text-lg font-semibold text-[rgba(0,0,0,0.9)] hover:underline cursor-pointer leading-tight">Savanihd Skills</h3>
                                        <p className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal leading-tight mt-2">Full Stack Architect & Technical Mentor</p>
                                    </div>
                                    <div className="py-4 space-y-4">
                                        <div className="flex justify-between items-center group cursor-pointer text-xs font-semibold">
                                            <span className="text-[rgba(0,0,0,0.6)] group-hover:text-[#0a66c2]">Profile viewers</span>
                                            <span className="text-[#0a66c2]">1,245</span>
                                        </div>
                                        <div className="flex justify-between items-center group cursor-pointer text-xs font-semibold">
                                            <span className="text-[rgba(0,0,0,0.6)] group-hover:text-[#0a66c2]">Post impressions</span>
                                            <span className="text-[#0a66c2]">18,502</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Feed - LinkedIn Article Cards */}
                        <div className="lg:col-span-6 space-y-4">
                            <div className="bg-white px-5 py-3 rounded-lg border border-[#e0e0e0] shadow-sm flex items-center justify-between">
                                <h1 className="text-[13px] font-semibold text-[rgba(0,0,0,0.9)] tracking-tight">
                                    {currentCategory ? `Topics: ${currentCategory}` : 'Recent Professional Articles'}
                                </h1>
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center gap-1 text-[13px] font-semibold text-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.04)] px-2 py-1 rounded transition-all"
                                    >
                                        Sort by: <span className="text-[rgba(0,0,0,0.9)] flex items-center gap-0.5 font-bold ml-1">{sort} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} /></span>
                                    </button>

                                    {isSortOpen && (
                                        <>
                                            <div className="fixed inset-0 z-[60]" onClick={() => setIsSortOpen(false)}></div>
                                            <div className="absolute right-0 mt-2 w-44 bg-white border border-[#e0e0e0] shadow-xl rounded-lg py-1.5 z-[70] animate-in fade-in zoom-in duration-200">
                                                {['Top', 'Recent'].map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleSort(type)}
                                                        className={`w-full text-left px-4 py-2 text-[14px] font-semibold transition-all ${sort === type ? 'bg-[#EBF4FE] text-[#0a66c2]' : 'text-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.04)] hover:text-[rgba(0,0,0,0.9)]'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <article key={blog.id} className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden flex flex-col hover:border-[#d0d0d0] transition-all group">
                                        {/* Post Header */}
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-2.5">
                                                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                                                    <img src="https://avatars.githubusercontent.com/u/12028608?v=4" alt="Savanihd" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center space-x-1.5">
                                                        <span className="text-[15px] font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline cursor-pointer truncate">Savanihd Skills</span>
                                                        <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-normal whitespace-nowrap">• 1st</span>
                                                    </div>
                                                    <p className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal truncate leading-none mt-0.5">Software Architect & Mentor</p>
                                                    <div className="flex items-center space-x-1.5 mt-1.5">
                                                        <span className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal">{new Date(blog.created_at).toLocaleDateString()}</span>
                                                        <span className="text-[rgba(0,0,0,0.4)]">•</span>
                                                        <Globe className="w-3.5 h-3.5 text-[rgba(0,0,0,0.6)]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="text-[rgba(0,0,0,0.6)] hover:bg-[#F3F3F3] p-2.5 rounded-full transition-colors flex-shrink-0">
                                                <MoreHorizontal className="w-6 h-6" />
                                            </button>
                                        </div>

                                        {/* Brief Content */}
                                        <div className="px-4 pb-4">
                                            <p className="text-[14px] text-[rgba(0,0,0,0.9)] leading-normal font-normal line-clamp-3">
                                                {blog.content?.replace(/<[^>]*>/g, '').substring(0, 240)}...
                                            </p>
                                        </div>

                                        {/* Card Style Content */}
                                        <Link href={route('blogs.show', blog.slug)} className="block border-y border-[#F0F0F0] overflow-hidden group">
                                            <div className="relative aspect-[1.91/1] overflow-hidden bg-[#F3F2EF]">
                                                <img 
                                                    src={blog.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'} 
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-5 bg-white group-hover:bg-[rgba(0,0,0,0.02)] transition-colors border-t border-[#F0F0F0]">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="text-[11px] text-[#0a66c2] font-semibold uppercase tracking-wider">savanihd.com</span>
                                                    <span className="text-[#F0F0F0] font-black">•</span>
                                                    <span className="text-[11px] text-[rgba(0,0,0,0.6)] font-semibold uppercase tracking-wider">{blog.category?.name}</span>
                                                </div>
                                                <h2 className="text-[18px] font-semibold text-[rgba(0,0,0,0.9)] leading-tight group-hover:underline tracking-tight">
                                                    {blog.title}
                                                </h2>
                                            </div>
                                        </Link>

                                        {/* Stats */}
                                        <div className="px-4 py-2.5 flex items-center justify-between text-[12px] text-[rgba(0,0,0,0.6)] font-normal">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="flex -space-x-1">
                                                    <div className="w-4.5 h-4.5 rounded-full bg-[#378FE9] flex items-center justify-center border-2 border-white shadow-sm z-10">
                                                        <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
                                                    </div>
                                                    <div className="w-4.5 h-4.5 rounded-full bg-[#DF704D] flex items-center justify-center border-2 border-white shadow-sm">
                                                        <span className="text-[7.5px] text-white">❤️</span>
                                                    </div>
                                                </div>
                                                <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">1.2k • 85 comments</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">12 reposts</span>
                                            </div>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="px-2 py-1 flex items-center border-t border-[#F0F0F0]">
                                            {[
                                                { icon: ThumbsUp, label: 'Like' },
                                                { icon: MessageSquare, label: 'Comment' },
                                                { icon: Share2, label: 'Repost' },
                                                { icon: Send, label: 'Send' }
                                            ].map((action, i) => (
                                                <button key={i} className="flex-1 flex items-center justify-center space-x-1.5 p-3 text-[rgba(0,0,0,0.6)] font-semibold hover:bg-[#F3F3F3] rounded-md transition-all text-sm group">
                                                    <action.icon className="w-5 h-5 group-hover:text-[#0a66c2]" />
                                                    <span className="group-hover:text-[#0a66c2]">{action.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="bg-white rounded-lg p-20 text-center border border-[#e0e0e0]">
                                    <h3 className="text-[rgba(0,0,0,0.4)] font-semibold text-lg">No posts available here.</h3>
                                    <p className="text-[rgba(0,0,0,0.6)] text-sm font-normal mt-2">Try selecting another topic.</p>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar - Widgets */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-4">
                                
                                {/* OTHER TUTORIALS */}
                                <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden text-sm">
                                    <div className="p-4 border-b border-[#f0f0f0] flex items-center justify-between">
                                        <h3 className="text-[16px] font-semibold text-[rgba(0,0,0,0.9)]">Recent Guides</h3>
                                        <BookOpen className="w-4 h-4 text-[rgba(0,0,0,0.6)]" />
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {otherTutorials && otherTutorials.length > 0 ? (
                                            otherTutorials.map((tut, i) => (
                                                <Link key={i} href={route('blogs.show', tut.slug)} className="group block border-b border-[#f9f9f9] pb-4 last:border-0 last:pb-0">
                                                    <h4 className="text-[14px] font-semibold text-[rgba(0,0,0,0.9)] leading-tight group-hover:text-[#0a66c2] group-hover:underline line-clamp-2">{tut.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1.5 text-[12px] text-[rgba(0,0,0,0.6)] font-normal">
                                                        <span className="text-[#0a66c2] font-semibold">{tut.category?.name}</span>
                                                        <span className="text-[rgba(0,0,0,0.2)]">•</span>
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>5 min</span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-[rgba(0,0,0,0.4)] font-medium italic text-center">No other tutorials found.</p>
                                        )}
                                    </div>
                                    <button className="w-full p-3.5 bg-white text-[14px] font-semibold text-[#0a66c2] hover:bg-[#EBF4FE] transition-colors border-t border-[#f0f0f0]">
                                        View all guides
                                    </button>
                                </div>

                                {/* Newsletter Widget */}
                                <div className="bg-[#0a66c2] rounded-lg p-5 shadow-lg overflow-hidden relative group">
                                    <div className="relative z-10 text-white">
                                        <h4 className="font-semibold text-[16px] mb-1">Engineering Sync</h4>
                                        <p className="text-[12px] font-normal leading-relaxed mb-4 text-[#C9E7FF]">Get senior-level insights in your inbox.</p>
                                        <div className="space-y-3">
                                            <input type="email" placeholder="dev@example.com" className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/40 outline-none" />
                                            <button className="w-full bg-white text-[#0a66c2] py-2 rounded-md font-semibold text-[13px] hover:bg-gray-50 transition-colors">
                                                Subscribe Now
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                                </div>

                                {/* Minimal Footer */}
                                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] text-[rgba(0,0,0,0.6)] font-normal px-2 pt-2">
                                    <span className="hover:underline cursor-pointer">About</span>
                                    <span className="hover:underline cursor-pointer">Terms</span>
                                    <span className="hover:underline cursor-pointer">Privacy</span>
                                    <span className="hover:underline cursor-pointer">Contact</span>
                                    <div className="w-full text-center mt-4 flex items-center justify-center space-x-2 opacity-80">
                                        <div className="flex items-center">
                                            <div className="bg-[#0a66c2] p-1 rounded-sm">
                                                <div className="w-3.5 h-3.5 flex items-center justify-center text-white font-black text-[9px] italic">CW</div>
                                            </div>
                                            <span className="ml-1 text-[12px] font-black text-[#0a66c2] tracking-tighter uppercase">Skills</span>
                                        </div>
                                        <span className="text-[12px] text-[rgba(0,0,0,0.6)]">© 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
