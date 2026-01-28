import { Link, usePage } from '@inertiajs/react';
import { Search, ChevronDown, Menu, Globe, Phone } from 'lucide-react';

export default function Navbar() {
    const { auth, globalCategories } = usePage().props;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    
                    {/* Left Section: Logo & Search */}
                    <div className="flex items-center space-x-6 flex-1">
                        <Link href="/" className="flex items-center group">
                            <div className="bg-[#0a66c2] p-1.5 rounded transition-transform group-hover:scale-105">
                                <div className="w-8 h-8 flex items-center justify-center text-white font-black text-xl italic leading-none">CW</div>
                            </div>
                            <span className="ml-2 text-2xl font-black text-[#0a66c2] tracking-tighter uppercase">SKILLS</span>
                        </Link>

                        <div className="hidden lg:flex items-center max-w-sm w-full">
                            <div className="relative w-full group">
                                <input 
                                    type="text" 
                                    placeholder="Search for skills, courses, or mentors..." 
                                    className="w-full bg-[#EEF3F8] border-none rounded py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#0a66c2] transition-all placeholder:text-gray-500"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Desktop Nav Links (Dynamic Categories) */}
                    <div className="hidden xl:flex items-center space-x-8 mx-4">
                        {globalCategories && globalCategories.map((category) => (
                            <div key={category.id} className="relative group py-6">
                                <div className="flex items-center space-x-1 cursor-pointer transition-colors group">
                                    <span className="text-gray-600 font-bold text-base tracking-tight group-hover:text-[#0a66c2] group-hover:underline underline-offset-8 decoration-2 whitespace-nowrap transition-all">
                                        {category.name}
                                    </span>
                                    {category.children && category.children.length > 0 && (
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#0a66c2] transition-transform" />
                                    )}
                                </div>

                                {/* Dropdown Menu */}
                                {category.children && category.children.length > 0 && (
                                    <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top translate-y-2 group-hover:translate-y-0 z-[60]">
                                        {category.children.map((sub) => (
                                            <Link 
                                                key={sub.id} 
                                                href={route('blogs.index', { category: sub.name })} 
                                                className="block px-4 py-3 text-base font-bold text-gray-700 hover:bg-blue-50 hover:text-[#0a66c2] transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Language, Login */}
                    <div className="flex items-center space-x-4">
                        <button className="hidden sm:flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all text-sm font-bold">
                            <Globe className="w-4 h-4" />
                            <span>বাং</span>
                        </button>

                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-[#0a66c2] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#004182] transition-all whitespace-nowrap flex items-center justify-center shadow-sm"
                            >
                                ড্যাশবোর্ড
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="border-2 border-[#0a66c2] text-[#0a66c2] px-6 py-1.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-all whitespace-nowrap flex items-center justify-center"
                            >
                                লগ-ইন
                            </Link>
                        )}
                        
                        <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors anchor_menu">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
