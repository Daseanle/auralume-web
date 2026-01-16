/**
 * Telegram Notification Utility
 *
 * Sends completion notifications to Telegram when tasks are done
 *
 * Setup:
 * 1. Create a bot with @BotFather on Telegram
 * 2. Get your bot token
 * 3. Get your chat ID from @userinfobot
 * 4. Add to .env.local:
 *    TELEGRAM_BOT_TOKEN=your_token
 *    TELEGRAM_CHAT_ID=your_chat_id
 */

interface TelegramMessage {
    text: string;
    parse_mode?: 'Markdown' | 'HTML';
    disable_web_page_preview?: boolean;
}

/**
 * Send notification to Telegram
 */
export async function sendTelegramNotification(message: string): Promise<void> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Skip if not configured
    if (!botToken || !chatId) {
        console.log('Telegram notification skipped: not configured');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const payload: TelegramMessage = {
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                ...payload,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Telegram notification failed:', error);
        } else {
            console.log('✅ Telegram notification sent successfully');
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
}

/**
 * Send task completion notification
 */
export async function notifyTaskComplete(
    taskName: string,
    details: string[],
    emoji: string = '✅'
): Promise<void> {
    const timestamp = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
    });

    const message = `
${emoji} *任务完成*

*${taskName}*

${details.map(detail => `• ${detail}`).join('\n')}

_
时间：${timestamp} |
项目：AuraLume 博客系统_
    `.trim();

    await sendTelegramNotification(message);
}

/**
 * Send deployment notification
 */
export async function notifyDeployment(
    environment: string,
    changes: string[]
): Promise<void> {
    const timestamp = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
    });

    const message = `
🚀 *部署完成*

*环境：* ${environment}

*更改内容：*
${changes.map(change => `• ${change}`).join('\n')}

_
时间：${timestamp} |
项目：AuraLume 博客系统_
    `.trim();

    await sendTelegramNotification(message);
}
