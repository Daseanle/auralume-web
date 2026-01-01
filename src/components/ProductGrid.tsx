"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const collections = [
    {
        id: "abundance",
        title: "The North Star",
        intention: "Abundance",
        description: "Lock in wealth and success. Let this high-frequency stone act as your beacon.",
        price: "$199 - $399",
        icon: Sparkles,
        gradient: "from-amber-900/40 to-cosmos",
        image: "/images/product-necklace.png",
        stripeUrl: "https://buy.stripe.com/test_abundance_299",
    },
    {
        id: "love",
        title: "The Heart Core",
        intention: "Love",
        description: "Manifest unconditional connection. Open your heart chakra to pure vibration.",
        price: "$249 - $499",
        icon: Heart,
        gradient: "from-rose-900/40 to-cosmos",
        image: "/images/product-love.png",
        stripeUrl: "https://buy.stripe.com/test_love_249",
    },
    {
        id: "protection",
        title: "The Quantum Shield",
        intention: "Protection",
        description: "High-vibration barrier against negativity. Deflect lower energies instantly.",
        price: "$199 - $299",
        icon: Shield,
        gradient: "from-indigo-900/40 to-cosmos",
        image: "/images/product-red-string.png",
        stripeUrl: "https://buy.stripe.com/test_protection_199",
    },
];

export default function ProductGrid() {
    return (
        <section id="products" className="py-24 px-4 bg-cosmos relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-starlight mb-4">Shop By Intention</h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((item, index) => (
                        <ProductCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ item, index }: { item: any; index: number }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="group relative h-[500px] border border-white/5 bg-white/[0.02] overflow-hidden hover:border-gold/30 transition-colors duration-500"
        >
            {/* Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`} />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center z-10">
                <div className="w-full flex justify-between items-start opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs tracking-widest uppercase text-starlight">0.2ct Plasma Diamond</span>
                    <Icon size={18} className="text-gold" />
                </div>

                {/* Diamond Image Area */}
                <div className="relative w-48 h-48 my-auto group-hover:scale-105 transition-transform duration-700 ease-out">
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-700">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-starlight group-hover:text-gold transition-colors duration-300">
                        {item.intention}
                    </h3>
                    <p className="text-sm text-starlight/60 font-light leading-relaxed">
                        {item.description}
                    </p>
                    <div className="pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="text-lg font-serif text-starlight">{item.price}</span>
                    </div>
                </div>

                {/* Badge & Action */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                        href={`/collections/${item.id}`}
                        className="px-4 py-2 border border-gold/40 bg-cosmos/80 backdrop-blur text-gold text-xs tracking-[0.2em] font-serif uppercase whitespace-nowrap hover:bg-gold hover:text-cosmos transition-all"
                    >
                        View Collection
                    </Link>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = item.stripeUrl;
                        }}
                        className="px-6 py-2 bg-gold text-cosmos text-xs tracking-[0.2em] font-serif uppercase hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                        Manifest Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
