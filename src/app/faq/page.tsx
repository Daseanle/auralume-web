export default function SupportPage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto space-y-12">
                <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">Frequently Asked Questions</h1>

                <div className="space-y-8">
                    <Section
                        question="Is it a real diamond?"
                        answer="Yes. Physically, chemically, and optically, an AuraLume diamond is identical to a mined diamond. The only difference is origin. We use pure plasma technology to grow diamonds without the karmic weight of mining."
                    />
                    <Section
                        question="How do I set my intention?"
                        answer="We recommend a simple ritual when you first receive your piece. Hold the stone in your dominant hand, close your eyes, and clearly visualize your goal (e.g., 'I attract abundance'). Feel the emotion of already having it. This locks the frequency into the crystal structure."
                    />
                    <Section
                        question="Do you ship internationally?"
                        answer="Currently, we ship to the US, Canada, and select European countries. We are expanding our light grid soon."
                    />
                    <Section
                        question="What is your return policy?"
                        answer="We offer a 30-day 'High Vibe' guarantee. If the energy represents a mismatch for you, you may return the unworn piece for a full refund."
                    />
                </div>
            </div>
        </div>
    );
}

function Section({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="border-b border-white/10 pb-8">
            <h3 className="text-xl font-serif mb-3 text-gold">{question}</h3>
            <p className="text-white/70 font-light leading-relaxed">{answer}</p>
        </div>
    );
}
