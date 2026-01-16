#!/usr/bin/env ts-node
/**
 * Manual Task Completion Notification Script
 *
 * Usage:
 *   npm run notify -- --task="Task Name" --details="Detail 1" --details="Detail 2"
 *
 * Or call directly from code:
 *   import { notifyCompletion } from './scripts/notify';
 *   await notifyCompletion('Blog Optimization', ['SEO enhanced', 'Social sharing added']);
 */

import * as dotenv from 'dotenv';
import { notifyTaskComplete } from '../src/lib/telegram';

// Load environment variables
dotenv.config({ path: '.env.local' });

interface NotifyOptions {
    task: string;
    details?: string[];
    emoji?: string;
}

async function main() {
    const args = process.argv.slice(2);

    // Parse command line arguments (handle both --arg=value and --arg value formats)
    const options: NotifyOptions = {
        task: '',
        details: [],
        emoji: '✅',
    };

    for (const arg of args) {
        if (arg.startsWith('--task=')) {
            options.task = arg.split('=')[1];
        } else if (arg.startsWith('--task') && args.indexOf(arg) + 1 < args.length) {
            options.task = args[args.indexOf(arg) + 1];
        } else if (arg.startsWith('--details=')) {
            if (!options.details) options.details = [];
            options.details.push(arg.split('=')[1]);
        } else if (arg.startsWith('--details') && args.indexOf(arg) + 1 < args.length) {
            if (!options.details) options.details = [];
            options.details.push(args[args.indexOf(arg) + 1]);
        } else if (arg.startsWith('--emoji=')) {
            options.emoji = arg.split('=')[1];
        } else if (arg.startsWith('--emoji') && args.indexOf(arg) + 1 < args.length) {
            options.emoji = args[args.indexOf(arg) + 1];
        }
    }

    // Validate required options
    if (!options.task) {
        console.error('❌ Error: --task is required');
        console.log('\nUsage: npm run notify -- --task="Task Name" --details="Detail 1" --details="Detail 2"');
        process.exit(1);
    }

    // Send notification
    console.log(`📤 Sending notification for: ${options.task}`);
    await notifyTaskComplete(
        options.task,
        options.details || ['Task completed successfully'],
        options.emoji
    );
    console.log('✅ Notification sent!');

    process.exit(0);
}

// Export for programmatic use
export async function notifyCompletion(
    task: string,
    details: string[],
    emoji: string = '✅'
): Promise<void> {
    await notifyTaskComplete(task, details, emoji);
}

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        console.error('❌ Notification failed:', err);
        process.exit(1);
    });
}
