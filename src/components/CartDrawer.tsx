"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { isOpen, toggleCart, items, removeItem, total } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-cosmos/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-cosmos border-l border-white/10 z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="font-serif text-xl tracking-widest text-starlight">Your Vessel</h2>
                            <button
                                onClick={toggleCart}
                                className="text-starlight/50 hover:text-gold transition-colors"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                                        <span className="text-2xl">✧</span>
                                    </div>
                                    <p className="font-light">Your manifestation vessel is empty.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-gold text-xs uppercase tracking-widest hover:underline"
                                    >
                                        Start Gathering Light
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-white/5 border border-white/10 shrink-0">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover p-2"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-serif text-lg text-starlight">{item.name}</h3>
                                            <p className="text-gold text-sm mb-2">${item.price}</p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-starlight/50">Qty: {item.quantity}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-white/30 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm uppercase tracking-widest text-starlight/60">Subtotal</span>
                                    <span className="font-serif text-2xl text-gold">${total}</span>
                                </div>
                                <button className="w-full py-4 bg-gold text-cosmos font-serif uppercase tracking-[0.2em] hover:bg-white transition-colors">
                                    Proceed to Manifest
                                </button>
                                <p className="text-center text-[10px] text-starlight/30 mt-4 uppercase tracking-wider">
                                    Secure Checkout • Zero Carbon Shipping
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
