"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cosmos">
            {/* Background with Aura Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-mystic-radial opacity-60 animate-pulse-slow mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-float" />
                <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] mix-blend-screen animate-float-delayed" />
                {/* Starfields or grains can be added here */}
            </div>

            {/* Hero Image (Subtle Background) */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                {/* If we had a real star background image */}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-block py-1 px-3 border border-gold/30 rounded-full text-xs tracking-[0.3em] uppercase text-gold/80 mb-6 backdrop-blur-sm">
                        Metaphysical Luxury
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-starlight via-starlight to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        Manifest With <br />
                        <span className="italic text-gold-200 font-light">Unbreakable Light.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-lg md:text-xl text-starlight/70 max-w-2xl font-light mb-12 leading-relaxed"
                >
                    Ethically grown, high-frequency diamonds. The ultimate amplifier for your soul’s intention.
                    <span className="block mt-4 text-sm tracking-widest uppercase opacity-60">Starting at $199</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <Link
                        href="/collections/all"
                        className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif border border-gold/50 rounded-none transition-all duration-300 hover:border-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                        <span className="relative text-gold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                            Find Your Frequency
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Floating Diamond Effect using Image Component if we had one, or just abstract */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cosmos to-transparent z-10" />
        </section>
    );
}
