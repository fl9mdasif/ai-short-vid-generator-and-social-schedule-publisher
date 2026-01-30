"use client";

import Link from "next/link";
import { Video, Twitter, Github, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="rounded-lg bg-indigo-600 p-1">
                                <Video className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                vid<span className="text-indigo-500">Maxx</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 max-w-sm mb-8">
                            The ultimate AI video generation and scheduling platform for creators, brands, and agencies.
                            Automate your growth across all major social networks.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/5">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/5">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/5">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/5">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">AI Generator</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Scheduler</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Templates</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">API Access</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-500 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} vidMaxx AI Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <Mail className="h-4 w-4" />
                            <span>support@vidmaxx.ai</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Systems Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
