// ==========================================
// LinguaLeap - English Language Learning App
// Core Type Definitions
// ==========================================

export type AgeGroup = 'kids' | 'tweens' | 'teens' | 'adults';

export interface AgeGroupConfig {
  id: AgeGroup;
  label: string;
  ageRange: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type LessonCategory = 
  | 'vocabulary'
  | 'grammar'
  | 'pronunciation'
  | 'listening'
  | 'reading'
  | 'conversation';

export interface Lesson {
  id: string;
  category: LessonCategory;
  title: string;
  description: string;
  ageGroup: AgeGroup;
  difficulty: number; // 1-5
  estimatedMinutes: number;
  xpReward: number;
  icon: string;
  content: LessonContent;
  isLocked: boolean;
  isCompleted: boolean;
}

export interface LessonContent {
  type: LessonCategory;
  items: LessonItem[];
}

export interface LessonItem {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioText?: string; // Text to be spoken by TTS
  imageUrl?: string;
  hint?: string;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  example: string;
  pronunciation: string;
  partOfSpeech: string;
  difficulty: number;
  ageGroup: AgeGroup;
}

export interface UserProfile {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  achievements: Achievement[];
  dailyGoal: number;
  dailyProgress: number;
  totalLessonsCompleted: number;
  totalTimeSpent: number; // in minutes
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  category: LessonCategory;
  ageGroup: AgeGroup;
  xpReward: number;
  isCompleted: boolean;
  content: LessonContent;
}

export interface ProgressStats {
  vocabularyMastered: number;
  grammarScore: number;
  pronunciationScore: number;
  listeningScore: number;
  readingScore: number;
  conversationScore: number;
  weeklyXp: number[];
  monthlyProgress: number[];
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ConversationTopic {
  id: string;
  title: string;
  description: string;
  ageGroup: AgeGroup;
  difficulty: number;
  starterPrompt: string;
  suggestedResponses: string[];
}
