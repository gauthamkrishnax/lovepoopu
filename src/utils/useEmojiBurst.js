// useEmojiBurst.js
import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { EmojiParticle } from '../components/EmojiParticle'; // You already have this

const EMOJIS = ['❤️', '💞', '💘', '💗', '💓',];

export function useEmojiBurst({ defaultCount = 20 } = {}) {
    const [particles, setParticles] = useState([]);

    const triggerBurst = useCallback((count = defaultCount) => {
        const newParticles = Array.from({ length: count }).map(() => ({
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        }));
        setParticles((prev) => [...prev, ...newParticles]);
    }, [defaultCount]);

    const removeParticle = useCallback((idToRemove) => {
        setParticles((prev) => prev.filter((p) => p.id !== idToRemove));
    }, []);

    const EmojiBurstView = () => (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {particles.map((p, i) => (
                <EmojiParticle key={i} emoji={p.emoji} onDone={() => removeParticle(p.id)} />
            ))}
        </View>
    );

    return { triggerBurst, EmojiBurstView };
}
