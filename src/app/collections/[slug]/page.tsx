"use client";

import React, { use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, Shield, ArrowRight } from "lucide-react";

const collections = {
    abundance: {
        title: "Abundance Collection",
        subtitle: "The North Star",
        description: "Frequency of wealth, success, and clear direction.",
        longDescription: "Align your energy with prosperity. Our Abundance collection features high-clarity diamonds designed to effectively amplify your intent for career growth and financial freedom. Worn near the throat or heart, these stones act as a constant beacon for your goals.",
        image: "/images/product-necklace.png",
        color: "text-amber-400",
        gradient: "from-amber-900/20 to-cosmos",
        products: [
            { id: "a1", name: "North Star Pendant (0.2ct)", price: 299, image: "/images/product-necklace.png" },
            { id: "a2", name: "Prosperity Studs", price: 199, image: "/images/product-abundance-studs.png" },
        ]
    },
    love: {
        title: "Love Collection",
        subtitle: "The Heart Core",
        description: "Frequency of connection, compassion, and self-worth.",
        longDescription: "Open your heart chakra. The Love collection is tuned to the vibration of unconditional love. Whether manifesting a soulmate or deepening self-love, these rose gold and diamond pieces serve as a powerful energetic anchor.",
        image: "/images/product-love.png",
        color: "text-rose-400",
        gradient: "from-rose-900/20 to-cosmos",
        products: [
            { id: "l1", name: "Heart Core Necklace (0.2ct)", price: 349, image: "/images/product-love.png" },
            { id: "l2", name: "Soulmate Ring", price: 249, image: "/images/product-love-ring.png" },
        ]
    },
    protection: {
        title: "Protection Collection",
        subtitle: "The Quantum Shield",
        description: "Frequency of safety, grounding, and deflection.",
        longDescription: "A shield of light. Diamond is the hardest substance known to man. In the Protection collection, we utilize this strength to create energetic barriers against negativity and lower vibrations. Stay grounded and untouched.",
        image: "/images/product-red-string.png",
        color: "text-indigo-400",
        gradient: "from-indigo-900/20 to-cosmos",
        products: [
            { id: "p1", name: "Red String Diamond Bracelet", price: 199, image: "/images/product-red-string.png" },
            { id: "p2", name: "Aura Shield Pendant", price: 299, image: "/images/product-red-string.png" },
        ]
    }
};

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const collection = collections[slug as keyof typeof collections];

    if (!collection) {
        return (
            <div className="min-h-screen bg-cosmos text-starlight flex items-center justify-center">
                <h1 className="text-3xl font-serif">Collection Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${collection.gradient}`} />
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover blur-sm scale-110"
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm tracking-[0.3em] uppercase ${collection.color} font-bold mb-4 block`}
                    >
                        {collection.subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif mb-6 text-white drop-shadow-lg"
                    >
                        {collection.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed"
                    >
                        {collection.longDescription}
                    </motion.p>
                </div>
            </section>

            {/* The AuraLume Standard (Energy Certificate) */}
            <section className="bg-black/20 border-y border-white/5 py-16 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-gold text-xs tracking-[0.3em] uppercase mb-12">The AuraLume Standard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="font-serif text-lg text-starlight">Zero Karmic Debt</h3>
                            <p className="text-sm text-starlight/60 max-w-xs font-light">
                                100% Lab-Grown using Plasma technology. No human suffering, only pure light.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                <Heart size={20} />
                            </div>
                            <h3 className="font-serif text-lg text-starlight">Diamond Frequency</h3>
                            <p className="text-sm text-starlight/60 max-w-xs font-light">
                                Every stone is cleansed with 528Hz Solfeggio frequencies before shipping.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                <Shield size={20} />
                            </div>
                            <h3 className="font-serif text-lg text-starlight">Indestructible Intention</h3>
                            <p className="text-sm text-starlight/60 max-w-xs font-light">
                                Diamond is the hardest material, locking your manifestation in place forever.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-2xl font-serif mb-12 border-b border-white/10 pb-4">Available Pieces</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collection.products.map((product, idx) => (
                        <div key={product.id} className="bg-white/5 border border-white/10 p-6 flex flex-col items-center hover:border-gold/30 transition-colors group">
                            <div className="w-full h-64 relative mb-6 bg-cosmos/50">
                                <Image
                                    src={product.image || collection.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                            <p className="text-gold tracking-widest mb-6">${product.price}</p>
                            <button
                                onClick={() => alert("Added to Cart (Mock)")}
                                className="w-full py-3 border border-white/20 hover:bg-gold hover:text-cosmos hover:border-gold transition-all uppercase text-xs tracking-[0.2em]"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
