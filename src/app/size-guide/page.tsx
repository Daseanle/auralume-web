export default function SizeGuidePage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif mb-8 text-center">Size Guide</h1>
                <p className="text-white/70 font-light mb-12 text-center">
                    A comfortable fit makes all the difference. Measure before you manifest.
                </p>

                <h2 className="text-2xl font-serif mb-4 text-gold">Rings</h2>
                <p className="text-white/70 font-light mb-4">
                    Measure the inside diameter of a ring that already fits you, or wrap a piece of string
                    around your finger, mark it, and measure the length in millimetres.
                </p>
                <div className="overflow-x-auto mb-12">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20 text-starlight/80">
                                <th className="py-2 pr-4">Finger circumference (mm)</th>
                                <th className="py-2 pr-4">US size</th>
                                <th className="py-2 pr-4">Inside diameter (mm)</th>
                            </tr>
                        </thead>
                        <tbody className="text-white/70 font-light">
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">41.5</td><td className="py-2 pr-4">2</td><td className="py-2 pr-4">13.2</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">44.1</td><td className="py-2 pr-4">3</td><td className="py-2 pr-4">14.0</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">46.8</td><td className="py-2 pr-4">4</td><td className="py-2 pr-4">14.9</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">49.3</td><td className="py-2 pr-4">5</td><td className="py-2 pr-4">15.7</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">51.9</td><td className="py-2 pr-4">6</td><td className="py-2 pr-4">16.5</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">54.4</td><td className="py-2 pr-4">7</td><td className="py-2 pr-4">17.3</td></tr>
                            <tr className="border-b border-white/10"><td className="py-2 pr-4">57.0</td><td className="py-2 pr-4">8</td><td className="py-2 pr-4">18.1</td></tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-serif mb-4 text-gold">Necklaces</h2>
                <p className="text-white/70 font-light mb-4">
                    Our chains are adjustable; most pieces sit at 16–18 in (41–46 cm), with an extender
                    for flexibility. If you're between lengths, size up.
                </p>

                <div className="mt-12 border-t border-white/10 pt-8 text-center">
                    <a href="/returns" className="text-gold uppercase tracking-widest text-sm">
                        View our 30-day return policy
                    </a>
                </div>
            </div>
        </div>
    );
}
