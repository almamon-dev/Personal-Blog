import React from "react";
import { useForm } from "@inertiajs/react";

const NewsletterWidget = () => {
    const { data, setData, post, processing, reset, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("subscribe"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-[#0a66c2] rounded-lg p-5 shadow-lg overflow-hidden relative group">
            <div className="relative z-10 text-white">
                <h4 className="font-semibold text-[16px] mb-1">
                    Engineering Sync
                </h4>
                <p className="text-[12px] font-normal leading-relaxed mb-4 text-[#C9E7FF]">
                    Get senior-level insights in your inbox.
                </p>
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="dev@example.com"
                            className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-200 text-[10px] mt-1 font-semibold">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-white text-[#0a66c2] py-2 rounded-md font-semibold text-[13px] hover:bg-gray-50 transition-colors disabled:opacity-75"
                    >
                        {processing ? "Subscribing..." : "Subscribe Now"}
                    </button>
                </form>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        </div>
    );
};

export default NewsletterWidget;
