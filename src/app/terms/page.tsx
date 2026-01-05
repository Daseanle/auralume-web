
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | AuraLume',
    description: 'Legal terms and conditions for using the AuraLume website and purchasing our services.',
};

export default function TermsOfService() {
    return (
        <div className="bg-cosmos text-starlight min-h-screen pt-24 pb-20 px-6 sm:px-12 md:px-24 font-sans">
            <div className="max-w-3xl mx-auto">
                <header className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-light mb-4 text-gold-200">
                        Terms of Service
                    </h1>
                    <p className="text-white/50 text-sm tracking-widest uppercase">
                        Last Updated: January 4, 2026
                    </p>
                </header>

                <div className="prose prose-invert prose-gold prose-headings:font-serif prose-headings:font-light prose-headings:text-starlight prose-p:text-white/70 prose-li:text-white/70 max-w-none">

                    <section className="mb-12">
                        <h2>1. Agreement to Terms</h2>
                        <p>
                            Welcome to AuraLume ("Company," "we," "our," "us"). By accessing or using our website at shopauralume.com (the "Site") and purchasing our ethically grown lab diamonds and jewelry (the "Products"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Site.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>2. Products and Availability</h2>
                        <p>
                            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                        </p>
                        <p>
                            All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>3. Purchases and Payment</h2>
                        <p>
                            We accept various forms of payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                        </p>
                        <p>
                            Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>4. Metaphysical Disclaimer</h2>
                        <p>
                            AuraLume markets products with references to "energy," "vibrations," "healing," and "manifestation." These claims are based on metaphysical beliefs and ancient traditions rather than scientific evidence.
                        </p>
                        <p className="border-l-2 border-gold-500/50 pl-4 italic text-white/60">
                            Please note: Our products are sold as jewelry and curios. They are not intended to diagnose, treat, cure, or prevent any physical or mental disease. The use of stones or crystals as a wellness therapy is one of personal choice. Information provided on this site is not a substitute for consulting a healthcare professional.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>5. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of the State of California. AuraLume and yourself irrevocably consent that the courts of California shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2>7. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                        </p>
                        <p className="mt-4">
                            <strong>AuraLume</strong><br />
                            Customer Care Team<br />
                            support@shopauralume.com
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
