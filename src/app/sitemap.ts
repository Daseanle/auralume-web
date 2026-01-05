import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://shopauralume.com'
    const currentDate = new Date()

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Collections
        {
            url: `${baseUrl}/collections/abundance`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/collections/love`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/collections/protection`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Other informational pages
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/returns`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/shipping`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}
