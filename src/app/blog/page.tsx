
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Journal | AuraLume',
    description: 'Insights on conscious luxury, metaphysics of gemstones, and the science of lab-grown radiance.',
};

export default function BlogIndex() {
    return (
        <div className="bg-cosmos text-starlight min-h-screen pt-24 pb-20 px-6 sm:px-12 md:px-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 tracking-tight text-gold-200">
                        The Journal
                    </h1>
                    <p className="font-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explorations into the intersection of light, science, and the soul.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group cursor-pointer">
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="overflow-hidden mb-6 aspect-[4/5] relative">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="space-y-3">
                                    <span className="text-gold-500 text-xs font-sans tracking-widest uppercase">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <h2 className="font-serif text-3xl text-starlight group-hover:text-gold-200 transition-colors duration-300 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-white/50 font-sans leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <span className="inline-block pt-2 text-white/80 uppercase text-xs tracking-widest border-b border-transparent group-hover:border-gold-500 transition-all duration-300">
                                        Read Journal
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
