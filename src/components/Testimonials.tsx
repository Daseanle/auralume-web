"use client";

import { Star } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="py-24 px-4 bg-cosmos relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">From Our Community</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-starlight">Stories of Manifestation</h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                    <p className="text-white/60 mt-6 max-w-2xl mx-auto font-light">
                        Real reviews from verified AuraLume owners are on the way. We only publish feedback we can stand behind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center"
                        >
                            {/* Stars (dimmed placeholder) */}
                            <div className="flex space-x-1 mb-6 text-gold opacity-40">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            {/* Placeholder copy — replace with real, verified reviews */}
                            <p className="font-serif text-lg leading-relaxed text-starlight/40 mb-8 italic">
                                &ldquo;Your story could be here.&rdquo;
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-serif text-xl text-starlight/50 mb-1">AuraLume Owner</h4>
                                <p className="text-xs text-gold uppercase tracking-widest mb-1">Join Our Community</p>
                                <p className="text-xs text-starlight/30 font-light">Share your experience</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/"
                        className="inline-block px-8 py-3 border border-gold/40 text-gold font-serif uppercase tracking-widest hover:bg-gold hover:text-cosmos transition-colors"
                    >
                        Explore Collections
                    </a>
                </div>
            </div>
        </section>
    );
}
