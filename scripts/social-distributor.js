/**
 * AuraLume 社交媒体自动分发器
 *
 * 从博客文章自动生成社交媒体内容
 * 支持：Pinterest, Instagram, TikTok, Twitter
 */

const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  blogDir: './src/content/blog',
  outputDir: './dist/social-content',
  platforms: {
    pinterest: {
      enabled: true,
      imageSpecs: '1000x1500',
      charLimit: 500,
      hashtags: 5
    },
    instagram: {
      enabled: true,
      imageSpecs: '1080x1080',
      charLimit: 2200,
      hashtags: 30
    },
    tiktok: {
      enabled: true,
      videoSpecs: '9:16',
      charLimit: 150,
      hashtags: 5
    },
    twitter: {
      enabled: true,
      imageSpecs: '1600x900',
      charLimit: 280,
      hashtags: 3
    }
  }
};

/**
 * 从博客文章提取关键信息
 */
function extractKeyPoints(blogContent) {
  // 提取标题
  const titleMatch = blogContent.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';

  // 提取描述
  const descMatch = blogContent.match(/description:\s*"([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';

  // 提取标签
  const tagsMatch = blogContent.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map(t => t.trim().replace(/"/g, ''))
    : [];

  // 提取正文（去除 Front Matter）
  const contentParts = blogContent.split('---');
  const mainContent = contentParts.length > 2 ? contentParts.slice(2).join('---') : blogContent;

  // 提取小标题作为要点
  const headings = mainContent.match(/##\s+(.+)/g) || [];
  const keyPoints = headings.map(h => h.replace('## ', '').trim());

  return {
    title,
    description,
    tags,
    keyPoints,
    mainContent
  };
}

/**
 * 生成 Pinterest 内容
 */
function generatePinterestContent(keyInfo, url) {
  const { title, description, tags } = keyInfo;

  // Pinterest 标题（更吸引点击）
  const pinTitle = `${title} ✨ | AuraLume Spiritual Jewelry`;

  // Pinterest 描述（SEO 优化）
  const pinDescription = `${description}

🔮 Discover the science behind manifestation with AuraLume's lab-grown diamonds.

💎 Learn more at: ${url}

#SpiritualJewelry #Manifestation #LabGrownDiamond #CrystalHealing #AuraLume
${tags.slice(0, 5).map(t => `#${t.replace(/-/g, '')}`).join(' ')}`.substring(0, 500);

  return {
    title: pinTitle,
    description: pinDescription,
    imageUrl: '', // 需要生成
    board: 'AuraLume Spiritual Jewelry',
    section: 'Manifestation Tips'
  };
}

/**
 * 生成 Instagram 内容
 */
function generateInstagramContent(keyInfo, url) {
  const { title, description, tags, keyPoints } = keyInfo;

  // Hook（前 2 行最关键）
  const hook = `💎 ${title.split(':').pop()}

Ready to manifest your dreams?`;

  // 核心内容（要点列表）
  const body = keyPoints.slice(0, 3).map(point => `✨ ${point}`).join('\n\n');

  // CTA
  const cta = `
👆 Link in bio to shop your power stone

Save this for your next manifestation ritual 📌`;

  // Hashtags
  const hashtags = `
#AuraLume #SpiritualJewelry #Manifestation #LabGrownDiamond #CrystalEnergy
#LawOfAttraction #Spirituality #SelfLove #AbundanceMindset #EnergyHealing
#ChakraHealing #DiamondJewelry #EthicalLuxury #SustainableJewelry #ConsciousLiving
#Mindfulness #WellnessJourney #SpiritualAwakening #HighVibe #RaiseYourVibration
#IntentionSetting #NewMoonRitual #FullMoonManifestation #CrystalCollection
${tags.map(t => `#${t.replace(/-/g, '')}`).join(' ')}`.substring(0, 2200);

  const caption = `${hook}

${body}

${cta}
${hashtags}`;

  // Stories 文案
  const stories = [
    { text: 'New Blog Alert! 📚', type: 'text' },
    { text: title, type: 'text' },
    { text: 'Link in bio to read 👆', type: 'sticker' },
    { text: '#manifestation #crystals', type: 'hashtag' }
  ];

  return {
    caption,
    stories,
    imageUrl: '', // 需要生成
    hashtags: tags.concat([
      'AuraLume',
      'SpiritualJewelry',
      'Manifestation',
      'LabGrownDiamond'
    ])
  };
}

/**
 * 生成 TikTok 内容
 */
function generateTikTokContent(keyInfo, url) {
  const { title, keyPoints } = keyInfo;

  // 视频脚本（15-30 秒）
  const script = `
[Scene 1: 0-3s]
Text overlay: "Did you know this about diamonds?"
Visual: Close-up of AuraLume diamond

[Scene 2: 3-10s]
Text overlay: "${keyPoints[0] || 'The secret to manifestation'}"
Visual: Diamond glowing, energy effects

[Scene 3: 10-15s]
Text overlay: "Link in bio"
Visual: Product shot with CTA

Audio: Trending manifestation sound
`;

  // 标题文案
  const caption = `${title.split(':').pop()} 💎✨

Link in bio to learn the science #spiritualjewelry #manifestation #labdiamond #auralume`;

  // 话题标签
  const hashtags = ['#SpiritualJewelry', '#Manifestation', '#LabGrownDiamond', '#CrystalEnergy', '#AuraLume'];

  return {
    script,
    caption,
    hashtags,
    music: 'Trending manifestation audio',
    effects: ['glow', 'sparkle']
  };
}

/**
 * 生成 Twitter 内容
 */
function generateTwitterContent(keyInfo, url) {
  const { title, description, tags } = keyInfo;

  // Thread 结构
  const tweet1 = `🧵 ${title}

${description.substring(0, 100)}...

A thread 🧵`;

  const tweet2 = `1/${title.split(':').pop()}

${description}

#SpiritualJewelry #Manifestation`;

  const tweet3 = `💎 Key insight:

Did you know lab-grown diamonds have cleaner energy than mined diamonds?

Pure plasma = Pure frequency ⚡

This means they're better at amplifying your intentions.`;

  const tweet4 = `Want to learn the science behind manifestation?

Read our latest blog: ${url}

#AuraLume #LabGrownDiamond`;

  return {
    thread: [tweet1, tweet2, tweet3, tweet4],
    hashtags: tags.slice(0, 3)
  };
}

/**
 * 生成 Midjourney 图片 Prompt
 */
function generateImagePrompts(keyInfo) {
  const { title, tags } = keyInfo;

  const prompts = {
    pinterest: `Luxury spiritual jewelry product photography, AuraLume lab-grown diamond pendant on black velvet, mystical lighting, sacred geometry background, high-end magazine style, 8k, photorealistic --ar 2:3 --style raw --v 6`,

    instagram: `Flat lay of AuraLume diamond jewelry with crystals and sage, aesthetic minimalist style, soft natural lighting, pastel color palette, spiritual wellness aesthetic, instagrammable, high resolution --ar 1:1 --style raw --v 6`,

    tiktok: `Close-up of AuraLume diamond pendant glowing with energy, cinematic lighting, sparkle effects, mystical atmosphere, dark background with light rays, macro photography, luxury aesthetic --ar 9:16 --style raw --v 6`,

    blog: `Editorial lifestyle shot, woman wearing AuraLume diamond jewelry, meditation pose, ethereal lighting, sacred geometry overlays, spiritual luxury fashion, vogue style, mystical elegance --ar 16:9 --style raw --v 6`
  };

  return prompts;
}

/**
 * 主函数：处理博客文章
 */
async function processBlogPost(blogFile) {
  console.log(`\n📱 处理博客: ${blogFile}`);

  // 读取博客内容
  const blogPath = path.join(CONFIG.blogDir, blogFile);
  const blogContent = await fs.readFile(blogPath, 'utf-8');

  // 提取关键信息
  const keyInfo = extractKeyPoints(blogContent);

  // 假设的博客 URL（实际部署后需要替换）
  const blogUrl = `https://auralume.com/blog/${blogFile.replace('.md', '')}`;

  // 生成各平台内容
  const socialContent = {
    blog: blogFile,
    url: blogUrl,
    pinterest: generatePinterestContent(keyInfo, blogUrl),
    instagram: generateInstagramContent(keyInfo, blogUrl),
    tiktok: generateTikTokContent(keyInfo, blogUrl),
    twitter: generateTwitterContent(keyInfo, blogUrl),
    images: generateImagePrompts(keyInfo),
    generatedAt: new Date().toISOString()
  };

  // 保存
  const outputDir = CONFIG.outputDir;
  await fs.mkdir(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, blogFile.replace('.md', '-social.json'));
  await fs.writeFile(outputFile, JSON.stringify(socialContent, null, 2), 'utf-8');

  console.log(`✅ 社交内容已生成: ${outputFile}`);

  // 打印预览
  console.log('\n📋 内容预览:');
  console.log(`\n📌 Pinterest:`);
  console.log(`  标题: ${socialContent.pinterest.title.substring(0, 50)}...`);
  console.log(`\n📸 Instagram:`);
  console.log(`  前几行: ${socialContent.instagram.caption.split('\n')[0]}`);
  console.log(`\n🎵 TikTok:`);
  console.log(`  脚本: ${socialContent.tiktok.script ? socialContent.tiktok.script.split('\n')[1] : '脚本已生成'}`);

  return socialContent;
}

/**
 * CLI 入口
 */
async function main() {
  const args = process.argv.slice(2);
  const blogFile = args[0];

  if (!blogFile) {
    console.log(`
用法：
  node scripts/social-distributor.js <blog-file.md>

示例：
  node scripts/social-distributor.js quantum-manifestation-diamond.md
    `);
    process.exit(1);
  }

  try {
    await processBlogPost(blogFile);
    console.log('\n🎉 社交内容生成完成！\n');
    console.log('📝 下一步:');
    console.log('  1. 使用生成的 Midjourney prompts 创建图片');
    console.log('  2. 在 Pinterest 发布 Pin');
    console.log('  3. 在 Instagram 发布 Post + Stories');
    console.log('  4. 在 TikTok 发布视频（使用脚本）');
    console.log('  5. 在 Twitter 发布 Thread\n');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  processBlogPost,
  generatePinterestContent,
  generateInstagramContent,
  generateTikTokContent,
  generateTwitterContent,
  generateImagePrompts
};
