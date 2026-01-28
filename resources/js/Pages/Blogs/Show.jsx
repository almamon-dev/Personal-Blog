import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Footer from '@/Components/Landing/Footer';
import { Share2, Clock, Calendar, ChevronLeft, ChevronDown, ThumbsUp, MessageSquare, Send, Globe, Bookmark, MoreHorizontal, Copy, Check, Zap, BookOpen, ArrowRight, Repeat2, UserPlus } from 'lucide-react';
import 'github-markdown-css/github-markdown-light.css';

export default function Show({ blog, relatedBlogs, auth }) {
    const [scrolled, setScrolled] = useState(0);
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('blogs.comments.store', blog.slug), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
        });
    };

    const scrollToComments = () => {
        document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = 'scrollTop',
                  sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setScrolled(percent);
        };

        window.addEventListener('scroll', handleScroll);
        
        const setupCopyButtons = () => {
            const preBlocks = document.querySelectorAll('pre.ql-syntax');
            preBlocks.forEach((pre) => {
                if (pre.parentElement.classList.contains('code-block-container')) return;
                const container = document.createElement('div');
                container.className = 'code-block-container my-8 rounded-lg border border-[#30363d] overflow-hidden bg-[#0d1117] shadow-xl';
                const header = document.createElement('div');
                header.className = 'flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]';
                const label = document.createElement('span');
                label.className = 'text-[11px] font-bold text-[#8b949e] uppercase tracking-[0.2em]';
                label.innerText = 'Technical Source';
                const copyBtn = document.createElement('button');
                copyBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-[12px] font-bold text-[#c9d1d9] hover:text-white transition-all cursor-pointer border border-[#30363d] rounded-md bg-[#21262d] hover:bg-[#30363d]';
                copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> <span>Copy</span>';
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(pre.innerText).then(() => {
                        const originalHtml = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span class="text-[#3fb950]">Copied!</span>';
                        setTimeout(() => copyBtn.innerHTML = originalHtml, 2000);
                    });
                };
                header.appendChild(label);
                header.appendChild(copyBtn);
                pre.parentNode.insertBefore(container, pre);
                container.appendChild(header);
                container.appendChild(pre);
                pre.style.margin = '0';
                pre.style.backgroundColor = 'transparent';
                pre.style.border = 'none';
                pre.style.color = '#e6edf3';
                pre.style.padding = '1.5rem';
                pre.style.fontSize = '15px';
                pre.style.lineHeight = '1.6';
                pre.style.fontFamily = '"Fira Code", monospace';
            });
        };
        const timer = setTimeout(setupCopyButtons, 500);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [blog.content]);

    return (
        <div className="min-h-screen font-['-apple-system,system-ui,BlinkMacSystemFont,Segoe_UI,Roboto,Helvetica_Neue,Arial,sans-serif'] text-[rgba(0,0,0,0.9)]">
            <Head title={blog.title} />
            <Navbar auth={auth} />

            {/* Premium Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[100]">
                <div className="h-full bg-[#0a66c2]" style={{ width: `${scrolled}%` }}></div>
            </div>

            <main className="py-8">
                <div className="max-w-[1128px] mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Alternative Sticky Sidebar - Minimal Navigator */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-[92px] space-y-4">
                                <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
                                    <div className="p-5">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#0a66c2] ring-offset-2">
                                                <img src="https://avatars.githubusercontent.com/u/12028608?v=4" alt="Savanihd" />
                                            </div>
                                            <div>
                                                <h3 className="text-[15px] font-bold text-[rgba(0,0,0,0.9)]">Savanihd Skills</h3>
                                                <p className="text-[12px] text-[rgba(0,0,0,0.6)] font-normal">Technical Mentor</p>
                                            </div>
                                        </div>
                                        <button className="w-full flex items-center justify-center space-x-2 bg-[#0a66c2] text-white py-1.5 rounded-full font-bold text-[14px] hover:bg-[#004182] transition-all">
                                            <UserPlus className="w-4 h-4" />
                                            <span>Follow</span>
                                        </button>
                                    </div>
                                    <div className="border-t border-[#f3f3f3] p-4 bg-[#F9FAFB]">
                                        <div className="flex items-center text-[12px] font-bold text-[rgba(0,0,0,0.6)] mb-3">
                                            <Zap className="w-4 h-4 text-[#C37D16] mr-2" />
                                            ENGINEERING STATS
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[13px] font-medium">
                                                <span className="text-[rgba(0,0,0,0.6)]">Articles</span>
                                                <span className="text-[#0a66c2] font-bold">42</span>
                                            </div>
                                            <div className="flex justify-between text-[13px] font-medium">
                                                <span className="text-[rgba(0,0,0,0.6)]">Readers</span>
                                                <span className="text-[#0a66c2] font-bold">128k</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/50 rounded-lg border border-[#e0e0e0] text-center">
                                    <p className="text-[11px] font-bold text-[rgba(0,0,0,0.4)] tracking-[0.1em] uppercase">Advertisement</p>
                                    <div className="mt-2 text-[13px] font-semibold text-[#0a66c2] cursor-pointer hover:underline">Support our education platform</div>
                                </div>
                            </div>
                        </div>

                        {/* Middle - High-End Center Article Layout */}
                        <div className="lg:col-span-6">
                            <article className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden flex flex-col">
                                {/* Large Full-Width Media Header */}
                                <div className="w-full relative aspect-[21/9] bg-[#F3F2EF] border-b border-[#e0e0e0]">
                                    <img 
                                        src={blog.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200'} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#0a66c2] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded">Article</span>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <div className="px-5 lg:px-10 py-10">
                                    <div className="flex items-center space-x-2 text-[12px] font-bold text-[#0a66c2] uppercase tracking-[0.1em] mb-4">
                                        <BookOpen className="w-4 h-4" />
                                        <span>Published in {blog.category?.name}</span>
                                    </div>

                                    <h1 className="text-[28px] lg:text-[36px] font-bold text-[rgba(0,0,0,0.9)] leading-[1.2] mb-6 tracking-tight">
                                        {blog.title}
                                    </h1>

                                    {/* Author & Meta Row */}
                                    <div className="flex items-center justify-between pb-8 border-b border-[#f3f3f3] mb-10">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#e0e0e0]">
                                                <img src="https://avatars.githubusercontent.com/u/12028608?v=4" alt="Savanihd" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <span className="text-[14px] font-bold text-[rgba(0,0,0,0.9)] hover:underline cursor-pointer">Savanihd Skills</span>
                                                    <span className="text-[13px] text-[rgba(0,0,0,0.6)] ml-1 font-normal">• 1st</span>
                                                </div>
                                                <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.6)] font-normal gap-2">
                                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-[rgba(0,0,0,0.6)] hover:bg-[#F3F3F3] rounded-full transition-all"><Bookmark className="w-5 h-5" /></button>
                                            <button className="p-2 text-[rgba(0,0,0,0.6)] hover:bg-[#F3F3F3] rounded-full transition-all"><Share2 className="w-5 h-5" /></button>
                                        </div>
                                    </div>

                                    {/* Content Style refinement */}
                                    <div className="prose-wrapper">
                                        <style>{`
                                            .markdown-body {
                                                color: rgba(0,0,0,0.85) !important;
                                                font-size: 21px !important;
                                                line-height: 1.85 !important;
                                                font-family: Georgia, serif !important; /* Premium Editorial Font */
                                            }
                                            .markdown-body h2 {
                                                font-size: 30px !important;
                                                font-weight: 700 !important;
                                                margin-top: 3.5rem !important;
                                                color: rgba(0,0,0,0.9) !important;
                                                font-family: -apple-system, system-ui, sans-serif !important;
                                            }
                                            .markdown-body h3 {
                                                font-size: 24px !important;
                                                font-weight: 700 !important;
                                                margin-top: 2.5rem !important;
                                                font-family: -apple-system, system-ui, sans-serif !important;
                                            }
                                            .markdown-body blockquote {
                                                border-left: 5px solid #0a66c2 !important;
                                                background: #F9FAFB !important;
                                                padding: 2rem !important;
                                                margin: 3rem 0 !important;
                                                color: rgba(0,0,0,0.7) !important;
                                                font-size: 24px !important;
                                                font-style: italic !important;
                                                border-radius: 0 12px 12px 0 !important;
                                            }
                                            .markdown-body strong { font-weight: 700 !important; color: black !important; }
                                            .markdown-body p { margin-bottom: 2rem !important; }
                                        `}</style>
                                        <div 
                                            className="markdown-body !bg-transparent"
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>
                                </div>

                                {/* Modern High-Density Interaction Bar */}
                                <div className="px-6 py-2 border-t border-[#F0F0F0] flex items-center justify-between text-[rgba(0,0,0,0.6)] font-bold text-sm bg-[#F9FAFB]">
                                    <div className="flex items-center space-x-6">
                                        <button className="flex items-center space-x-2 py-3 hover:text-[#0a66c2] transition-all group">
                                            <ThumbsUp className="w-5 h-5 group-active:scale-125 transition-transform" />
                                            <span>Like</span>
                                        </button>
                                        <button onClick={scrollToComments} className="flex items-center space-x-2 py-3 hover:text-[#0a66c2] transition-all group">
                                            <MessageSquare className="w-5 h-5" />
                                            <span>Comment</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button className="flex items-center space-x-2 py-3 hover:text-[#0a66c2] transition-all group">
                                            <Repeat2 className="w-5 h-5" />
                                            <span>Repost</span>
                                        </button>
                                        <button className="flex items-center space-x-2 py-3 hover:text-[#0a66c2] transition-all group">
                                            <Send className="w-5 h-5" />
                                            <span>Send</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Redesigned Threaded Comments */}
                            <section id="comments-section" className="mt-4 bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden mb-12">
                                <div className="px-6 py-6 font-semibold border-b border-[#f3f3f3] flex items-center justify-between">
                                    <span className="text-[rgba(0,0,0,0.9)]">Professional Discussion</span>
                                    <span className="text-[#0a66c2] text-[13px] cursor-pointer flex items-center uppercase tracking-wider">Top <ChevronDown className="w-4 h-4 ml-1" /></span>
                                </div>
                                
                                <div className="p-6">
                                    {auth.user ? (
                                        <form onSubmit={submitComment} className="flex gap-4 mb-10">
                                            <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#e0e0e0]">
                                                <img src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=random`} alt={auth.user.name} />
                                            </div>
                                            <div className="flex-1">
                                                <textarea 
                                                    value={data.body}
                                                    onChange={(e) => setData('body', e.target.value)}
                                                    placeholder="Add to the professional conversation..."
                                                    className="w-full border-[1.5px] border-[#ced4da] rounded-xl px-4 py-3 text-[15px] focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] transition-all resize-none min-h-[56px] leading-relaxed placeholder:text-[#adb5bd]"
                                                    rows="2"
                                                ></textarea>
                                                <div className="flex justify-start mt-3">
                                                    <button type="submit" disabled={processing || !data.body.trim()} className={`px-6 py-2 rounded-full font-bold text-[14px] transition-all ${data.body.trim() ? "bg-[#0a66c2] text-white hover:bg-[#004182]" : "bg-[#f3f3f3] text-[rgba(0,0,0,0.25)] cursor-not-allowed"}`}>
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="text-center py-8 bg-[#F9FAFB] rounded-xl mb-10 border border-dashed border-[#e0e0e0]">
                                            <p className="text-[15px] text-[rgba(0,0,0,0.6)] font-medium">Join the discussion: <Link href={route('login')} className="text-[#0a66c2] font-bold hover:underline">Log In</Link></p>
                                        </div>
                                    )}

                                    <div className="space-y-10">
                                        {blog.comments?.map((comment) => (
                                            <div key={comment.id} className="relative group">
                                                <div className="flex gap-4 relative z-10">
                                                    <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#e0e0e0]">
                                                        <img src={`https://ui-avatars.com/api/?name=${comment.user?.name}&background=random`} alt={comment.user?.name} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="bg-[#F8F9FA] px-5 py-4 rounded-2xl rounded-tl-none border border-[#eef0f2] transition-all group-hover:bg-[#F0F2F5] hover:border-[#dee2e6]">
                                                            <div className="flex justify-between">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[14px] font-bold text-[rgba(0,0,0,0.9)] hover:underline cursor-pointer">{comment.user?.name}</span>
                                                                    <span className="text-[12px] text-[rgba(0,0,0,0.5)] font-normal leading-tight mt-0.5">Contributor | CW Engineering</span>
                                                                </div>
                                                                <span className="text-[12px] text-[rgba(0,0,0,0.4)] font-normal">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="mt-4 text-[15px] text-[rgba(0,0,0,0.85)] leading-relaxed font-normal">{comment.body}</div>
                                                        </div>
                                                        <div className="flex items-center space-x-4 mt-2 ml-4 text-[13px] font-bold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">
                                                            <button className="hover:text-[#0a66c2] scale-95 hover:scale-100 transition-all">Like</button>
                                                            <span className="w-1 h-1 bg-[rgba(0,0,0,0.15)] rounded-full"></span>
                                                            <button className="hover:text-[#0a66c2] scale-95 hover:scale-100 transition-all">Reply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(!blog.comments || blog.comments.length === 0) && (
                                            <div className="text-center py-10 text-[rgba(0,0,0,0.45)]">
                                                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                                <p className="font-semibold italic">Insightful conversation starts here.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar - Alternative Widget Design */}
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-[92px] space-y-4">
                                <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm p-5">
                                    <h4 className="text-[14px] font-bold text-[rgba(0,0,0,0.9)] mb-6 uppercase tracking-[0.1em] flex items-center justify-between">
                                        Popular Guides
                                        <ArrowRight className="w-4 h-4 text-[#0a66c2]" />
                                    </h4>
                                    <div className="space-y-6">
                                        {relatedBlogs?.slice(0, 3).map((rBlog) => (
                                            <Link key={rBlog.id} href={route('blogs.show', rBlog.slug)} className="group block">
                                                <div className="flex items-start justify-between">
                                                    <h5 className="text-[14px] font-bold text-[rgba(0,0,0,0.8)] group-hover:text-[#0a66c2] leading-tight line-clamp-2 transition-colors">{rBlog.title}</h5>
                                                    <span className="text-[10px] bg-[#eef3f8] text-[#0a66c2] px-1.5 py-0.5 rounded ml-2 whitespace-nowrap uppercase tracking-tighter">NEW</span>
                                                </div>
                                                <div className="mt-2.5 flex items-center text-[11px] text-[rgba(0,0,0,0.5)] font-bold uppercase tracking-widest gap-2">
                                                    <span>{rBlog.category?.name}</span>
                                                    <span>•</span>
                                                    <span>4 min read</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href={route('blogs.index')} className="w-full mt-8 block text-center border-[1.5px] border-[#0a66c2] text-[#0a66c2] py-2 rounded-full font-bold text-[14px] hover:bg-[#EBF4FE] transition-all">
                                        Browse Library
                                    </Link>
                                </div>
                                <div className="rounded-lg bg-gradient-to-br from-[#161b22] to-[#0d1117] p-6 text-white text-center shadow-xl">
                                    <Zap className="w-10 h-10 text-[#D29922] mx-auto mb-4" />
                                    <h4 className="text-lg font-bold mb-2">Technical Circle</h4>
                                    <p className="text-[12px] text-[#8b949e] mb-5">Master Laravel & React architecture at scale.</p>
                                    <button className="w-full bg-[#3fb950] text-[#0d1117] py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#2ea043] transition-all uppercase tracking-widest active:scale-95">JOIN NOW</button>
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
