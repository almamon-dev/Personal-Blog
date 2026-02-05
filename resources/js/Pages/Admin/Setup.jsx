import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import {
    Package,
    Database,
    RefreshCw,
    Download,
    Zap,
    Trash2,
    Play,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Terminal,
} from "lucide-react";

const icons = {
    Package,
    Database,
    RefreshCw,
    Download,
    Zap,
    Trash2,
};

export default function Setup({ auth, tasks }) {
    const [running, setRunning] = useState(null);
    const [output, setOutput] = useState("");
    const [completed, setCompleted] = useState({});
    const [errors, setErrors] = useState({});
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [output]);

    const runTask = async (task) => {
        if (running) return;

        setRunning(task.id);
        setOutput(
            `[${new Date().toLocaleTimeString()}] Starting ${task.label}...\n`,
        );

        try {
            const response = await fetch(route("setup.run"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify({ task: task.id }),
            });

            if (!response.ok) throw new Error("Task failed to start");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setOutput((prev) => prev + chunk);
            }

            setCompleted({ ...completed, [task.id]: true });
            setOutput(
                (prev) =>
                    prev +
                    `\n[${new Date().toLocaleTimeString()}] Task completed successfully!`,
            );
        } catch (error) {
            console.error(error);
            setErrors({ ...errors, [task.id]: true });
            setOutput((prev) => prev + `\n[ERROR] ${error.message}`);
        } finally {
            setRunning(null);
        }
    };

    const mainContent = (
        <div className="py-12 bg-[#F3F2EF] min-h-screen">
            <div className="max-w-[1128px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 leading-tight">
                            Project Setup 🛠️
                        </h1>
                        <p className="text-sm font-bold text-gray-500 mt-1">
                            Initialize or maintain your project with real-time
                            feedback.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Task List */}
                    <div className="lg:col-span-4 space-y-3">
                        {tasks.map((task) => {
                            const Icon = icons[task.icon];
                            const isRunning = running === task.id;
                            const isCompleted = completed[task.id];
                            const hasError = errors[task.id];

                            return (
                                <div
                                    key={task.id}
                                    className={`bg-white rounded-xl border-2 transition-all p-4 flex items-center justify-between group
                                        ${isRunning ? "border-[#0a66c2] ring-2 ring-blue-50" : "border-transparent hover:border-gray-200"}
                                        ${isCompleted ? "border-emerald-100 bg-emerald-50/30" : ""}
                                        ${hasError ? "border-red-100 bg-red-50/30" : ""}
                                        shadow-sm
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`p-3 rounded-2xl transition-colors
                                            ${
                                                isRunning
                                                    ? "bg-blue-100 text-[#0a66c2]"
                                                    : isCompleted
                                                      ? "bg-emerald-100 text-emerald-600"
                                                      : hasError
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-[#0a66c2]"
                                            }
                                        `}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-gray-900 leading-none mb-1">
                                                {task.label}
                                            </h3>
                                            <p className="text-[11px] font-bold text-gray-400">
                                                {task.description}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => runTask(task)}
                                        disabled={!!running}
                                        className={`
                                            flex items-center justify-center p-2 rounded-xl transition-all
                                            ${
                                                isRunning
                                                    ? "bg-[#0a66c2] text-white cursor-not-allowed"
                                                    : isCompleted
                                                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                                      : hasError
                                                        ? "bg-red-600 text-white hover:bg-red-700"
                                                        : "bg-gray-100 text-gray-400 hover:bg-[#0a66c2] hover:text-white disabled:opacity-50"
                                            }
                                        `}
                                    >
                                        {isRunning ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : isCompleted ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : hasError ? (
                                            <AlertCircle className="w-4 h-4" />
                                        ) : (
                                            <Play className="w-4 h-4 fill-current" />
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Terminal View */}
                    <div className="lg:col-span-8 flex flex-col h-[600px]">
                        <div className="bg-[#1E1E1E] rounded-xl shadow-2xl overflow-hidden flex flex-col h-full border-4 border-[#2D2D2D]">
                            {/* Terminal Header */}
                            <div className="bg-[#2D2D2D] px-4 py-2.5 flex items-center justify-between border-b border-black/20">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 mr-2">
                                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                    </div>
                                    <div className="flex items-center gap-1.5 ml-2 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                                        <Terminal className="w-3 h-3" />
                                        <span>Console Output</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">
                                    {running
                                        ? "Status: Running..."
                                        : "Status: Ready"}
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div
                                ref={scrollRef}
                                className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
                            >
                                {output ? (
                                    <pre className="text-gray-300 whitespace-pre-wrap break-all">
                                        {output.split("\n").map((line, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-4 group"
                                            >
                                                <span className="text-gray-600 text-right select-none w-8 flex-shrink-0 group-hover:text-gray-500 transition-colors">
                                                    {i + 1}
                                                </span>
                                                <span
                                                    className={
                                                        line.includes("[ERROR]")
                                                            ? "text-red-400 font-bold"
                                                            : line.includes(
                                                                    "completed successfully",
                                                                )
                                                              ? "text-emerald-400 font-bold"
                                                              : line.startsWith(
                                                                      "[",
                                                                  )
                                                                ? "text-blue-400 font-bold"
                                                                : "text-gray-300"
                                                    }
                                                >
                                                    {line}
                                                </span>
                                            </div>
                                        ))}
                                        {running && (
                                            <div className="flex gap-4 mt-1">
                                                <span className="text-gray-600 text-right select-none w-8 flex-shrink-0">
                                                    {output.split("\n").length +
                                                        1}
                                                </span>
                                                <span className="flex items-center gap-2 text-blue-400 font-bold">
                                                    <span className="animate-pulse">
                                                        _
                                                    </span>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                </span>
                                            </div>
                                        )}
                                    </pre>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                                        <Terminal className="w-12 h-12 opacity-20" />
                                        <p className="font-bold text-center italic opacity-40">
                                            Waiting for task to start...
                                            <br />
                                            <span className="text-xs non-italic uppercase tracking-tighter">
                                                Select a maintenance task from
                                                the left to begin
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #444;
                }
            `,
                }}
            />
        </div>
    );

    if (auth.user) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-black text-xl text-gray-800 leading-tight">
                        System Setup & Maintenance
                    </h2>
                }
            >
                <Head title="System Setup" />
                {mainContent}
            </AuthenticatedLayout>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="System Setup" />
            <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-xl font-black text-gray-900 tracking-tighter"
                    >
                        PERSONAL<span className="text-[#0a66c2]">BLOG</span>
                    </Link>
                    <Link
                        href={route("login")}
                        className="text-sm font-black text-[#0a66c2] hover:underline uppercase tracking-widest"
                    >
                        Admin Login
                    </Link>
                </div>
            </nav>
            {mainContent}
        </div>
    );
}
