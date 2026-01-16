import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <section className="py-20 px-4 bg-cosmos">
        <div className="max-w-7xl mx-auto">
          <NewsletterForm />
        </div>
      </section>
      <ProductGrid />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
