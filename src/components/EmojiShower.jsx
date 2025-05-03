// EmojiShower.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {EmojiParticle} from './EmojiParticle';

const EMOJIS = ['🎉', '💖', '✨', '😍', '💞', '🥰', '🌈'];

export default function EmojiShower({count = 20}) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {id: id++, emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]},
      ]);
      if (id >= count) clearInterval(interval);
    }, 100); // Emit particles in burst
  }, []);

  const removeParticle = idToRemove => {
    setParticles(prev => prev.filter(p => p.id !== idToRemove));
  };

  return (
    <View style={{...StyleSheet.absoluteFillObject, pointerEvents: 'none'}}>
      {particles.map(p => (
        <EmojiParticle
          key={p.id}
          emoji={p.emoji}
          onDone={() => removeParticle(p.id)}
        />
      ))}
    </View>
  );
}
