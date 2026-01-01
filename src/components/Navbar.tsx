"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-cosmos/80 backdrop-blur-md border-white/10" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col items-center group">
                        <span className="font-serif text-2xl tracking-[0.2em] text-starlight group-hover:text-gold transition-colors duration-300">
                            AURALUME
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        <NavLink href="/collections/abundance">Abundance</NavLink>
                        <NavLink href="/collections/love">Love</NavLink>
                        <NavLink href="/collections/protection">Protection</NavLink>
                        <NavLink href="/about">Science & Spirit</NavLink>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button className="text-starlight hover:text-gold transition-colors relative">
                            <ShoppingBag size={20} strokeWidth={1} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-pulse" />
                        </button>
                        <button
                            className="md:hidden text-starlight"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cosmos/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                            <MobileNavLink href="/collections/abundance" onClick={() => setIsOpen(false)}>Abundance</MobileNavLink>
                            <MobileNavLink href="/collections/love" onClick={() => setIsOpen(false)}>Love</MobileNavLink>
                            <MobileNavLink href="/collections/protection" onClick={() => setIsOpen(false)}>Protection</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>Science & Spirit</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm uppercase tracking-widest text-starlight/80 hover:text-gold transition-all duration-300 font-light"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-lg font-serif text-starlight hover:text-gold transition-colors py-2"
        >
            {children}
        </Link>
    );
}
