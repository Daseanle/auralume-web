# AuraLume 智能博客自动发布系统

## 📝 功能说明

每天自动发布 3 篇博客文章到 AuraLume 网站。如果当天发布的文章不足 3 篇，系统会自动补齐。

## ✨ 核心特性

### 🚀 高流量（真实趋势）
- ✅ 基于真实搜索趋势的话题库
- ✅ 覆盖 AI 工具、Web3、移动应用等多个领域
- ✅ 实时更新的热门关键词

### 💎 高质量（E-E-A-T 模拟）
- ✅ **3 种智能人设**：
  - 技术专家 - 专业、严谨、数据驱动
  - 暴躁老哥 - 直接、抱怨、真实体验
  - 专业分析师 - 客观、数据化、趋势洞察
- ✅ **真实用户语气**：避免 AI 生成的机械感
- ✅ **动态内容生成**：每篇文章都是独特的

### 💰 高转化（动态 CTA）
- ✅ **问题型 CTA**：针对错误、崩溃等问题（红色警告）
- ✅ **竞品替代 CTA**：针对 Crushon AI、Candy AI 等竞品（绿色推荐）
- ✅ **功能型 CTA**：针对设置、安装等功能需求（蓝色亮点）

### 🛠 技术特性
- ✅ **智能检测**：自动检测今天已发布的文章数量
- ✅ **自动补齐**：不足 3 篇时自动生成新文章
- ✅ **Git 集成**：自动提交到 Git 仓库
- ✅ **Telegram 通知**：发布完成后自动通知（中文）

## 📋 热门话题库

### AI & Automation
1. **AI Character Chat Setup Guide 2026** (150000+ 流量)
2. **Crushon AI Review & Best Alternatives** (120000+ 流量)
3. **Janitor AI API Integration Tutorial** (95000+ 流量)

### Web3 & Blockchain
4. **Web3 Wallet Security Best Practices** (88000+ 流量)
5. **DeFi Trading Strategies for Beginners** (76000+ 流量)

### Mobile & Apps
6. **Silly Tavern Android Setup Guide** (92000+ 流量)
7. **Mobile App Load Failed Solutions** (85000+ 流量)

### Tools & Productivity
8. **Candy AI Alternative Comparison** (67000+ 流量)
9. **Character AI Not Working Fixes** (71000+ 流量)

## 🚀 使用方法

### 方式一：快速安装（推荐）✨

浮浮酱为主人准备了一键安装脚本喵～

```bash
# 运行安装助手
./install-scheduler.sh
```

安装助手会自动：
1. 检测操作系统类型
2. 提供安装选项（macOS launchd 或 crontab）
3. 自动配置定时任务
4. 提供使用说明

### 方式二：手动安装

#### macOS 用户 - 使用 launchd

```bash
# 1. 复制 plist 文件到 LaunchAgents 目录
cp com.auralume.dailyblog.plist ~/Library/LaunchAgents/

# 2. 加载定时任务
launchctl load ~/Library/LaunchAgents/com.auralume.dailyblog.plist

# 3. 验证安装
launchctl list | grep auralume
```

#### Linux/通用 - 使用 crontab

```bash
# 1. 编辑 crontab
crontab -e

# 2. 添加以下行（每天早上 9 点运行）
0 9 * * * cd /Volumes/MOVESPEED/下载/AIcode/AuraLume/auralume-web && bash schedule-daily-blog.sh >> /tmp/auralume-blog.log 2>&1

# 3. 保存退出
```

### 方式三：手动发布测试

```bash
# 直接运行发布脚本
npm run auto-blog
```

### 方式四：GitHub Actions（可选）

创建 `.github/workflows/daily-blog.yml`：

```yaml
name: Daily Blog Publisher

on:
  schedule:
    - cron: '0 16 * * *'  # UTC 16:00 = UTC-8 8:00 (早上 8 点)
  workflow_dispatch:      # 允许手动触发

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run auto-blog
      - name: Commit new posts
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add src/content/blog/*.md
          git diff --staged --quiet || git commit -m "📝 Auto-publish daily blog posts"
          git push
```

## 📊 智能工作流程

```
1. 📅 检查今天已发布的文章数
   ↓
2. 🎯 计算需要补齐的文章数量（3 - 已发布数）
   ↓
3. 🎲 随机选择人设（技术专家/暴躁老哥/专业分析师）
   ↓
4. 📊 从热门话题库选择趋势主题
   ↓
5. ✍️ 生成博客内容：
   - 人设驱动的开头
   - 功能分析和优缺点
   - 实战体验分享
   - 使用建议
   ↓
6. 💎 根据关键词动态匹配 CTA：
   - 问题型 → 红色警告 CTA
   - 竞品型 → 绿色推荐 CTA
   - 功能型 → 蓝色亮点 CTA
   ↓
7. 💾 保存到 src/content/blog/
   ↓
8. 📱 发送 Telegram 通知（中文）
   ↓
9. 📦 Git add & commit（如果使用 schedule-daily-blog.sh）
   ↓
10. ✨ Git Hook 自动发送发布通知
```

## 📁 文件说明

### 核心文件
- **`scripts/auto-daily-blog.ts`** - 智能博客生成引擎
  - 人设系统（3 种人格）
  - CTA 动态匹配系统
  - 热门话题库
  - SEO 优化生成

- **`schedule-daily-blog.sh`** - 定时任务调度脚本
  - 运行博客发布
  - 自动 Git 提交
  - 日志记录

- **`src/lib/telegram.ts`** - Telegram 通知库
  - 中文消息模板
  - Markdown 格式化
  - 博客发布通知

- **`.git/hooks/post-commit`** - Git Hook 自动通知
  - 检测博客提交
  - 提取文章详情
  - 发送 Telegram 通知

### 配置文件
- **`com.auralume.dailyblog.plist`** - macOS launchd 配置
- **`cron-config.txt`** - crontab 配置参考
- **`install-scheduler.sh`** - 一键安装助手

### 环境配置

确保 `.env.local` 包含：

```env
TELEGRAM_BOT_TOKEN=你的机器人令牌
TELEGRAM_CHAT_ID=你的聊天ID
```

## 🎯 自定义配置

### 修改发布时间

#### 使用 launchd（macOS）
编辑 `com.auralume.dailyblog.plist`：
```xml
<key>StartCalendarInterval</key>
<dict>
    <key>Hour</key>
    <integer>9</integer>  <!-- 修改这里 -->
    <key>Minute</key>
    <integer>0</integer>
</dict>
```

#### 使用 crontab
```bash
crontab -e
# 修改时间：0 8 * * * → 0 你想要的小时 * * *
```

### 修改每日文章数量

编辑 [`scripts/auto-daily-blog.ts:24`](scripts/auto-daily-blog.ts#L24)：
```typescript
const CONFIG = {
  DAILY_TARGET: 3, // 改成你想要的数量
  BLOG_DIR: path.join(process.cwd(), 'src/content/blog'),
};
```

### 添加新人设

编辑 [`scripts/auto-daily-blog.ts:43`](scripts/auto-daily-blog.ts#L43)：
```typescript
const PERSONAS: Persona[] = [
  // ... 现有人设
  {
    name: '新人设名称',
    tone: '语气描述',
    expertise: '专业领域',
    writingStyle: {
      opener: ['开头 1', '开头 2'],
      transition: ['过渡 1', '过渡 2'],
      closer: ['结尾 1', '结尾 2'],
    },
  },
];
```

### 添加新话题

编辑 [`scripts/auto-daily-blog.ts:370`](scripts/auto-daily-blog.ts#L370)：
```typescript
const trendingTopics: TrendingTopic[] = [
  // ... 现有话题
  {
    title: '新话题标题',
    traffic: '流量预估',
    description: '话题描述',
    source: 'US', // 或 'UK'
  },
];
```

### 添加新 CTA 模板

编辑 [`scripts/auto-daily-blog.ts:121`](scripts/auto-daily-blog.ts#L121)：
```typescript
const CTA_TEMPLATES: CTAConfig[] = [
  // ... 现有 CTA
  {
    trigger: ['关键词1', '关键词2'],
    type: 'alternative', // 或 'problem', 'feature'
    priority: 4,
    template: (keyword) => `
> **💡 自定义 CTA 标题**

自定义 CTA 内容...
`.trim().replace('{keyword}', keyword),
  },
];
```

## 📞 故障排除

### 检查今日发布数量

```bash
npm run auto-blog
```

### 查看日志

```bash
# crontab 日志
grep CRON /var/syslog

# launchd 日志
log show --predicate 'process == "schedule-daily-blog"' --last 1h

# 脚本日志
tail -f /tmp/auralume-blog.log
```

### 手动测试

```bash
# 清除今天的文章标记
cd src/content/blog
# 删除或重命名今天的文章

# 重新运行
cd ../..
npm run auto-blog
```

## ✅ 验证

发布成功后，你会：

1. 在 `src/content/blog/` 看到新的 `.md` 文件
2. 收到 Telegram 通知
3. Git 仓库中看到新的提交

## 🎉 完成！

现在你的博客会每天自动发布 3 篇文章，保持网站活跃度和 SEO 优化！
