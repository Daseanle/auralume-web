export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-cosmos text-starlight pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">Shipping & Delivery</h1>

                <div className="prose prose-invert mx-auto font-light">
                    <p className="text-lg leading-relaxed mb-8">
                        Every AuraLume piece is made to order and energetically cleansed before shipping. Please allow us the time to prepare your instrument of manifestation.
                    </p>

                    <h3 className="text-xl text-gold font-serif mt-8 mb-4">Processing Time</h3>
                    <p className="mb-4">Orders are processed within 3-5 business days. During high-volume celestial events (e.g., Full Moons, Mercury Retrograde), processing may take slightly longer as we ensure ritual quality.</p>

                    <h3 className="text-xl text-gold font-serif mt-8 mb-4">Domestic Shipping (USA)</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Standard (5-7 business days): Free</li>
                        <li>Express (2-3 business days): $25</li>
                    </ul>

                    <h3 className="text-xl text-gold font-serif mt-8 mb-4">International Shipping</h3>
                    <p>We connect light-workers globally. International shipping rates are calculated at checkout. Please note that customs duties may apply depending on your country's regulations.</p>
                </div>
            </div>
        </div>
    );
}
