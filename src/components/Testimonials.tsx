"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Sarah J.",
        role: "Marketing Director",
        product: "North Star Pendant",
        rating: 5,
        content: "I set an intention for career clarity. Two weeks after wearing this, the path appeared. It feels like a constant reminder of my power. The energy is undeniable.",
        image: "/images/product-necklace.png" // Using product image as anchor for now, or could use generic avatars if we had them. Let's stick to no avatar or just initials to keep it clean.
    },
    {
        id: 2,
        name: "Elena R.",
        role: "Visual Artist",
        product: "Heart Core Necklace",
        rating: 5,
        content: "The vibration of this stone is palpable. It's not just jewelry; it's a tool. I feel more open, grounded, and attuned to my creative flow than I have in years.",
    },
    {
        id: 3,
        name: "Michelle K.",
        role: "Yoga Instructor",
        product: "Quantum Shield",
        rating: 5,
        content: "I wear it during every session. It feels like a shield of light keeping my energy clear and focused. The craftsmanship is flawless—you can feel the purity of the plasma.",
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-4 bg-cosmos relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">Real Results</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-starlight">Stories of Manifestation</h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center hover:border-gold/30 hover:bg-white/[0.07] transition-all duration-300 group"
                        >
                            {/* Stars */}
                            <div className="flex space-x-1 mb-6 text-gold opacity-80 group-hover:opacity-100 transition-opacity">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="font-serif text-lg leading-relaxed text-starlight/90 mb-8 italic">
                                "{review.content}"
                            </p>

                            {/* Author Info */}
                            <div className="mt-auto">
                                <h4 className="font-serif text-xl text-starlight mb-1">{review.name}</h4>
                                <p className="text-xs text-gold uppercase tracking-widest mb-1">{review.role}</p>
                                <p className="text-xs text-starlight/40 font-light">Verified Owner • {review.product}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
