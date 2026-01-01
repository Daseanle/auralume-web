import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
                    <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Science Meets Spirit</h1>
                    <p className="text-xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
                        We believe that fine jewelry should not come at the cost of the Earth's energy.
                    </p>
                </div>

                <div className="space-y-24">
                    <Section
                        title="Born from Plasma, Not Dirt"
                        text="Traditional mining tears into the earth, creating scars and often involving conflict. AuraLume diamonds are born in a lab environment that replicates the intense heat and pressure of a star. Using pure plasma technology, we crystallize carbon into its most brilliant form. The result? A diamond that is physically identical to a mined one, but energetically cleaner."
                        align="left"
                    />

                    <Section
                        title="The Ultimate Amplifier"
                        text="In metaphysics, the diamond is the 'Master Healer'. Its rigid crystal lattice structure makes it the hardest material in the universe. We view this not just as durability, but as 'unbreakable intention'. When you program a lab-grown diamond with your goal—whether it's love, abundance, or protection—it holds that frequency without the interference of past karmic debt."
                        align="right"
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
            {/* Abstract visual placeholder */}
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
