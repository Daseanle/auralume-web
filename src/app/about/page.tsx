import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
                    <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Science Meets Spirit</h1>
                    <p className="text-xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
                        We believe that fine jewelry should not come at the cost of the Earth — or your peace of mind.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Founding story — replace bracketed placeholders with your real story */}
                    <Section
                        title="Born from the Source"
                        text="AuraLume began with a simple frustration: meaningful jewelry was either wildly overpriced or impossible to trace. Our founders spent years inside the global lab-grown diamond supply chain — building the facilities, the quality systems, and the logistics that world-class brands rely on. AuraLume is the part of that story built for you: the same stones and craft, brought directly to the people who wear them. [Replace this with your real founding story — founder names, the year you started, and what sparked the brand.]"
                        align="left"
                    />

                    <Section
                        title="Why Lab-Grown? The Transparency of Light."
                        text="We choose lab-grown because it is traceable from reactor to ring. Every stone is conflict-free and created with a fraction of the environmental footprint of traditional mining. In metaphysical terms, that clean, known origin is part of why so many wear lab-grown as a symbol of 'zero karmic debt' — a fresh start, unburdened by the past."
                        align="right"
                    />

                    <Section
                        title="A Stone for Your Intention"
                        text="Across many traditions, the diamond is called the 'Master Healer' and valued as a magnifier of focus. We see it more simply: a clear, enduring stone can be a steady anchor for your intention — a daily reminder of the love, abundance, or protection you're calling in. You set the meaning; the stone holds the space. [Keep the language soft and personal — never medical or guaranteed.]"
                        align="left"
                    />

                    <Section
                        title="Traceable, Top to Bottom"
                        text="Every AuraLume stone comes from a facility we helped build and can fully account for — from the plasma reactor to your doorstep. Most pieces can be paired with an IGI certificate on request, so you always know exactly what you're wearing. [Add a real IGI sample PDF link and factory photo here — this is your strongest trust signal.]"
                        align="right"
                    />

                    <Section
                        title="A Note on Our Language"
                        text="AuraLume's spiritual descriptions reflect metaphysical traditions and personal belief. They are not medical claims, and our jewelry is not intended to diagnose, treat, cure, or prevent any condition. We invite you to wear our pieces in whatever way feels meaningful to you."
                        align="left"
                    />

                    <div className="text-center py-12 border-t border-white/10 mt-12">
                        <h3 className="text-2xl font-serif mb-6">Ready to find your frequency?</h3>
                        <a href="/" className="inline-block px-8 py-3 bg-gold text-cosmos font-serif uppercase tracking-widest hover:bg-white transition-colors">
                            Explore Collections
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, text, align }: { title: string, text: string, align: 'left' | 'right' }) {
    return (
        <div className={`flex flex-col md:flex-row gap-12 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            {/* Visual placeholder — replace with real founder / factory / process photography */}
            <div className="w-full md:w-1/2 h-80 bg-white/5 border border-white/10 relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${align === 'left' ? 'from-purple-900/40' : 'from-gold/20'} to-transparent`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                    <span className="font-serif text-6xl text-white/10">✧</span>
                </div>
            </div>

            <div className="w-full md:w-1/2 text-left">
                <h2 className="text-3xl font-serif mb-6 text-starlight">{title}</h2>
                <p className="text-white/70 leading-relaxed font-light text-lg">
                    {text}
                </p>
            </div>
        </div>
    );
}
