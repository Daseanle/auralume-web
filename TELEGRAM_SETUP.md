# Telegram Notification Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create a Telegram Bot
1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the prompts to name your bot (e.g., `AuralumeBot`)
4. Copy the **bot token** (looks like `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`)
5. Keep this token safe!

### Step 2: Get Your Chat ID
1. Open Telegram and search for **@userinfobot**
2. Send `/start` command
3. You'll receive a message with your **Chat ID** (looks like `123456789`)
4. Copy this number

### Step 3: Configure Environment Variables
1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```bash
   # Telegram Bot Notification
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
   TELEGRAM_CHAT_ID=123456789
   ```

3. Save the file

### Step 4: Test Notifications
Run the test command:
```bash
npm run notify -- --task="Test Notification" --details="Telegram setup complete!" --emoji="🎉"
```

You should receive a notification in your Telegram!

## Usage

### Manual Notifications
```bash
# Basic notification
npm run notify -- --task="Task Name"

# With details
npm run notify -- --task="Blog Post Published" --details="SEO optimized" --details="Social sharing added"

# Custom emoji
npm run notify -- --task="Deployment Complete" --emoji="🚀"
```

### Programmatic Usage
```typescript
import { notifyCompletion } from '@/scripts/notify';

await notifyCompletion(
    'Blog Optimization',
    ['SEO enhanced', 'Social sharing added'],
    '✨'
);
```

### Automatic Git Notifications
After every commit, you'll automatically receive a notification with:
- Commit hash and branch
- Commit message
- Changed files
- Author name

## Features

- ✅ **Task Completion Notifications** - Get notified when tasks complete
- ✅ **Git Commit Notifications** - Automatic notifications on every commit
- ✅ **Markdown Formatting** - Beautiful formatted messages
- ✅ **Graceful Degradation** - Works silently if not configured
- ✅ **Emoji Support** - Add personality to your notifications

## Troubleshooting

### Not Receiving Notifications?
1. Check your bot token and chat ID are correct
2. Make sure `.env.local` exists and is in the project root
3. Verify the bot can message you (start a conversation with your bot first)

### Notifications Silently Skipped?
This is expected if credentials are not configured. Check console for:
```
Telegram notification skipped: not configured
```

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to version control
- Never share your bot token publicly
- Add `.env.local` to `.gitignore` (already included)

## Advanced: Multiple Recipients

To send notifications to multiple people:

1. Create a **Telegram Group** with your team
2. Add your bot to the group
3. Get the group's chat ID (forward a message to @userinfobot)
4. Use the group chat ID in `.env.local`

## Support

Need help? Check:
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#botfather)

---

*Built with love by 幽浮喵 for AuraLume* ฅ'ω'ฅ
