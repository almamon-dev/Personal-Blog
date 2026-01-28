import { Link } from '@inertiajs/react';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-24 lg:pb-32 font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -translate-y-24 translate-x-12 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] opacity-60 -z-10" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-[#0a66c2] mb-8 animate-fade-in">
                            <span className="flex h-2 w-2 rounded-full bg-[#0a66c2] animate-ping"></span>
                            <span className="text-xs font-black uppercase tracking-widest">নতুন কোর্স যুক্ত হয়েছে!</span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tighter">
                            শেখা হোক <span className="text-[#0a66c2]">আনন্দে!</span> <br/>
                            দেশের সেরা <span className="relative">
                                প্ল্যাটফর্মে।
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 6C30 2 120 2 198 6" stroke="#0a66c2" strokeWidth="4" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h1>
                        
                        <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl font-medium">
                            একাডেমিক পড়াশোনা থেকে শুরু করে স্কিলস ডেভেলপমেন্ট—সবকিছুই এখন এক জায়গায়। আজই যুক্ত হোন ১ কোটি+ শিক্ষার্থীর সাথে।
                        </p>

                        <div className="space-y-6 mb-12">
                            {[
                                'অভিজ্ঞ মেন্টরদের তত্ত্বাবধানে শিক্ষা',
                                '২৪/৭ ডাউট সলভ করার প্যানেল',
                                'কোর্স শেষে ভেরিফাইড সার্টিফিকেট'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 group">
                                    <div className="bg-blue-50 p-1.5 rounded-full group-hover:bg-[#0a66c2] transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-[#0a66c2] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-gray-700 font-bold text-lg">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                href="#"
                                className="w-full sm:w-auto bg-[#0a66c2] text-white px-14 py-6 rounded-2xl font-black text-2xl hover:bg-[#004182] hover:shadow-2xl hover:shadow-blue-100 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                            >
                                পড়াশোনা শুরু করুন
                                <ArrowRight className="w-7 h-7" />
                            </Link>
                            
                            <button className="flex items-center space-x-4 text-gray-800 font-black group px-8 py-5 rounded-2xl hover:bg-gray-50 transition-all">
                                <span className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-100 group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-[#0a66c2] fill-current" />
                                </span>
                                <span className="text-lg">কিভাবে শিখবেন?</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Visual Representation */}
                    <div className="relative">
                        <div className="relative z-10 scale-110 lg:translate-x-12">
                             {/* Hero Image - Placeholder with specific framing */}
                             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <img 
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" 
                                    alt="Learning is fun" 
                                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a66c2]/20 to-transparent"></div>
                                
                                {/* Floating Achievements Card */}
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 animate-float">
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-3">
                                            {[1,2,3,4].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="student" />
                                                </div>
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0a66c2] flex items-center justify-center text-[10px] text-white font-black shadow-sm">
                                                ১০M+
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#0a66c2] font-black text-lg tracking-tighter">সফল শিক্ষার্থী</div>
                                            <div className="text-xs text-gray-500 font-bold uppercase">একত্রে শিখছে সবাই</div>
                                        </div>
                                    </div>
                                </div>
                             </div>

                             {/* Blue Accent UI Element */}
                             <div className="absolute -top-10 right-0 bg-[#0a66c2] text-white p-6 rounded-3xl shadow-2xl shadow-blue-200 rotate-6 animate-bounce-slow z-20 hidden md:block">
                                <div className="text-3xl font-black mb-1 leading-none">লাইভ ক্লাস</div>
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80">প্রতিদিন রাত ৮টা</div>
                             </div>
                        </div>

                        {/* Background Shapes */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-blue-100 rounded-[5rem] -rotate-12 hidden lg:block"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-blue-50 rounded-[5rem] rotate-6 hidden lg:block"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
