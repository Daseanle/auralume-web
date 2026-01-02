"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <footer className="bg-cosmos border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="font-serif text-3xl tracking-widest text-starlight">AURALUME</h2>
                        <p className="text-starlight/60 font-light text-sm leading-relaxed max-w-xs">
                            Designed with Spirit. Forged with Science. Shipped from our Global Tech Hub directly to your sanctuary.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div className="md:col-span-2 md:col-start-6 space-y-6">
                        <h3 className="text-gold text-xs tracking-widest uppercase">Collections</h3>
                        <ul className="space-y-3">
                            <li><Link href="/collections/abundance" className="text-starlight/70 hover:text-gold text-sm transition-colors">Abundance</Link></li>
                            <li><Link href="/collections/love" className="text-starlight/70 hover:text-gold text-sm transition-colors">Love</Link></li>
                            <li><Link href="/collections/protection" className="text-starlight/70 hover:text-gold text-sm transition-colors">Protection</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-gold text-xs tracking-widest uppercase">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="/faq" className="text-starlight/70 hover:text-gold text-sm transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-starlight/70 hover:text-gold text-sm transition-colors">Shipping</Link></li>
                            <li><Link href="/returns" className="text-starlight/70 hover:text-gold text-sm transition-colors">Returns</Link></li>
                            <li><Link href="/contact" className="text-starlight/70 hover:text-gold text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-3 space-y-6">
                        <h3 className="text-gold text-xs tracking-widest uppercase">The Inner Circle</h3>
                        <p className="text-starlight/60 text-xs font-light">Join for moon cycle rituals and exclusive drops.</p>

                        {status === "success" ? (
                            <div className="text-gold text-sm font-serif italic animate-fade-in">
                                Welcome to the sanctuary.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2 transition-opacity duration-300">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="bg-transparent border-none outline-none text-starlight text-sm flex-grow placeholder:text-starlight/30"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {status === "loading" ? "..." : "Join"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-starlight/40 font-light">
                    <p>&copy; 2024 AuraLume. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
