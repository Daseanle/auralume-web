
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getCoverImage, getRecommendedProduct, getRelatedPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import ReadingProgress from '@/components/ReadingProgress';
import SocialShare from '@/components/SocialShare';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Article Not Found | AuraLume',
        };
    }

    const coverImage = getCoverImage(post);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shopauralume.com';
    const fullImageUrl = coverImage.startsWith('http') ? coverImage : `${siteUrl}${coverImage}`;

    return {
        title: post.seo.metaTitle || `${post.title} | AuraLume Journal`,
        description: post.seo.metaDescription || post.excerpt,
        keywords: post.seo.keywords.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            siteName: 'AuraLume',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [fullImageUrl],
        },
        other: {
            'article:published_time': post.date,
            'article:author': post.author,
            'article:section': post.category,
            'article:tag': post.seo.keywords.join(', '),
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const coverImage = getCoverImage(post);
    const recommendedProduct = getRecommendedProduct(post);
    const relatedPosts = await getRelatedPosts(post, 3);

    // JSON-LD Structured Data for SEO
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shopauralume.com';
    const fullImageUrl = coverImage.startsWith('http') ? coverImage : `${siteUrl}${coverImage}`;
    const articleUrl = `${siteUrl}/blog/${slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: fullImageUrl,
        author: {
            '@type': 'Organization',
            name: 'AuraLume',
            url: siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'AuraLume',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        keywords: post.seo.keywords.join(', '),
        articleSection: post.category,
    };

    return (
        <>
            {/* Reading Progress Bar */}
            <ReadingProgress />

            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <article className="bg-cosmos text-starlight min-h-screen pt-24 pb-24">
                {/* Header */}
                <div className="max-w-5xl mx-auto px-6 text-center mb-12">
                    <Link
                        href="/blog"
                        className="inline-block mb-6 text-gold-500/80 text-xs tracking-[0.2em] uppercase hover:text-gold-400 transition-colors"
                    >
                        ← Back to Journal
                    </Link>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-starlight mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-white/40 font-sans text-sm tracking-wide mb-4">
                        <span>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span>{post.author}</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex justify-center gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-gold-500/60 uppercase tracking-wider hover:text-gold-400 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hero Image */}
                <div className="w-full aspect-[21/9] md:aspect-[21/9] relative mb-16 md:mb-20">
                    <Image
                        src={coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cosmos/30" />
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 font-sans">
                    <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-serif prose-headings:font-light prose-headings:text-gold-100 prose-headings:mt-8 prose-headings:mb-4 prose-p:text-white/70 prose-p:leading-loose prose-p:mb-6 prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-gold-500/30 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-img:rounded-lg prose-img:shadow-2xl prose-img:my-8 prose-img:w-full prose-img:object-cover">
                        <MDXRemote
                            source={post.content}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [],
                                    rehypePlugins: [],
                                },
                            }}
                        />
                    </div>

                    <hr className="border-white/10 my-16" />

                    {/* Social Share */}
                    <SocialShare
                        title={post.title}
                        excerpt={post.excerpt || ''}
                        slug={slug}
                        className="my-12"
                    />
                </div>

                {/* Recommended Product Widget */}
                <div className="max-w-5xl mx-auto px-6 mb-20">
                    <div className="bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 backdrop-blur-sm rounded-lg">
                        <div className="w-full md:w-1/3 aspect-square relative bg-black/20 rounded-lg overflow-hidden">
                            <Image
                                src={recommendedProduct.image}
                                alt={recommendedProduct.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-gold-500 text-sm uppercase tracking-widest mb-2">Recommended Artifact</h3>
                            <h4 className="font-serif text-3xl text-white mb-2">{recommendedProduct.name}</h4>
                            <p className="text-white/50 text-sm mb-4 leading-relaxed">
                                {'description' in recommendedProduct ? recommendedProduct.description : 'Discover the power of diamond energy'}
                            </p>
                            <div className="text-xl text-white/60 font-light mb-6">{recommendedProduct.price}</div>

                            <Link
                                href={recommendedProduct.link}
                                className="inline-block bg-gold-600 text-black px-8 py-3 font-sans text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-3xl text-gold-200 text-center mb-12">
                            Continue Your Journey
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => {
                                const relatedCoverImage = getCoverImage(relatedPost);
                                return (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="group block"
                                    >
                                        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-gold-500/30 transition-colors duration-300">
                                            <div className="aspect-[16/10] relative mb-4">
                                                <Image
                                                    src={relatedCoverImage}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-cosmos/80 to-transparent" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold-200 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-white/50 text-sm line-clamp-2 mb-3">
                                                    {relatedPost.excerpt}
                                                </p>
                                                <span className="text-gold-500 text-xs uppercase tracking-wider">
                                                    Read More →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
