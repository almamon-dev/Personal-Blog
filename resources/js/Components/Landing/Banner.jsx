import { Link, usePage } from "@inertiajs/react";
import {
    Youtube,
    Users,
    BookOpen,
    Globe,
    ArrowRight,
    Briefcase,
    Github,
} from "lucide-react";

export default function Banner() {
    const { settings } = usePage().props;

    // Default fallback values if settings are not loaded
    const data = settings || {
        site_name: "Savanihd Skills Platform",
        site_headline:
            "Full Stack Developer & Technical Educator | Specialized in Laravel, PHP & Node.js",
        site_about:
            "Welcome to my technical hub where I share deep dives into modern web technologies. Focus areas include PHP, Laravel, CodeIgniter, MySQL, Bootstrap, and more. I am committed to providing high-quality tutorials that help developers bridge the gap between theory and real-world production.",
        site_keywords: [
            "Web Development",
            "PHP Ecosystem",
            "API Integration",
            "Full Stack",
            "Technical Mentorship",
        ],
        location: "Dhaka, Bangladesh",
        monthly_visitors: "100,000+",
        successful_students: "5,000+",
        youtube_handle: "@savanihd",
        youtube_url: "https://youtube.com/@savanihd",
        profile_image: "https://avatars.githubusercontent.com/u/12028608?v=4",
        banner_image: null,
    };

    return (
        <section className="py-6 lg:py-12 bg-[#F3F2EF] font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                    {/* Header Banner Image (LinkedIn Style) */}
                    <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-[#0a66c2] to-[#004182] relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        {data.banner_image && (
                            <img
                                src={data.banner_image}
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="Banner"
                            />
                        )}
                        <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-6">
                            <div className="flex items-center space-x-1.5 sm:space-x-2 bg-black/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded text-white text-[10px] sm:text-xs font-semibold border border-white/10">
                                <Globe className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                                <span>Global Learning Platform</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 sm:px-8 pb-8 sm:pb-10 relative">
                        {/* Profile Image Overlap */}
                        <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0">
                            <div className="w-24 h-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                                <img
                                    src={data.profile_image}
                                    alt={data.site_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Top Actions Row */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between ml-0 lg:ml-48 pt-14 sm:pt-20 lg:pt-6 gap-6 text-center lg:text-left">
                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row items-center lg:items-start lg:space-x-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        {data.site_name}
                                    </h1>
                                    <span className="hidden sm:inline text-gray-500 font-medium"></span>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 leading-tight">
                                    {data.site_headline}
                                </p>
                                <div className="text-sm text-gray-500 font-medium pt-1">
                                    {data.location} •{" "}
                                    <button className="text-[#0a66c2] font-bold hover:underline">
                                        Contact info
                                    </button>
                                </div>
                                <div className="text-xs sm:text-sm text-[#0a66c2] font-semibold pt-1">
                                    {data.monthly_visitors} Monthly Visitors •{" "}
                                    {data.successful_students} Successful
                                    Students
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="mt-8 sm:mt-12 grid lg:grid-cols-3 gap-8">
                            {/* Bio / About */}
                            <div className="lg:col-span-2 space-y-4 text-left">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 pt-2">
                                    About the Blog
                                </h3>
                                <div
                                    className="text-sm sm:text-base text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: data.site_about,
                                    }}
                                ></div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {data.site_keywords
                                        ?.slice(0, 18)
                                        .map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-gray-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    {data.site_keywords?.length > 18 && (
                                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-gray-200">
                                            +{data.site_keywords.length - 18}{" "}
                                            more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar-style Portfolio Promo */}
                            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-100 space-y-5 text-left">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-[#673ab7] p-1.5 rounded-lg flex-shrink-0">
                                            <Briefcase className="w-5 h-5 text-white fill-current" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-tight leading-none">
                                                My Portfolio
                                            </div>
                                            <div className="text-sm sm:text-base text-gray-900 font-black">
                                                {data.site_name}
                                            </div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />
                                </div>

                                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                                    Explore my latest projects, case studies,
                                    and technical contributions.
                                </p>

                                <a
                                    href={data.portfolio_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-[#673ab7] text-white py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm hover:bg-[#5e35b1] transition-all"
                                >
                                    View Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Minimal Lucide Icon not imported above
function ExternalLink({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}
