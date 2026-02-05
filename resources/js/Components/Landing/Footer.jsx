import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe,
    Github,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { settings } = usePage().props;
    const data = settings || {};

    const socialLinks = [
        { Icon: Github, url: data.github_url },
        { Icon: Linkedin, url: data.linkedin_url },
        { Icon: Globe, url: data.fiverr_url }, // Using Globe for Fiverr
        { Icon: Facebook, url: data.facebook_url },
        { Icon: Youtube, url: data.youtube_url },
        { Icon: Instagram, url: data.instagram_url },
        { Icon: Twitter, url: data.twitter_url },
    ].filter((item) => item.url);

    return (
        <footer className="bg-white border-t border-gray-200 pt-20 pb-10 font-['Segoe_UI',_Roboto,_Helvetica,_Arial,_sans-serif]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center group cursor-pointer">
                            <div className="bg-[#0a66c2] p-1.5 rounded mr-2 transition-transform group-hover:scale-105">
                                <div className="w-8 h-8 flex items-center justify-center text-white font-black text-xl italic leading-none">
                                    {(data.site_name || "CW")
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </div>
                            </div>
                            <span className="text-xl sm:text-2xl font-black text-[#0a66c2] tracking-tighter uppercase truncate max-w-[200px]">
                                {data.site_name || "SKILLS"}
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {data.site_about
                                ? data.site_about
                                      .replace(/<[^>]*>?/gm, "")
                                      .substring(0, 150) + "..."
                                : "Empowering the next generation of developers with industry-standard technical education."}
                        </p>
                        <div className="flex space-x-3 pt-2">
                            {socialLinks.map(({ Icon, url }, i) => (
                                <a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#0a66c2] hover:text-white transition-all border border-gray-100 shadow-sm"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gray-900 border-b-2 border-[#0a66c2] inline-block pb-1">
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "All Courses",
                                "Learning Paths",
                                "Mentor Profiles",
                                "Success Stories",
                                "Platform Blog",
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-[#0a66c2] font-semibold transition-colors flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[#0a66c2] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gray-900 border-b-2 border-[#0a66c2] inline-block pb-1">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Tutorials",
                                "Technical Docs",
                                "Community Hub",
                                "API References",
                                "Help Center",
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-[#0a66c2] font-semibold transition-colors flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[#0a66c2] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gray-900 border-b-2 border-[#0a66c2] inline-block pb-1">
                            Direct Support
                        </h4>
                        <ul className="space-y-5">
                            <li className="flex items-start space-x-3">
                                <div className="text-[#0a66c2] pt-1">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-tight">
                                        Technical Hotline
                                    </div>
                                    <div className="text-base font-bold text-gray-900">
                                        {data.contact_phone || "Not Set"}
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="text-[#0a66c2] pt-1">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-tight">
                                        Email Inquiry
                                    </div>
                                    <div className="text-base font-bold text-gray-900">
                                        {data.support_email ||
                                            "support@example.com"}
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="text-[#0a66c2] pt-1">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-tight">
                                        Global HQ
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 leading-tight">
                                        {data.location || "Not Set"}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p className="text-gray-500 font-bold text-sm">
                            © {new Date().getFullYear()}{" "}
                            {data.site_name || "Platform"}. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-500">
                        <a
                            href="#"
                            className="hover:text-[#0a66c2] transition-colors"
                        >
                            Accessibility
                        </a>
                        <a
                            href="#"
                            className="hover:text-[#0a66c2] transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-[#0a66c2] transition-colors"
                        >
                            User Agreement
                        </a>
                        <a
                            href="#"
                            className="hover:text-[#0a66c2] transition-colors"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
