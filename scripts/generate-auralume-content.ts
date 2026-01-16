/**
 * AuraLume 智能内容生成系统
 *
 * 🌙 专注玄学、显化、水晶、月亮仪式
 * ✨ 科学与灵性结合的内容创作
 * 💎 高转化 CTA 自动生成
 *
 * 运行方式：
 *   npm run auto-blog
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

// ==================== 配置区 ====================

const CONFIG = {
  // 每日发布目标
  DAILY_TARGET: 1,

  // 博客目录
  BLOG_DIR: path.join(process.cwd(), 'src/content/blog'),

  // 内容日历文件
  CONTENT_CALENDAR: path.join(process.cwd(), '../CONTENT_CALENDAR_30_ARTICLES.md'),
};

// ==================== 人设系统 ====================

interface Persona {
  name: string;
  tone: string;
  expertise: string;
  writingStyle: {
    opener: string[];
    transition: string[];
    closer: string[];
  };
}

const PERSONAS: Persona[] = [
  {
    name: 'Spiritual Guide',
    tone: '温暖、智慧、引导性',
    expertise: '显化、月亮仪式、水晶疗愈',
    writingStyle: {
      opener: [
        'Have you ever wondered why the full moon feels so powerful?',
        'After years of studying manifestation, I\'ve discovered something surprising...',
        'During last night\'s new moon ritual, I received a powerful insight...',
        'When I first started working with crystals, I made so many mistakes...',
      ],
      transition: [
        'But here\'s what most people miss...',
        'Let me share what changed everything for me...',
        'The science behind this is fascinating...',
        'What I discovered next transformed my practice...',
      ],
      closer: [
        'Remember, dear soul, the universe always has your back.',
        'Trust your intuition, it knows the way.',
        'The moon\'s wisdom is available to all who seek it.',
        'May your manifestations bloom under the moonlight.',
      ],
    },
  },
  {
    name: 'Science-Spirituality Bridge',
    tone: '理性、专业、连接科学',
    expertise: '量子物理、神经科学、心理学与灵性',
    writingStyle: {
      opener: [
        'As a scientist who studies manifestation, I often get asked...',
        'The research on this practice might surprise you...',
        'Let\'s look at what neuroscience tells us about rituals...',
        'There\'s actual science behind why crystals work...',
      ],
      transition: [
        'The data reveals something interesting...',
        'Let\'s dive into the research...',
        'What the studies show us...',
        'From a scientific perspective, this is fascinating...',
      ],
      closer: [
        'Science and spirituality are not opposites—they\'re partners.',
        'The evidence supports what ancient wisdom has always known.',
        'Keep exploring, keep questioning, keep growing.',
        'Trust both the science and your intuition.',
      ],
    },
  },
  {
    name: 'Crystal Expert',
    tone: '知识渊博、实用、热爱水晶',
    expertise: '水晶编程、能量疗愈、晶石选择',
    writingStyle: {
      opener: [
        'After working with crystals for 15 years, this is what I wish I knew sooner...',
        'I\' tested 20 different types of crystals for this purpose...',
        'This one crystal changed everything for my clients...',
        'Beginners always ask me about this crystal...',
      ],
      transition: [
        'But here\'s the secret most people miss...',
        'Let me share my personal experience...',
        'What I discovered shocked me at first...',
        'The key is understanding how to work with it...',
      ],
      closer: [
        'Your crystal collection is a powerful tool—use it wisely.',
        'Every crystal has a lesson to teach us.',
        'Trust the process and stay consistent.',
        'The right crystal will find you when you\'re ready.',
      ],
    },
  },
];

// ==================== 30 篇内容主题库 ====================

const CONTENT_TOPICS = [
  {
    title: 'What is Manifestation? The Science Behind the Magic',
    keywords: ['what is manifestation', 'law of attraction', 'how to manifest'],
    category: 'manifestation',
    excerpt: 'Discover the scientific foundation behind manifestation practices and learn practical techniques to transform your life.',
    wordCount: '2000-2500',
  },
  {
    title: 'New Moon vs Full Moon: When to Set Intentions for Maximum Power',
    keywords: ['new moon ritual', 'full moon manifestation', 'lunar cycle'],
    category: 'moon-rituals',
    excerpt: 'Learn the crucial difference between new moon and full moon energies for your manifestation practice.',
    wordCount: '1800-2200',
  },
  {
    title: 'Crystal Programming 101: A Beginner\'s Guide to Charging Your Crystals',
    keywords: ['crystal programming', 'how to charge crystals', 'crystal for beginners'],
    category: 'crystals',
    excerpt: 'Complete guide to programming your crystals with specific intentions for powerful manifestation work.',
    wordCount: '2200-2800',
  },
  {
    title: 'Lab-Grown Diamonds: The Spiritual Choice for Modern Consciousness',
    keywords: ['lab grown diamonds', 'spiritual jewelry', 'sustainable diamonds'],
    category: 'brand-story',
    excerpt: 'Why plasma-grown diamonds hold higher spiritual frequency than mined stones.',
    wordCount: '2000-2500',
  },
  {
    title: 'How to Build Your First Altar: A Step-by-Step Guide',
    keywords: ['how to build an altar', 'altar setup', 'spiritual altar'],
    category: 'rituals',
    excerpt: 'Create a sacred space in your home with this comprehensive altar building guide.',
    wordCount: '2500-3000',
  },
  {
    title: '5 Crystals Every Beginner Needs (And Why They Work)',
    keywords: ['crystals for beginners', 'best starter crystals', 'crystal collection'],
    category: 'crystals',
    excerpt: 'Essential crystals to start your collection and how to use them effectively.',
    wordCount: '1800-2200',
  },
  {
    title: 'The Science of 432 Hz: Why This Frequency Transforms Your Meditation',
    keywords: ['432 hz', 'solfeggio frequencies', 'meditation music'],
    category: 'meditation',
    excerpt: 'Explore the research behind 432 Hz frequency and its impact on meditation practice.',
    wordCount: '2000-2500',
  },
  {
    title: 'Full Moon Release Ritual: Let Go of What No Longer Serves You',
    keywords: ['full moon ritual', 'release ceremony', 'letting go ritual'],
    category: 'moon-rituals',
    excerpt: 'Powerful full moon ceremony to release negativity and make space for abundance.',
    wordCount: '2200-2800',
  },
  {
    title: 'Astrology for Manifestation: How to Use Your Birth Chart',
    keywords: ['astrology for manifestation', 'birth chart guide', 'natal chart'],
    category: 'astrology',
    excerpt: 'Learn to read your birth chart to optimize your manifestation timing.',
    wordCount: '2500-3000',
  },
  {
    title: '7-Day Manifestation Challenge: Transform Your Life in One Week',
    keywords: ['manifestation challenge', '7 day challenge', 'law of attraction practice'],
    category: 'manifestation',
    excerpt: 'Intensive one-week challenge to shift your energy and manifest your desires.',
    wordCount: '2000-2500',
  },
  {
    title: 'Clear Quartz vs Rose Quartz: Which Crystal Do You Really Need?',
    keywords: ['clear quartz benefits', 'rose quartz meaning', 'crystal comparison'],
    category: 'crystals',
    excerpt: 'Detailed comparison of the two most popular crystals and their specific uses.',
    wordCount: '1800-2200',
  },
  {
    title: 'How to Journal Your Way to Abundance: A 30-Day Guide',
    keywords: ['manifestation journal', 'abundance journaling', 'journaling for success'],
    category: 'manifestation',
    excerpt: 'Transform your money mindset through this powerful 30-day journaling practice.',
    wordCount: '2200-2800',
  },
];

// ==================== CTA 转化系统 ====================

interface CTAConfig {
  category: string;
  type: 'newsletter' | 'product' | 'service' | 'affiliate';
  template: (title: string) => string;
}

const CTA_TEMPLATES: CTAConfig[] = [
  // Newsletter CTA - Build email list
  {
    category: 'manifestation',
    type: 'newsletter',
    template: (title) => `
> **✨ Want to master manifestation?**

**Join 1,000+ manifestors in our community:**

🌙 Weekly moon ritual guides
💎 Crystal programming tutorials
📖 Exclusive manifestation tips
🎁 Free Moon Ritual Guide when you subscribe

[**Get Free Moon Ritual Guide 🌙**](#newsletter-form)

*No spam, unsubscribe anytime. Your journey to abundance starts here.*
`.trim(),
  },

  // Product Affiliate CTA - Generate revenue
  {
    category: 'crystals',
    type: 'affiliate',
    template: (title) => `
> **💎 Ready to start your crystal collection?**

**Recommended Resources:**

🔮 **Energy Muse** - High-quality ethically sourced crystals
[Shop Energy Muse](https://energymuse.com) *(Affiliate link)*

🌙 **Sage Goddess** - Ritual tools and spiritual supplies
[Explore Sage Goddess](https://sagegoddess.com) *(Affiliate link)*

📚 **Crystal Programming Guide** - Learn to charge your stones
[Download Free Guide](#)

*These are affiliate links that support our blog at no cost to you.*
`.trim(),
  },

  // Service CTA - High-ticket offering
  {
    category: 'astrology',
    type: 'service',
    template: (title) => `
> **🌟 Want personalized guidance?**

**AuraLume Premium Services:**

🔮 **Birth Chart Analysis** - Discover your manifestation blueprint
🌙 **Moon Ritual Coaching** - Personalized ritual design
💎 **Crystal Selection Session** - Find your perfect crystal match

**[Book Your Session](/contact)** - Limited spots available

*Invest in yourself - you\'re worth it.*
`.trim(),
  },

  // Default CTA
  {
    category: 'default',
    type: 'newsletter',
    template: (title) => `
> **🌙 Enjoyed this article?**

**Stay connected with AuraLume:**

✨ Subscribe to our weekly newsletter
📱 Follow us on Instagram @auralume.official
🔄 Share this article with someone who needs it

[**Subscribe for Weekly Magic ✨**](#newsletter-form)
`.trim(),
  },
];

// ==================== 内容生成系统 ====================

class AuraLumeContentGenerator {
  private persona: Persona;
  private topic: typeof CONTENT_TOPICS[0];

  constructor(persona: Persona, topic: typeof CONTENT_TOPICS[0]) {
    this.persona = persona;
    this.topic = topic;
  }

  generate(): string {
    // 使用本地日期而非 UTC 日期
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    const slug = this.generateSlug();

    // 根据人设选择开头
    const opener = this.persona.writingStyle.opener[
      Math.floor(Math.random() * this.persona.writingStyle.opener.length)
    ];

    // 生成 CTA
    const cta = this.generateCTA();

    const content = `---
title: "${this.topic.title}"
date: "${date}"
author: "AuraLume"
slug: "${slug}"
category: "${this.topic.category}"
tags: [${this.generateTags()}]
description: "${this.topic.excerpt}"
seo:
  keywords: [${this.topic.keywords.map(k => `"${k}"`).join(', ')}]
  metaTitle: "${this.topic.title} | AuraLume"
  metaDescription: "${this.topic.excerpt}"
  ogImage: "/images/blog/blog_moon_ritual.png"
---

${opener}

## What is ${this.topic.title.split(':')[0]}?

${this.generateIntroduction()}

## ${this.generateSectionTitle(1)}

${this.generateSectionContent(1)}

## ${this.generateSectionTitle(2)}

${this.generateSectionContent(2)}

## ${this.generateSectionTitle(3)}

${this.generateSectionContent(3)}

---

## ✨ ${this.generateActionTitle()}

${this.generateActionSteps()}

---

## 🌙 Expert Tips

${this.generateExpertTips()}

---

## 📚 Related Resources

${this.generateResources()}

---

## ❓ Frequently Asked Questions

${this.generateFAQ()}

---

${cta}

---

*Have questions? [Contact us](/contact) or join our [community forum](/community)*
`;

    return content;
  }

  private generateSlug(): string {
    const baseSlug = this.topic.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/:/g, '')
      .substring(0, 50);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    return `${baseSlug}`;
  }

  private generateTags(): string {
    const baseTags = ['2026', 'manifestation', this.topic.category];
    return baseTags.map(t => `"${t}"`).join(', ');
  }

  private generateIntroduction(): string {
    const intros = [
      `In the world of manifestation and spiritual growth, ${this.topic.title.split(':')[0].toLowerCase()} is a topic that often sparks curiosity and debate. Whether you're a seasoned practitioner or just beginning your journey, understanding this practice can transform your approach to creating the life you desire.`,
      `The intersection of science and spirituality reveals fascinating insights about ${this.topic.title.split(':')[0].toLowerCase()}. This article will guide you through both the mystical and practical aspects of this powerful practice.`,
      `When I first encountered ${this.topic.title.split(':')[0].toLowerCase()}, I was skeptical but curious. After years of research and personal experimentation, I've discovered what actually works—and what doesn't.`,
    ];
    return intros[Math.floor(Math.random() * intros.length)];
  }

  private generateSectionTitle(num: number): string {
    const titles = [
      'The Science Behind It',
      'Why This Matters',
      'Practical Applications',
      'Common Mistakes to Avoid',
      'Expert Insights',
      'Transforming Your Practice',
      'Building Consistency',
      'Taking Action Today',
    ];
    return titles[(num - 1) % titles.length];
  }

  private generateSectionContent(num: number): string {
    const contents = [
      `Research in quantum physics suggests that our thoughts and intentions influence reality at a fundamental level. When you engage in ${this.topic.keywords[0]}, you're not just wishing—you're actively co-creating with the universe.\n\nThe key lies in combining focused intention with aligned action. Many people skip the action part, wondering why their manifestations don't materialize.`,
      `The moon has been revered for centuries as a powerful celestial force. Its gravitational pull affects ocean tides, and many believe it influences our energetic bodies as well.\n\nWorking with ${this.topic.keywords[0]} during specific lunar phases can amplify your results significantly.`,
      `Crystals are formed over millions of years, capturing Earth's geological history. Each type carries a unique vibrational frequency that can interact with your personal energy field.\n\nFor ${this.topic.keywords[0]}, certain crystals like clear quartz and amethyst are particularly effective due to their amplifying properties.`,
    ];
    return contents[(num - 1) % contents.length];
  }

  private generateActionTitle(): string {
    return 'How to Get Started Today';
  }

  private generateActionSteps(): string {
    return `1. **Set Your Intention** - Be clear and specific about what you want to manifest\n2. **Choose Your Tools** - Select crystals, candles, or other ritual items that resonate\n3. **Create Sacred Space** - Find a quiet place where you won't be disturbed\n4. **Take Aligned Action** - Do something that moves you toward your goal\n5. **Trust the Process** - Release attachment to the outcome and stay open to possibilities`;
  }

  private generateExpertTips(): string {
    return `**Consistency is Key**: Daily practice, even for 5 minutes, beats occasional long rituals.\n\n**Timing Matters**: Pay attention to lunar cycles and astrological transits for enhanced results.\n\n**Stay Grounded**: While exploring spiritual practices, maintain practical life foundations.\n\n**Document Your Journey**: Keep a manifestation journal to track your progress and insights.`;
  }

  private generateResources(): string {
    return `- [**The Science of Mind**](https://) - Classic text on manifestation principles\n- [**Crystal Bible**](https://) - Comprehensive crystal reference guide\n- [**Moon Phase App**](https://) - Track lunar cycles for ritual timing`;
  }

  private generateFAQ(): string {
    return `**Q: How long does it take to see results?**\nA: Results vary, but most people notice shifts within 2-4 weeks of consistent practice.\n\n**Q: Do I need to be religious to practice manifestation?**\nA: No. Manifestation is based on universal principles that work regardless of religious beliefs.\n\n**Q: What if I don't have any crystals?**\nA: Crystals are tools that amplify energy, but your intention is the most powerful ingredient. Start with what you have.`;
  }

  private generateCTA(): string {
    // Find matching CTA by category
    for (const cta of CTA_TEMPLATES) {
      if (cta.category === this.topic.category) {
        return cta.template(this.topic.title);
      }
    }

    // Use default CTA
    const defaultCTA = CTA_TEMPLATES.find(c => c.category === 'default');
    return defaultCTA!.template(this.topic.title);
  }
}

// ==================== 主程序 ====================

class AuraLumePublisher {
  async publish(): Promise<void> {
    console.log('🌙 启动 AuraLume 智能内容生成系统...\n');

    // 1. 检查今日已发布数量
    const todayCount = await this.getTodayBlogCount();
    console.log(`📝 今日已发布: ${todayCount}/${CONFIG.DAILY_TARGET} 篇\n`);

    if (todayCount >= CONFIG.DAILY_TARGET) {
      console.log('✅ 今日发布目标已达成！');
      return;
    }

    // 2. 生成新文章
    const needed = CONFIG.DAILY_TARGET - todayCount;
    console.log(`🎯 需要生成 ${needed} 篇新文章...\n`);

    const published: string[] = [];

    for (let i = 0; i < needed; i++) {
      // 选择一个主题（循环使用30篇内容主题）
      const topicIndex = (todayCount + i) % CONTENT_TOPICS.length;
      const topic = CONTENT_TOPICS[topicIndex];

      // 随机选择一个人设
      const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];

      // 生成文章
      const generator = new AuraLumeContentGenerator(persona, topic);
      const content = generator.generate();

      // 保存文件
      const filename = this.saveBlog(content);
      published.push(topic.title);

      console.log(`✅ [${i + 1}/${needed}] ${topic.title}`);
      console.log(`   👤 人设: ${persona.name}`);
      console.log(`   📁 文件: ${filename}\n`);
    }

    console.log('\n🎉 内容生成完成！');
    console.log('💡 下一步: npm run dev 查看效果');
  }

  private async getTodayBlogCount(): Promise<number> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    if (!fs.existsSync(CONFIG.BLOG_DIR)) {
      return 0;
    }

    const files = fs.readdirSync(CONFIG.BLOG_DIR);
    let count = 0;

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(CONFIG.BLOG_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const dateMatch = content.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/);

        if (dateMatch && dateMatch[1] === today) {
          count++;
        }
      }
    }

    return count;
  }

  private saveBlog(content: string): string {
    if (!fs.existsSync(CONFIG.BLOG_DIR)) {
      fs.mkdirSync(CONFIG.BLOG_DIR, { recursive: true });
    }

    // 提取 slug
    const slugMatch = content.match(/slug:\s*"([^"]+)"/);
    const slug = slugMatch ? slugMatch[1] : `blog-${Date.now()}`;
    const filename = `${slug}.md`;
    const filepath = path.join(CONFIG.BLOG_DIR, filename);

    fs.writeFileSync(filepath, content, 'utf-8');
    return filename;
  }
}

// ==================== 入口点 ====================

async function main() {
  const publisher = new AuraLumePublisher();
  await publisher.publish();
}

main().catch(err => {
  console.error('\n❌ 错误:', err.message);
  process.exit(1);
});
