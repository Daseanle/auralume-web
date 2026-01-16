#!/bin/bash
#
# AuraLume 智能博客自动发布系统
#
# 功能：
# - 每天自动发布 3 篇博客
# - 智能人设生成（技术专家、暴躁老哥、专业分析师）
# - 动态 CTA 匹配（问题型、竞品型、功能型）
# - 自动 Git 提交和 Telegram 通知
#

# 切换到项目目录
cd "$(dirname "$0")"

# 记录开始时间
echo "========================================="
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 启动 AuraLume 智能博客发布系统"
echo "========================================="

# 运行自动发布脚本
echo "📝 开始执行博客发布任务..."
npm run auto-blog

# 检查执行结果
if [ $? -eq 0 ]; then
    echo "✅ 博客发布任务执行成功"
else
    echo "❌ 博客发布任务执行失败"
    exit 1
fi

# 检查是否有新文件
echo ""
echo "🔍 检查新生成的博客文件..."
NEW_FILES=$(git status --short src/content/blog/ 2>/dev/null | grep "^??" | wc -l | tr -d ' ')

if [ "$NEW_FILES" -gt "0" ]; then
    echo "📊 发现 ${NEW_FILES} 篇新博客文章，准备提交到 Git..."

    # 添加所有新的博客文章
    git add src/content/blog/*.md 2>/dev/null

    # 获取今日日期
    COMMIT_DATE=$(date '+%Y-%m-%d')

    # 提交到 Git
    git commit -m "📝 自动发布：${COMMIT_DATE} 的博客文章

今日自动发布了 ${NEW_FILES} 篇博客文章

✨ 特性：
- 智能人设生成（E-E-A-T）
- 动态 CTA 优化
- 高流量趋势话题
"

    if [ $? -eq 0 ]; then
        echo "✅ 博客文章已成功提交到 Git 仓库"
        echo ""
        echo "📦 提交信息："
        echo "   - 日期：${COMMIT_DATE}"
        echo "   - 数量：${NEW_FILES} 篇"
        echo "   - 分支：$(git branch --show-current)"
    else
        echo "⚠️  Git 提交失败，但博客文件已生成"
    fi
else
    echo "ℹ️  今日发布目标已完成，无需生成新文章"
fi

# 记录完成时间
echo ""
echo "========================================="
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🎉 任务完成"
echo "========================================="
