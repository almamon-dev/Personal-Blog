import { Link } from '@inertiajs/react';
import { Youtube, Users, BookOpen, Globe, ArrowRight } from 'lucide-react';

export default function Banner() {
    return (
        <section className="py-6 lg:py-12 bg-[#F3F2EF] font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                    
                    {/* Header Banner Image (LinkedIn Style) */}
                    <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-[#0a66c2] to-[#004182] relative">
                         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
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
                                    src="https://avatars.githubusercontent.com/u/12028608?v=4" 
                                    alt="Savanihd" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Top Actions Row */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between ml-0 lg:ml-48 pt-14 sm:pt-20 lg:pt-6 gap-6 text-center lg:text-left">
                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row items-center lg:items-start lg:space-x-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Savanihd Skills Platform</h1>
                                    <span className="hidden sm:inline text-gray-500 font-medium">• 1st</span>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 leading-tight">
                                    Full Stack Developer & Technical Educator | Specialized in Laravel, PHP & Node.js
                                </p>
                                <div className="text-sm text-gray-500 font-medium pt-1">
                                    Dhaka, Bangladesh • <button className="text-[#0a66c2] font-bold hover:underline">Contact info</button>
                                </div>
                                <div className="text-xs sm:text-sm text-[#0a66c2] font-semibold pt-1">
                                    100,000+ Monthly Visitors • 5,000+ Successful Students
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 pt-4 lg:pt-0">
                                <Link 
                                    href="#" 
                                    className="bg-[#0a66c2] text-white px-5 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base hover:bg-[#004182] transition-colors flex items-center shadow-sm whitespace-nowrap"
                                >
                                    View Courses
                                </Link>
                                <Link 
                                    href="#" 
                                    className="border-2 border-[#0a66c2] text-[#0a66c2] px-5 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base hover:bg-blue-50 transition-colors whitespace-nowrap"
                                >
                                    About Platform
                                </Link>
                                <button className="hidden sm:flex p-2 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-300">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="mt-8 sm:mt-12 grid lg:grid-cols-3 gap-8">
                            {/* Bio / About */}
                            <div className="lg:col-span-2 space-y-4 text-left">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 pt-2">About the Blog</h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Welcome to my technical hub where I share deep dives into modern web technologies. Focus areas include 
                                    <span className="font-bold text-gray-800"> PHP, Laravel, CodeIgniter, MySQL, Bootstrap</span>, and more. 
                                    I am committed to providing high-quality tutorials that help developers bridge the gap between theory and real-world production.
                                </p>
                                
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {['Web Development', 'PHP Ecosystem', 'API Integration', 'Full Stack', 'Technical Mentorship'].map((tag, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-gray-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar-style YouTube Promo */}
                            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-100 space-y-5 text-left">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-red-600 p-1.5 rounded-lg flex-shrink-0">
                                            <Youtube className="w-5 h-5 text-white fill-current" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-tight leading-none">YouTube Channel</div>
                                            <div className="text-sm sm:text-base text-gray-900 font-black">@savanihd</div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />
                                </div>
                                
                                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                                    Master Laravel and PHP through clear, step-by-step video tutorials.
                                </p>

                                <a 
                                    href="https://youtube.com/@savanihd" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-[#E11D48] text-white py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm hover:bg-[#BE123C] transition-all"
                                >
                                    Subscribe To Learn
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    )
}
