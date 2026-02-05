import { Head, Link, usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Landing/Navbar";
import Footer from "@/Components/Landing/Footer";
import Banner from "@/Components/Landing/Banner";
import { Clock, ArrowRight, BookOpen, Globe, ThumbsUp } from "lucide-react";

export default function Welcome({ auth, blogs, currentCategory }) {
    const { globalCategories } = usePage().props;

    // Generate a mock 255-character encrypted-style token
    const mockToken =
        "a" +
        Array.from({ length: 254 }, () =>
            Math.random().toString(36).charAt(2),
        ).join("");

    return (
        <div className="min-h-screen bg-[#F4F2EE] font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            <Head>
                <title>CW Skills - Master Your Future Skills</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Navbar auth={auth} />

            <main>
                <Banner />

                {/* Latest Technical Articles Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-gray-200 pb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-8 bg-[#0a66c2] rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                        Technical Tutorials
                                    </h2>
                                </div>

                                {/* Category Filter Tabs */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                                    <Link
                                        href={route("welcome", {
                                            token: mockToken,
                                        })}
                                        preserveScroll
                                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${!currentCategory ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md shadow-blue-100" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
                                    >
                                        All Tutorials
                                    </Link>
                                    {globalCategories &&
                                        globalCategories.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={route("welcome", {
                                                    category: cat.name,
                                                    token: mockToken,
                                                })}
                                                preserveScroll
                                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${currentCategory === cat.name ? "bg-[#0a66c2] text-white border-[#0a66c2] shadow-md shadow-blue-100" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            <Link
                                href={route("blogs.index")}
                                className="flex items-center gap-2 text-[#0a66c2] font-bold text-sm hover:underline group"
                            >
                                Explore All Content{" "}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs &&
                                blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        href={route("blogs.show", blog.slug)}
                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col group h-full"
                                    >
                                        {/* Article Preview Image */}
                                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                                            <img
                                                src={
                                                    blog.image ||
                                                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
                                                }
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#0a66c2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                    {blog.category?.name}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Article Meta & Title */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-3 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>
                                                    {new Date(
                                                        blog.created_at,
                                                    ).toLocaleDateString()}
                                                </span>
                                                <span className="text-gray-300">
                                                    •
                                                </span>
                                                <Globe className="w-3.5 h-3.5" />
                                                <span>Technical</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#0a66c2] transition-colors mb-3 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-sm text-gray-600 line-clamp-3 mb-6 font-medium leading-relaxed">
                                                {blog.content
                                                    ?.replace(/<[^>]*>/g, "")
                                                    .substring(0, 250)}
                                                ...
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                                                        <img
                                                            src="https://avatars.githubusercontent.com/u/12028608?v=4"
                                                            alt="Savanihd"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-700">
                                                        Savanihd
                                                    </span>
                                                </div>
                                                <div
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        router.post(
                                                            route(
                                                                "blogs.like",
                                                                blog.slug,
                                                            ),
                                                            {},
                                                            {
                                                                preserveScroll: true,
                                                            },
                                                        );
                                                    }}
                                                    className={`flex items-center gap-1.5 transition-colors cursor-pointer group/like ${blog.is_liked ? "text-[#0a66c2]" : "text-gray-400 hover:text-[#0a66c2]"}`}
                                                >
                                                    <ThumbsUp
                                                        className={`w-4 h-4 transition-transform group-active/like:scale-90 ${blog.is_liked ? "fill-current" : ""}`}
                                                    />
                                                    <span className="text-[11px] font-bold">
                                                        {blog.likes_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
