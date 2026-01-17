/**
 * Blog utilities for reading and parsing Markdown files
 * AuraLume Spiritual Jewelry Blog System
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Blog post interface with front matter
 */
export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    description: string;
    seo: {
        keywords: string[];
        metaTitle: string;
        metaDescription: string;
        ogImage: string;
    };
    content: string; // Raw Markdown content
    excerpt?: string;
}

/**
 * Get all blog posts from src/content/blog directory
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
        const contentDir = path.join(process.cwd(), 'src/content/blog');

        // Ensure directory exists
        if (!fs.existsSync(contentDir)) {
            console.warn(`Blog content directory not found: ${contentDir}`);
            return [];
        }

        const files = fs.readdirSync(contentDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        const posts: BlogPost[] = [];

        for (const file of markdownFiles) {
            const filePath = path.join(contentDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            // Extract slug from filename (remove .md extension)
            const slug = file.replace(/\.md$/, '');

            // Create excerpt from description or first 150 chars
            const excerpt = data.description ||
                content.replace(/[#*`>\-]/g, '').trim().substring(0, 150) + '...';

            posts.push({
                slug,
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString().split('T')[0],
                author: data.author || 'AuraLume',
                category: data.category || 'general',
                tags: data.tags || [],
                description: data.description || '',
                seo: data.seo || {
                    keywords: [],
                    metaTitle: data.title || 'AuraLume Blog',
                    metaDescription: data.description || '',
                    ogImage: '/images/blog/default-og.jpg'
                },
                content,
                excerpt
            } as BlogPost);
        }

        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return posts;
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const contentDir = path.join(process.cwd(), 'src/content/blog');
        const filePath = path.join(contentDir, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const excerpt = data.description ||
            content.replace(/[#*`>\-]/g, '').trim().substring(0, 150) + '...';

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString().split('T')[0],
            author: data.author || 'AuraLume',
            category: data.category || 'general',
            tags: data.tags || [],
            description: data.description || '',
            seo: data.seo || {
                keywords: [],
                metaTitle: data.title || 'AuraLume Blog',
                metaDescription: data.description || '',
                ogImage: '/images/blog/default-og.jpg'
            },
            content,
            excerpt
        } as BlogPost;
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

/**
 * Get cover image for a blog post
 * This extracts the first image from the content or uses a default
 */
export function getCoverImage(post: BlogPost): string {
    // Try to extract first image from content (Markdown or HTML)
    const imgMatch = post.content.match(/!\[.*?\]\(([^)]+)\)|<img[^>]+src=["']([^"']+)["']/);
    if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
    }

    // Use OG image from SEO metadata if available
    if (post.seo.ogImage) {
        return post.seo.ogImage;
    }

    // Check if image file exists, if not use a default
    // For now, use existing blog images as fallback based on category
    const fallbackImages: Record<string, string> = {
        'manifestation-science': '/images/blog/blog_manifestation_science.png',
        'diamond-spirituality': '/images/blog/blog_plasma_diamond.png',
        'love manifestation': '/images/blog/blog_plasma_diamond.png',
        'protection': '/images/blog/blog_manifestation_science.png',
        'ethical-luxury': '/images/blog/blog_ritual_guide.png',
        'astrology-timing': '/images/blog/blog_ritual_guide.png',
    };

    // Try to match by category or tags
    if (post.category && fallbackImages[post.category]) {
        return fallbackImages[post.category];
    }

    // Try to match by tags
    for (const tag of post.tags) {
        if (fallbackImages[tag]) {
            return fallbackImages[tag];
        }
    }

    // Ultimate fallback
    return '/images/blog/blog_plasma_diamond.png';
}

/**
 * Get recommended product for a blog post
 * Enhanced with intelligent product matching based on content context
 */
export function getRecommendedProduct(post: BlogPost) {
    // Extract product link from content if present
    const linkMatch = post.content.match(/\[Shop Now\]\((\/[^)]+)\)|\[Explore[^]]*\]\((\/[^)]+)\)/);
    const link = linkMatch ? linkMatch[1] : '/shop';

    // Intelligent product recommendation based on blog content
    // Map categories and tags to specific products
    const productMap: Record<string, {
        name: string;
        image: string;
        price: string;
        description: string;
    }> = {
        // Love & Relationships
        'love manifestation': {
            name: 'The Soulmate Diamond Ring',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$2,450',
            description: 'Attract your perfect match with diamond energy'
        },
        'heart chakra': {
            name: 'Heart Opening Pendant',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$1,890',
            description: 'Open your heart to infinite love'
        },
        'soulmate': {
            name: 'The Twin Flame Collection',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$3,200',
            description: 'Align with your divine counterpart'
        },

        // Protection & Grounding
        'protection': {
            name: 'The Shield of Light',
            image: '/images/blog/blog_manifestation_science.png',
            price: '$2,100',
            description: 'Powerful protection against negative energy'
        },
        'grounding': {
            name: 'Earth Star Diamond',
            image: '/images/blog/blog_manifestation_science.png',
            price: '$1,750',
            description: 'Stay grounded in chaotic times'
        },

        // Manifestation & Abundance
        'manifestation-science': {
            name: 'Quantum Manifestation Ring',
            image: '/images/blog/blog_manifestation_science.png',
            price: '$2,800',
            description: 'Accelerate your manifestations with quantum physics'
        },
        'abundance': {
            name: 'The Prosperity Diamond',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$2,650',
            description: 'Unlock infinite abundance flow'
        },

        // Diamond Spirituality
        'diamond-spirituality': {
            name: 'Plasma Diamond Amulet',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$2,200',
            description: 'Pure diamond energy for spiritual awakening'
        },
        'diamond energy': {
            name: 'Diamond Frequency Tuner',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$1,950',
            description: 'Tune into higher dimensional frequencies'
        },

        // Rituals & Practices
        'ritual': {
            name: 'The Ritual Master Set',
            image: '/images/blog/blog_ritual_guide.png',
            price: '$4,500',
            description: 'Complete toolkit for powerful rituals'
        },
        'meditation': {
            name: 'Meditation Diamond Crown',
            image: '/images/blog/blog_plasma_diamond.png',
            price: '$2,300',
            description: 'Deepen your meditation practice'
        },
        'astrology-timing': {
            name: 'Cosmic Timing Calendar',
            image: '/images/blog/blog_ritual_guide.png',
            price: '$1,450',
            description: 'Align with celestial energies'
        },

        // Default Ethical Luxury
        'ethical-luxury': {
            name: 'The Conscious Collection',
            image: '/images/blog/blog_ritual_guide.png',
            price: '$3,100',
            description: 'Luxury with a conscience'
        }
    };

    // Try to match product by category first
    if (post.category && productMap[post.category]) {
        return {
            name: productMap[post.category].name,
            image: productMap[post.category].image,
            price: productMap[post.category].price,
            description: productMap[post.category].description,
            link: link
        };
    }

    // Try to match by tags (prioritize first matching tag)
    for (const tag of post.tags) {
        if (productMap[tag]) {
            return {
                name: productMap[tag].name,
                image: productMap[tag].image,
                price: productMap[tag].price,
                description: productMap[tag].description,
                link: link
            };
        }
    }

    // Analyze content for keywords as fallback
    const contentLower = post.content.toLowerCase();

    if (contentLower.includes('love') || contentLower.includes('relationship') || contentLower.includes('heart')) {
        return {
            name: productMap['love manifestation'].name,
            image: productMap['love manifestation'].image,
            price: productMap['love manifestation'].price,
            description: productMap['love manifestation'].description,
            link: link
        };
    }
    if (contentLower.includes('protect') || contentLower.includes('shield') || contentLower.includes('ground')) {
        return {
            name: productMap['protection'].name,
            image: productMap['protection'].image,
            price: productMap['protection'].price,
            description: productMap['protection'].description,
            link: link
        };
    }
    if (contentLower.includes('manifest') || contentLower.includes('abundance') || contentLower.includes('prosper')) {
        return {
            name: productMap['manifestation-science'].name,
            image: productMap['manifestation-science'].image,
            price: productMap['manifestation-science'].price,
            description: productMap['manifestation-science'].description,
            link: link
        };
    }
    if (contentLower.includes('diamond') || contentLower.includes('energy') || contentLower.includes('spiritual')) {
        return {
            name: productMap['diamond-spirituality'].name,
            image: productMap['diamond-spirituality'].image,
            price: productMap['diamond-spirituality'].price,
            description: productMap['diamond-spirituality'].description,
            link: link
        };
    }
    if (contentLower.includes('ritual') || contentLower.includes('meditation') || contentLower.includes('practice')) {
        return {
            name: productMap['ritual'].name,
            image: productMap['ritual'].image,
            price: productMap['ritual'].price,
            description: productMap['ritual'].description,
            link: link
        };
    }

    // Ultimate fallback - general recommendation
    return {
        name: 'The Manifestation Ring',
        image: '/images/blog/blog_plasma_diamond.png',
        price: '$2,450',
        description: 'Your gateway to infinite possibilities',
        link
    };
}

/**
 * Get related blog posts based on category, tags, and content similarity
 * This helps increase page views and user engagement
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    // Filter out the current post
    const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug);

    // Calculate relevance score for each post
    const scoredPosts = otherPosts.map(post => {
        let score = 0;

        // Same category = high relevance
        if (post.category === currentPost.category) {
            score += 10;
        }

        // Matching tags = medium relevance
        const matchingTags = post.tags.filter(tag =>
            currentPost.tags.includes(tag)
        );
        score += matchingTags.length * 5;

        // Same author = low relevance
        if (post.author === currentPost.author) {
            score += 2;
        }

        return { post, score };
    });

    // Sort by score descending and take top posts
    scoredPosts.sort((a, b) => b.score - a.score);

    // Return posts with at least some relevance, or just the most recent
    const relatedPosts = scoredPosts
        .filter(item => item.score > 0)
        .slice(0, limit)
        .map(item => item.post);

    // If no related posts found, return most recent posts
    if (relatedPosts.length === 0) {
        return otherPosts.slice(0, limit);
    }

    return relatedPosts;
}

/**
 * Get featured posts (highest priority posts)
 */
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();

    // For now, just return the most recent posts
    // In the future, this could be based on a 'featured' front matter field
    return allPosts.slice(0, limit);
}
