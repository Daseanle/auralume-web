'use client';

/**
 * Reading Progress Bar Component
 *
 * Features:
 * - Tracks scroll position relative to article content
 * - Smooth progress animation
 * - Cosmos-themed design matching AuraLume brand
 * - Performance optimized with requestAnimationFrame
 */

import { useEffect, useState, useRef } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number>();
    const previousScrollRef = useRef<number>(0);

    useEffect(() => {
        /**
         * Calculate reading progress based on scroll position
         * Progress is calculated from top of article to bottom of content
         */
        const calculateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            // Calculate how much of the article has been scrolled
            const scrollable = docHeight - winHeight;
            const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

            // Clamp progress between 0 and 100
            return Math.min(100, Math.max(0, progress));
        };

        /**
         * Update progress with animation frame for smooth performance
         */
        const updateProgress = () => {
            const currentScroll = window.scrollY;

            // Only update if scroll position actually changed
            if (currentScroll !== previousScrollRef.current) {
                const newProgress = calculateProgress();
                setProgress(newProgress);
                previousScrollRef.current = currentScroll;
            }

            requestRef.current = requestAnimationFrame(updateProgress);
        };

        // Start the animation loop
        requestRef.current = requestAnimationFrame(updateProgress);

        // Cleanup on unmount
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-cosmos/50 backdrop-blur-sm">
            <div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
