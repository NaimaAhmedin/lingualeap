// ==========================================
// LinguaLeap - Theme & Age Group Configuration
// ==========================================

import { AgeGroupConfig, AgeGroup } from '../types';

export const AGE_GROUP_CONFIGS: Record<AgeGroup, AgeGroupConfig> = {
  kids: {
    id: 'kids',
    label: 'Little Learners',
    ageRange: '4-7 years',
    emoji: '🧒',
    description: 'Fun & colorful learning with pictures, songs, and games!',
    colors: {
      primary: '#FF6B6B',
      secondary: '#FFE66D',
      accent: '#4ECDC4',
      background: '#FFF8F0',
      card: '#FFFFFF',
      text: '#2D3436',
      textSecondary: '#636E72',
    },
    difficulty: 'beginner',
  },
  tweens: {
    id: 'tweens',
    label: 'Word Explorers',
    ageRange: '8-12 years',
    emoji: '🚀',
    description: 'Level up your English with exciting challenges and quests!',
    colors: {
      primary: '#6C5CE7',
      secondary: '#A29BFE',
      accent: '#00CEC9',
      background: '#F8F7FF',
      card: '#FFFFFF',
      text: '#2D3436',
      textSecondary: '#636E72',
    },
    difficulty: 'beginner',
  },
  teens: {
    id: 'teens',
    label: 'Language Pros',
    ageRange: '13-17 years',
    emoji: '💡',
    description: 'Master English with real-world skills and smart practice!',
    colors: {
      primary: '#0984E3',
      secondary: '#74B9FF',
      accent: '#00B894',
      background: '#F0F8FF',
      card: '#FFFFFF',
      text: '#2D3436',
      textSecondary: '#636E72',
    },
    difficulty: 'intermediate',
  },
  adults: {
    id: 'adults',
    label: 'Fluency Masters',
    ageRange: '18+ years',
    emoji: '🎯',
    description: 'Professional English mastery for career & life success!',
    colors: {
      primary: '#1B1464',
      secondary: '#3D3D8F',
      accent: '#E17055',
      background: '#F5F6FA',
      card: '#FFFFFF',
      text: '#1B1464',
      textSecondary: '#636E72',
    },
    difficulty: 'advanced',
  },
};

export const LEVEL_XP_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17300,
];

export const ACHIEVEMENTS = [
  { id: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🎉' },
  { id: 'streak_3', title: 'On Fire!', description: '3-day learning streak', icon: '🔥' },
  { id: 'streak_7', title: 'Week Warrior', description: '7-day learning streak', icon: '⚔️' },
  { id: 'streak_30', title: 'Monthly Master', description: '30-day learning streak', icon: '👑' },
  { id: 'vocab_50', title: 'Word Collector', description: 'Learn 50 vocabulary words', icon: '📚' },
  { id: 'vocab_100', title: 'Dictionary', description: 'Learn 100 vocabulary words', icon: '📖' },
  { id: 'perfect_score', title: 'Perfectionist', description: 'Get a perfect score on a lesson', icon: '💯' },
  { id: 'conversation_10', title: 'Chatterbox', description: 'Have 10 conversations', icon: '💬' },
  { id: 'level_5', title: 'Rising Star', description: 'Reach level 5', icon: '⭐' },
  { id: 'level_10', title: 'Language Hero', description: 'Reach level 10', icon: '🦸' },
];

export const CATEGORY_ICONS: Record<string, string> = {
  vocabulary: '📝',
  grammar: '📐',
  pronunciation: '🗣️',
  listening: '👂',
  reading: '📖',
  conversation: '💬',
};

export const CATEGORY_COLORS: Record<string, string> = {
  vocabulary: '#FF6B6B',
  grammar: '#6C5CE7',
  pronunciation: '#00CEC9',
  listening: '#FDCB6E',
  reading: '#E17055',
  conversation: '#00B894',
};
