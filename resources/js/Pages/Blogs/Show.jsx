import React, { useState, useEffect } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Landing/Navbar";
import Footer from "@/Components/Landing/Footer";
import Modal from "@/Components/Modal";
import {
    Clock,
    ChevronDown,
    ThumbsUp,
    MessageSquare,
    Bookmark,
    Copy,
    Zap,
    BookOpen,
    ArrowRight,
    UserPlus,
    Lock,
    Share2,
    Twitter,
    Facebook,
    Linkedin,
    Calendar,
} from "lucide-react";
import "github-markdown-css/github-markdown-light.css";

export default function Show({ blog, relatedBlogs, auth }) {
    const [scrolled, setScrolled] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { props } = usePage();
    const settings = props.settings || {};
    const { data, setData, post, processing, reset } = useForm({
        body: "",
    });

    useEffect(() => {
        if (!auth.user) {
            const timer = setTimeout(() => {
                setShowLoginModal(true);
            }, 30000); // Increased to 30s for better UX
            return () => clearTimeout(timer);
        }
    }, [auth.user]);

    const submitComment = (e) => {
        e.preventDefault();
        post(route("blogs.comments.store", blog.slug), {
            preserveScroll: true,
            onSuccess: () => reset("body"),
        });
    };

    const scrollToComments = () => {
        document
            .getElementById("comments-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement,
                b = document.body,
                st = "scrollTop",
                sh = "scrollHeight";
            const percent =
                ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
            setScrolled(percent);
        };

        window.addEventListener("scroll", handleScroll);

        // Enhanced code block setup
        const setupCodeBlocks = () => {
            document.querySelectorAll(".markdown-body pre").forEach((pre) => {
                if (
                    pre.parentElement.classList.contains("code-block-container")
                )
                    return;

                const container = document.createElement("div");
                container.className =
                    "code-block-container my-8 rounded-xl border border-gray-800 overflow-hidden bg-[#0F1117] shadow-2xl relative group";

                const header = document.createElement("div");
                header.className =
                    "flex items-center justify-between px-4 py-3 bg-[#1A1D23] border-b border-gray-800";

                const dots = document.createElement("div");
                dots.className = "flex space-x-2";
                dots.innerHTML =
                    '<span class="w-3 h-3 rounded-full bg-[#FF5F57]"></span><span class="w-3 h-3 rounded-full bg-[#FEBC2E]"></span><span class="w-3 h-3 rounded-full bg-[#28C840]"></span>';

                const langLabel = document.createElement("span");
                langLabel.className =
                    "text-xs font-mono text-gray-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2";
                langLabel.innerText = "CODE";

                const copyBtn = document.createElement("button");
                copyBtn.className =
                    "text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10";
                copyBtn.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(pre.innerText).then(() => {
                        const originalHtml = copyBtn.innerHTML;
                        copyBtn.innerHTML =
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                        setTimeout(
                            () => (copyBtn.innerHTML = originalHtml),
                            2000,
                        );
                    });
                };

                header.appendChild(dots);
                header.appendChild(langLabel);
                header.appendChild(copyBtn);

                pre.parentNode.insertBefore(container, pre);
                container.appendChild(header);
                container.appendChild(pre);

                // Style overrides
                pre.style.margin = "0";
                pre.style.backgroundColor = "transparent";
                pre.style.border = "none";
                pre.style.color = "#E1E4E8";
                pre.style.padding = "1.5rem";
                pre.style.fontSize = "14px";
                pre.style.lineHeight = "1.6";
                pre.style.fontFamily =
                    '"JetBrains Mono", "Fira Code", monospace';
                pre.style.overflowX = "auto";
            });
        };

        const timer = setTimeout(setupCodeBlocks, 500);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, [blog.content]);

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-[#FAFAFA] antialiased selection:bg-[#0a66c2]/20 selection:text-[#0a66c2]">
            <Head title={blog.title} />
            <Navbar auth={auth} />

            {/* Premium Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-[#0a66c2] to-[#00a0dc] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(10,102,194,0.5)]"
                    style={{ width: `${scrolled}%` }}
                />
            </div>

            <main className="relative pt-8 pb-24">
                {/* Hero Section */}
                <header className="max-w-[720px] mx-auto px-5 mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0a66c2] text-xs font-bold uppercase tracking-widest mb-6">
                        <BookOpen size={12} />
                        {blog.category?.name || "Article"}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1] mb-8 text-slate-900 font-['Playfair_Display',serif]">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-center gap-8 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                                <img
                                    src={
                                        settings.profile_image ||
                                        "https://avatars.githubusercontent.com/u/12028608?v=4"
                                    }
                                    alt={settings.site_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-slate-900 font-bold">
                                {settings.site_name || "Author"}
                            </span>
                        </div>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(blog.created_at).toLocaleDateString(
                                undefined,
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        </div>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>5 min read</span>
                        </div>
                    </div>
                </header>

                <div className="max-w-[1100px] mx-auto px-4 mb-16 px-4">
                    <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[21/9] relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <img
                            src={
                                blog.image ||
                                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="max-w-[1128px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                    {/* Left Sidebar - Actions */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col items-center gap-4">
                            <button
                                onClick={() =>
                                    router.post(
                                        route("blogs.like", blog.slug),
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all group ${blog.is_liked ? "bg-[#0a66c2] border-[#0a66c2] text-white shadow-lg shadow-[#0a66c2]/30" : "bg-white border-slate-200 text-slate-500 hover:text-[#0a66c2] hover:border-[#0a66c2] hover:shadow-lg hover:-translate-y-1"}`}
                            >
                                <ThumbsUp
                                    size={20}
                                    className={`group-active:scale-90 transition-transform ${blog.is_liked ? "fill-current" : ""}`}
                                />
                                {blog.likes_count > 0 && (
                                    <span
                                        className={`absolute -top-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${blog.is_liked ? "bg-white text-[#0a66c2]" : "bg-[#0a66c2] text-white"}`}
                                    >
                                        {blog.likes_count}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={scrollToComments}
                                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0a66c2] hover:border-[#0a66c2] hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <MessageSquare size={20} />
                            </button>
                            <div className="w-8 h-[1px] bg-slate-200 my-2" />
                            <button className="w-10 h-10 rounded-full bg-white/50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-all">
                                <Twitter size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all">
                                <Linkedin size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#4267B2] hover:border-[#4267B2] transition-all">
                                <Facebook size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-7">
                        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-8 prose-img:rounded-xl prose-img:shadow-lg prose-a:text-[#0a66c2] hover:prose-a:underline font-serif">
                            {/* Custom CSS for Markdown Content */}
                            <style>{`
                                .markdown-body {
                                    font-family: 'Merriweather', 'Georgia', serif;
                                    font-size: 1.125rem;
                                    line-height: 2;
                                    color: #334155;
                                }
                                .markdown-body h2 {
                                    font-family: 'Inter', sans-serif;
                                    font-size: 1.875rem;
                                    letter-spacing: -0.025em;
                                    margin-top: 3rem;
                                    margin-bottom: 1.5rem;
                                    color: #0f172a;
                                }
                                .markdown-body h3 {
                                    font-family: 'Inter', sans-serif;
                                    font-size: 1.5rem;
                                    font-weight: 600;
                                    margin-top: 2rem;
                                    color: #1e293b;
                                }
                                .markdown-body p {
                                    margin-bottom: 1.5rem;
                                }
                                .markdown-body blockquote {
                                    border-left: 4px solid #0a66c2;
                                    padding-left: 1.5rem;
                                    font-style: italic;
                                    color: #475569;
                                    margin: 2rem 0;
                                    background: linear-gradient(to right, #f8fafc, transparent);
                                    padding: 1.5rem;
                                    border-radius: 0 8px 8px 0;
                                }
                                .markdown-body ul, .markdown-body ol {
                                    margin-bottom: 1.5rem;
                                    padding-left: 1.5rem;
                                }
                                .markdown-body li {
                                    margin-bottom: 0.5rem;
                                }
                            `}</style>
                            <div
                                className="markdown-body !bg-transparent"
                                dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                }}
                            />
                        </article>

                        {/* Author/Share Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                    Share this article
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                                    <Copy size={16} /> Copy
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a66c2] text-white font-medium hover:bg-[#004182] transition-colors shadow-lg shadow-blue-200">
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div
                            id="comments-section"
                            className="mt-16 pt-10 border-t border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 font-sans">
                                    Discussion ({blog.comments?.length || 0})
                                </h3>
                            </div>

                            {/* Comment Form */}
                            {auth.user ? (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
                                    <form onSubmit={submitComment}>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=random`}
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    value={data.body}
                                                    onChange={(e) =>
                                                        setData(
                                                            "body",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="What are your thoughts?"
                                                    className="w-full border-0 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0a66c2]/20 focus:bg-white transition-all resize-none min-h-[100px] placeholder:text-slate-400"
                                                />
                                                <div className="flex justify-end mt-3">
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            processing ||
                                                            !data.body.trim()
                                                        }
                                                        className="px-6 py-2.5 bg-[#0a66c2] text-white text-sm font-bold rounded-full hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-100"
                                                    >
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 mb-10">
                                    <p className="text-slate-600 mb-4">
                                        Join the conversation with other
                                        developers.
                                    </p>
                                    <Link
                                        href={route("login")}
                                        className="inline-flex px-6 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-full border border-slate-200 hover:border-[#0a66c2] hover:text-[#0a66c2] transition-all shadow-sm"
                                    >
                                        Log in to comment
                                    </Link>
                                </div>
                            )}

                            {/* Comments List */}
                            <div className="space-y-8">
                                {blog.comments?.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-[#0a66c2]/20 transition-all">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${comment.user?.name}&background=random`}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-slate-900 text-sm">
                                                        {comment.user?.name}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium">
                                                        {new Date(
                                                            comment.created_at,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    {comment.body}
                                                </p>
                                            </div>
                                            <button className="text-xs font-bold text-slate-500 mt-2 ml-4 hover:text-[#0a66c2] transition-colors">
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            {/* Author Box */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    About the Author
                                </h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            src={
                                                settings.profile_image ||
                                                "https://avatars.githubusercontent.com/u/12028608?v=4"
                                            }
                                            alt={settings.site_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">
                                            {settings.site_name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Technical Educator
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    {settings.site_about
                                        ? settings.site_about.substring(
                                              0,
                                              100,
                                          ) + "..."
                                        : "Sharing knowledge on modern web development."}
                                </p>
                                <button className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors">
                                    Follow
                                </button>
                            </div>

                            {/* Related Posts */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                    Popular Guides
                                </h3>
                                <div className="space-y-6">
                                    {relatedBlogs?.slice(0, 3).map((rBlog) => (
                                        <Link
                                            key={rBlog.id}
                                            href={route(
                                                "blogs.show",
                                                rBlog.slug,
                                            )}
                                            className="group block"
                                        >
                                            <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-[#0a66c2] transition-colors mb-2">
                                                {rBlog.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                                <span className="uppercase tracking-wider">
                                                    {rBlog.category?.name}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                <span>4 min read</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter / CTA */}
                            <div className="bg-[#0a66c2] rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-xl shadow-blue-200">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap size={64} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 relative z-10">
                                    Master Laravel
                                </h3>
                                <p className="text-blue-100 text-xs mb-4 relative z-10 leading-relaxed">
                                    Get exclusive tips and tricks delivered to
                                    your inbox weekly.
                                </p>
                                <button className="w-full py-2.5 bg-white text-[#0a66c2] text-xs font-black rounded-lg uppercase tracking-wider hover:bg-blue-50 transition-colors relative z-10">
                                    Subscribe Free
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <Modal show={showLoginModal} closeable={false} maxWidth="md">
                <div className="p-8 text-center bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#0a66c2] mb-6 ring-4 ring-blue-50/50">
                        <Lock className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">
                        Continue Reading
                    </h3>

                    <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-[280px] mx-auto">
                        Join our community of developers to access the full
                        article and participate in discussions.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href={route("login")}
                            className="w-full flex items-center justify-center bg-[#0a66c2] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#004182] transition-all shadow-lg shadow-blue-100"
                        >
                            Sign In
                        </Link>

                        <Link
                            href={route("register")}
                            className="w-full flex items-center justify-center bg-white text-slate-700 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            Create Account
                        </Link>
                    </div>

                    <div className="mt-8">
                        <Link
                            href={route("welcome")}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
