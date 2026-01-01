"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is it a real diamond?",
        answer: "Absolutely. Every AuraLume stone is a 100% authentic diamond. Chemically, physically, and optically, they are identical to mined diamonds—composed of pure carbon arranged in a crystal lattice. The only difference is the origin: ours are born from lightning and plasma in a controlled sanctuary, rather than being extracted from the earth."
    },
    {
        question: "What is 'Plasma-Grown'?",
        answer: "We use advanced HPHT (High Pressure High Temperature) and CVD technology that replicates the power of a lightning strike. Inside a vacuum chamber, pure carbon atoms are accelerated by plasma energy to crystallize into a diamond. It is a process of 'Speeding up Evolution'—creating the hardest substance on earth without the environmental or ethical toll of mining."
    },
    {
        question: "Why 'High-Vibration' and 'Karmic-Debt Free'?",
        answer: "Traditional mined diamonds often carry a heavy history of conflict and ecological trauma—what we call 'Karmic Debt.' Because AuraLume diamonds are created in a clean, high-energy environment, they arrive as 'Blank Slates.' We further cleanse each stone with 528Hz Solfeggio frequencies to ensure its energy is at its highest vibration, ready to be programmed with your specific intentions."
    },
    {
        question: "Will it fade or cloud?",
        answer: "Never. Unlike 'simulants' like cubic zirconia or moissanite, an AuraLume diamond is the hardest material in the universe (Mohs scale 10). Its brilliance and fire are permanent. It is as indestructible as your strongest intention."
    },
    {
        question: "How do I manifest with my diamond?",
        answer: "Upon arrival, hold your diamond in your dominant hand. Close your eyes and visualize your goal as if it has already happened. Feel the emotion. The diamond's crystalline structure acts as an amplifier, 'locking' that frequency into your daily aura. Detailed ritual instructions are included in your Manifestation Card with every order."
    },
    {
        question: "Does it come with a certificate?",
        answer: "Each piece comes with an official AuraLume Certificate of Authenticity & Energy Cleansing. For stones above 0.5ct, we provide IGI or GIA laboratory grading reports. For our signature 0.1ct-0.2ct manifestation pieces, we guarantee the D-E color and VVS-VS clarity through our rigorous internal spiritual and technical audit."
    }
];

export default function FAQ() {
    return (
        <section className="py-24 px-4 bg-cosmos relative z-20 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">Science & Spirit</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-starlight">The Truth Behind The Light</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AccordionItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gold/20 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="font-serif text-xl text-starlight">{question}</span>
                <span className="text-gold">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-starlight/70 font-light leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
