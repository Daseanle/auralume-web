export default function ContactPage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">Connect With Us</h1>

                <div className="prose prose-invert mx-auto font-light text-center">
                    <p className="text-lg leading-relaxed mb-12">
                        Whether you have questions about a specific frequency, need guidance on your selection, or simply want to share your manifestation story, we are here to listen.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
                        <div className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors">
                            <h3 className="text-xl text-gold font-serif mb-4">Client Care</h3>
                            <p className="mb-2 text-starlight/80">For orders, shipping, and product inquiries:</p>
                            <a href="mailto:care@auralume.com" className="text-lg hover:text-gold transition-colors block mb-4">care@auralume.com</a>
                            <p className="text-xs text-starlight/50">Response time: Within 24 hours</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 hover:border-gold/30 transition-colors">
                            <h3 className="text-xl text-gold font-serif mb-4">Ritual Guidance</h3>
                            <p className="mb-2 text-starlight/80">For questions about energy, cleansing, and intention setting:</p>
                            <a href="mailto:guidance@auralume.com" className="text-lg hover:text-gold transition-colors block mb-4">guidance@auralume.com</a>
                            <p className="text-xs text-starlight/50">Mon-Fri: 9am - 6pm EST</p>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/5">
                        <p className="text-starlight/60 italic">
                            "The universe speaks in silence, but we are happy to use email."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
