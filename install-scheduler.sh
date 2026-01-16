#!/bin/bash
#
# AuraLume 定时任务安装助手
#
# 功能：自动安装和配置定时任务
#

echo "========================================="
echo "🚀 AuraLume 定时任务安装助手"
echo "========================================="
echo ""

# 检测操作系统
OS_TYPE=$(uname -s)

echo "检测到操作系统：$OS_TYPE"
echo ""

# 菜单选择
echo "请选择安装方式："
echo "1) macOS launchd（推荐 macOS 用户）"
echo "2) crontab（通用方案）"
echo "3) 退出"
echo ""
read -p "请输入选项 [1-3]: " choice

case $choice in
    1)
        if [ "$OS_TYPE" != "Darwin" ]; then
            echo "❌ launchd 仅适用于 macOS 系统"
            exit 1
        fi

        echo ""
        echo "📱 安装 macOS launchd 定时任务..."

        # 复制 plist 文件到 LaunchAgents 目录
        PLIST_FILE="com.auralume.dailyblog.plist"
        LAUNCH_DIR="$HOME/Library/LaunchAgents"
        TARGET_PATH="$LAUNCH_DIR/$PLIST_FILE"

        # 创建目录（如果不存在）
        mkdir -p "$LAUNCH_DIR"

        # 复制文件
        cp "$PLIST_FILE" "$TARGET_PATH"

        # 加载任务
        launchctl load "$TARGET_PATH"

        # 列出已加载的任务
        echo ""
        echo "✅ 安装完成！"
        echo ""
        echo "📋 已加载的定时任务："
        launchctl list | grep auralume

        echo ""
        echo "========================================="
        echo "📝 使用说明："
        echo "========================================="
        echo "查看日志："
        echo "  tail -f /tmp/auralume-blog.log"
        echo ""
        echo "查看错误日志："
        echo "  tail -f /tmp/auralume-blog-error.log"
        echo ""
        echo "卸载任务："
        echo "  launchctl unload $TARGET_PATH"
        echo "  rm $TARGET_PATH"
        echo "========================================="
        ;;

    2)
        echo ""
        echo "⏰ 安装 crontab 定时任务..."

        # 获取当前项目路径
        PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

        # 创建临时 crontab 文件
        TEMP_CRON=$(mktemp)

        # 读取现有的 crontab（如果有）
        crontab -l > "$TEMP_CRON" 2>/dev/null || true

        # 检查是否已经存在 AuraLume 任务
        if grep -q "auralume-web" "$TEMP_CRON" 2>/dev/null; then
            echo ""
            echo "⚠️  检测到已存在 AuraLume 定时任务"
            read -p "是否要覆盖？[y/N]: " overwrite
            if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
                echo "取消安装"
                rm "$TEMP_CRON"
                exit 0
            fi

            # 删除旧的 AuraLume 任务
            sed -i.bak '/auralume-web/d' "$TEMP_CRON"
        fi

        # 添加新的定时任务（每天早上 8 点，UTC-8 时区）
        echo "" >> "$TEMP_CRON"
        echo "# AuraLume 智能博客自动发布 - 每天早上 8 点（UTC-8 时区）" >> "$TEMP_CRON"
        echo "0 8 * * * cd $PROJECT_PATH && bash schedule-daily-blog.sh >> /tmp/auralume-blog.log 2>&1" >> "$TEMP_CRON"

        # 安装新的 crontab
        crontab "$TEMP_CRON"
        rm "$TEMP_CRON"

        echo ""
        echo "✅ 安装完成！"
        echo ""
        echo "========================================="
        echo "📋 当前定时任务列表："
        echo "========================================="
        crontab -l | grep -E "(auralume|#|$)"

        echo ""
        echo "========================================="
        echo "📝 使用说明："
        echo "========================================="
        echo "查看日志："
        echo "  tail -f /tmp/auralume-blog.log"
        echo ""
        echo "编辑定时任务："
        echo "  crontab -e"
        echo ""
        echo "列出所有定时任务："
        echo "  crontab -l"
        echo ""
        echo "删除定时任务："
        echo "  crontab -e"
        echo "  然后删除对应的行并保存"
        echo "========================================="
        ;;

    3)
        echo "退出安装"
        exit 0
        ;;

    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🎉 安装成功！"
echo ""
echo "💡 提示：系统将在每天早上 8 点（UTC-8 时区）自动发布博客文章"
