import Link from "next/link";
import { BadgeCheck, RotateCcw, Ruler, CreditCard } from "lucide-react";

// TrustBar — conversion trust signals shown on home + product pages.
// NOTE: "Pay in 4" links to "#" as a placeholder. Wire up Klarna / Shop Pay
// (need your merchant account) before going live. IGI link points to /about#certificates.
const items = [
    {
        icon: BadgeCheck,
        title: "IGI Certified on Request",
        desc: "Every stone can ship with an IGI certificate.",
        href: "/about",
    },
    {
        icon: RotateCcw,
        title: "30-Day Easy Returns",
        desc: "Changed your mind? Send it back, no questions.",
        href: "/returns",
    },
    {
        icon: Ruler,
        title: "Size Guide",
        desc: "Find your perfect fit before you order.",
        href: "/size-guide",
    },
    {
        icon: CreditCard,
        title: "Pay in 4, Interest-Free",
        desc: "Klarna / Shop Pay available at checkout.",
        href: "#",
    },
];

export default function TrustBar() {
    return (
        <section className="border-y border-white/10 bg-black/20 py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {items.map((it) => {
                    const Icon = it.icon;
                    const inner = (
                        <>
                            <Icon size={22} className="text-gold mb-3" />
                            <h3 className="text-sm font-serif text-starlight">{it.title}</h3>
                            <p className="text-xs text-starlight/60 font-light mt-1">{it.desc}</p>
                        </>
                    );
                    return it.href === "#" ? (
                        <div key={it.title} className="flex flex-col items-center text-center px-2">
                            {inner}
                        </div>
                    ) : (
                        <Link
                            key={it.title}
                            href={it.href}
                            className="flex flex-col items-center text-center px-2 hover:opacity-80 transition-opacity"
                        >
                            {inner}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
