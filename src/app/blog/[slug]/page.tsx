
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Article Not Found | AuraLume',
        };
    }

    return {
        title: `${post.title} | AuraLume Journal`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: post.publishedAt,
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="bg-cosmos text-starlight min-h-screen pt-32 pb-24">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                <Link
                    href="/blog"
                    className="inline-block mb-8 text-gold-500 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                    ← Back to Journal
                </Link>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-starlight mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="text-white/40 font-sans text-sm tracking-wide">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[50vh] md:h-[70vh] relative mb-20">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmos/20 to-cosmos" />
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-6 font-sans">
                <div
                    className="prose prose-invert prose-lg prose-headings:font-serif prose-headings:font-light prose-headings:text-gold-100 prose-p:text-white/70 prose-p:leading-loose prose-a:text-gold-400 prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <hr className="border-white/10 my-20" />
            </div>

            {/* Recommended Product Widget */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 backdrop-blur-sm">
                    <div className="w-full md:w-1/3 aspect-square relative bg-black/20">
                        <Image
                            src={post.recommendedProduct.image}
                            alt={post.recommendedProduct.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-gold-500 text-sm uppercase tracking-widest mb-2">Recommended Artifact</h3>
                        <h4 className="font-serif text-3xl text-white mb-2">{post.recommendedProduct.name}</h4>
                        <div className="text-xl text-white/60 font-light mb-6">{post.recommendedProduct.price}</div>

                        <Link
                            href={post.recommendedProduct.link}
                            className="inline-block bg-gold-600 text-black px-8 py-3 font-sans text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
